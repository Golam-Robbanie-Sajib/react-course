// filepath: hooks/use-progress.ts
"use client"

import { supabase } from "@/lib/supabase/client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@/components/auth/auth-provider"

// Helper to check if two dates are on consecutive calendar days
const areDatesConsecutive = (date1: Date, date2: Date) => {
  const day1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const day2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  const diffTime = day2.getTime() - day1.getTime();
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
  return diffDays === 1;
};

export function useProgress() {
  const queryClient = useQueryClient()
  const { user, session } = useAuth()
  const userId = user?.id

  const { data: userProfile, isLoading: isProgressLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
      if (error) {
        console.error("Error fetching profile:", error)
        return null
      }
      return data
    },
    enabled: !!userId,
  })

  // --- CORRECTED DESTRUCTURING ---
  const completedDays: number[] = userProfile?.completed_days || [];
  const notes: { [key: number]: string } = (userProfile?.notes as any) || {};
  const highestScore: number | null = userProfile?.exam_highest_score || null;
  const lastScore: number | null = userProfile?.exam_last_score || null;
  const confidenceRatings: { [key: number]: number } = (userProfile?.confidence_ratings as any) || {};
  const currentStreak: number = userProfile?.current_streak || 0;
  const lastLoginDate: string | null = userProfile?.last_login_date || null;

  // --- MUTATIONS ---

  const { mutate: toggleDayCompletion } = useMutation({
    mutationFn: async (day: number) => {
      if (!userId) throw new Error("User not authenticated")
      const isCurrentlyCompleted = completedDays.includes(day)
      const newCompleted = isCurrentlyCompleted ? completedDays.filter((d: number) => d !== day) : [...completedDays, day].sort((a, b) => a - b)
      const { error } = await supabase.from('profiles').update({ completed_days: newCompleted, updated_at: new Date().toISOString() }).eq('id', userId)
      if (error) throw new Error(error.message)
      return { newCompleted, day }
    },
    onSuccess: ({ newCompleted, day }) => {
      const isCompleted = newCompleted.includes(day)
      toast.success(isCompleted ? `Day ${day} marked complete!` : `Day ${day} progress removed.`)
      queryClient.invalidateQueries({ queryKey: ['profile', userId] })
    },
    onError: (error) => { toast.error("Failed to update progress.") }
  })

  const { mutate: resetProgress } = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User not authenticated")
      const { error } = await supabase.from('profiles').update({ completed_days: [], notes: {}, updated_at: new Date().toISOString() }).eq('id', userId)
      if (error) throw new Error(error.message)
      return []
    },
    onSuccess: () => {
      toast.success("Your course progress has been reset.")
      queryClient.invalidateQueries({ queryKey: ['profile', userId] })
    },
    onError: () => { toast.error("Failed to reset progress.") }
  })

  const { mutate: updateNote } = useMutation({
    mutationFn: async ({ day, content }: { day: number; content: string }) => {
      if (!userId) throw new Error("User not authenticated")
      const newNotes = { ...notes, [day]: content }
      const { error } = await supabase.from('profiles').update({ notes: newNotes, updated_at: new Date().toISOString() }).eq('id', userId)
      if (error) throw new Error(error.message)
      return newNotes
    },
    onSuccess: () => {
      toast.success("Note saved!")
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    },
    onError: () => { toast.error("Failed to save note.") }
  })

  const { mutate: updateExamScores } = useMutation({
    mutationFn: async ({ newScore, totalQuestions }: { newScore: number; totalQuestions: number }) => {
      if (!userId) throw new Error("User not authenticated")
      const newPercentage = Math.round((newScore / totalQuestions) * 100);
      const currentHighest = highestScore || 0;
      const newHighest = Math.max(currentHighest, newPercentage);
      const { error } = await supabase.from('profiles').update({ exam_last_score: newPercentage, exam_highest_score: newHighest }).eq('id', userId)
      if (error) throw new Error(error.message)
      return { newHighest, newPercentage }
    },
    onSuccess: () => {
      toast.success("Exam score saved successfully!")
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    },
    onError: () => { toast.error("Failed to save your score.") }
  })

  const { mutate: updateConfidenceRating } = useMutation({
    mutationFn: async ({ day, rating }: { day: number; rating: number }) => {
      if (!userId) throw new Error("User not authenticated")
      const newRatings = { ...confidenceRatings, [day]: rating }
      const { error } = await supabase.from('profiles').update({ confidence_ratings: newRatings }).eq('id', userId)
      if (error) throw new Error(error.message)
      return newRatings
    },
    onSuccess: () => {
      toast.success("Confidence rating saved!")
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    }
  })

  const { mutate: updateStreak } = useMutation({
    mutationFn: async () => {
      if (!userId) return;
      const today = new Date();
      const lastLogin = lastLoginDate ? new Date(lastLoginDate) : null;
      if (lastLogin && today.toDateString() === lastLogin.toDateString()) return;
      let newStreak = 1;
      if (lastLogin && areDatesConsecutive(lastLogin, today)) {
        newStreak = (currentStreak || 0) + 1;
      }
      const { error } = await supabase.from('profiles').update({
        current_streak: newStreak,
        last_login_date: today.toISOString().split('T')[0]
      }).eq('id', userId)
      if (error) throw new Error(error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    }
  })

  return {
    isLoading: isProgressLoading,
    completedDays,
    notes,
    highestScore,
    lastScore,
    confidenceRatings,
    currentStreak,
    isAuthenticated: !!userId,
    session,
    isCompleted: (day: number) => completedDays.includes(day),
    toggleDayCompletion,
    resetProgress,
    updateNote,
    updateExamScores,
    updateConfidenceRating,
    updateStreak,
  }
}