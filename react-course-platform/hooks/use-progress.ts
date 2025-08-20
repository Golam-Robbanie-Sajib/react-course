// filepath: hooks/use-progress.ts
"use client"

import { createClient } from "@/lib/supabase/client" // <-- Use the new client
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import { Session } from "@supabase/supabase-js"
import { toast } from "sonner"

export function useProgress() {
  const [supabase] = useState(() => createClient()) // <-- Create a client instance
  const [session, setSession] = useState<Session | null>(null)
  const queryClient = useQueryClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    })
    
    return () => subscription.unsubscribe()
  }, [queryClient, supabase])

  const userId = session?.user?.id

  // FETCH user profile (completed_days and notes)
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null
      const { data, error } = await supabase.from('profiles').select('completed_days, notes').eq('id', userId).single()
      if (error) { console.error("Error fetching profile:", error); return null }
      return data
    },
    enabled: !!userId,
  })

  const completedDays: number[] = userProfile?.completed_days || []
  const notes: { [key: number]: string } = (userProfile?.notes as any) || {}

  // ALL MUTATIONS REMAIN THE SAME, BUT USE THE LOCAL SUPABASE INSTANCE
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
    onError: (error) => {
      console.error("Failed to update progress:", error)
      toast.error("Failed to update progress. Please try again.")
    }
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
    onError: () => {
      toast.error("Failed to reset progress. Please try again.")
    }
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
    onError: () => {
      toast.error("Failed to save note.")
    }
  })

  return {
    session,
    isLoading,
    completedDays,
    notes,
    isAuthenticated: !!userId,
    isCompleted: (day: number) => completedDays.includes(day),
    toggleDayCompletion,
    resetProgress,
    updateNote,
  }
}