// filepath: hooks/use-progress.ts
"use client"

import { supabase } from "@/lib/supabase/client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@/components/auth/auth-provider"

export function useProgress() {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const userId = user?.id

  const { data: userProfile, isLoading: isProgressLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null
      // --- FETCH NEW SCORE FIELDS ---
      const { data, error } = await supabase.from('profiles').select('completed_days, notes, exam_highest_score, exam_last_score').eq('id', userId).single()
      if (error) { console.error("Error fetching profile:", error); return null }
      return data
    },
    enabled: !!userId,
  })

  const completedDays: number[] = userProfile?.completed_days || []
  const notes: { [key: number]: string } = (userProfile?.notes as any) || {}
  const highestScore: number | null = userProfile?.exam_highest_score || null
  const lastScore: number | null = userProfile?.exam_last_score || null

  // --- NEW MUTATION TO UPDATE SCORES ---
  const { mutate: updateExamScores } = useMutation({
    mutationFn: async ({ newScore, totalQuestions }: { newScore: number; totalQuestions: number }) => {
      if (!userId) throw new Error("User not authenticated")
      
      const newPercentage = Math.round((newScore / totalQuestions) * 100);
      const currentHighest = highestScore || 0;
      const newHighest = Math.max(currentHighest, newPercentage);

      const { error } = await supabase
        .from('profiles')
        .update({ 
          exam_last_score: newPercentage, 
          exam_highest_score: newHighest 
        })
        .eq('id', userId)
      
      if (error) throw new Error(error.message)
      return { newHighest, newPercentage }
    },
    onSuccess: () => {
      toast.success("Exam score saved successfully!")
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    },
    onError: () => {
      toast.error("Failed to save your score.")
    }
  })

  // ... (toggleDayCompletion, resetProgress, updateNote mutations are unchanged)
  const { mutate: toggleDayCompletion } = useMutation({
    // ...
  })
  const { mutate: resetProgress } = useMutation({
    // ...
  })
  const { mutate: updateNote } = useMutation({
    // ...
  })

  return {
    isLoading: isProgressLoading,
    completedDays,
    notes,
    highestScore,
    lastScore,
    isAuthenticated: !!userId,
    isCompleted: (day: number) => completedDays.includes(day),
    toggleDayCompletion,
    resetProgress,
    updateNote,
    updateExamScores, // <-- EXPORT THE NEW FUNCTION
  }
}