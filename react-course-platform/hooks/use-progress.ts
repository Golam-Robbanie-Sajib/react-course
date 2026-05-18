"use client"

import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@/components/auth/auth-provider"

const DEFAULT_COURSE = "react"

interface CourseProgressState {
  completedDays: number[]
  notes: Record<number, string>
  confidenceRatings: Record<number, number>
}

interface LocalProfile {
  byCourse: Record<string, CourseProgressState>
  examHighest: number | null
  examLast: number | null
  currentStreak: number
  lastLoginDate: string | null
}

const LOCAL_KEY = "course-platform:progress:v1"

function readLocal(): LocalProfile {
  if (typeof window === "undefined") {
    return { byCourse: {}, examHighest: null, examLast: null, currentStreak: 0, lastLoginDate: null }
  }
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY)
    if (!raw) {
      return { byCourse: {}, examHighest: null, examLast: null, currentStreak: 0, lastLoginDate: null }
    }
    const parsed = JSON.parse(raw)
    return {
      byCourse: parsed.byCourse || {},
      examHighest: parsed.examHighest ?? null,
      examLast: parsed.examLast ?? null,
      currentStreak: parsed.currentStreak ?? 0,
      lastLoginDate: parsed.lastLoginDate ?? null,
    }
  } catch {
    return { byCourse: {}, examHighest: null, examLast: null, currentStreak: 0, lastLoginDate: null }
  }
}

function writeLocal(next: LocalProfile) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(next))
  window.dispatchEvent(new Event("local-progress-changed"))
}

function emptyCourse(): CourseProgressState {
  return { completedDays: [], notes: {}, confidenceRatings: {} }
}

function ensureCourse(p: LocalProfile, courseId: string): LocalProfile {
  if (!p.byCourse[courseId]) {
    return { ...p, byCourse: { ...p.byCourse, [courseId]: emptyCourse() } }
  }
  return p
}

const areDatesConsecutive = (a: Date, b: Date) => {
  const d1 = new Date(a.getFullYear(), a.getMonth(), a.getDate())
  const d2 = new Date(b.getFullYear(), b.getMonth(), b.getDate())
  return Math.round((d2.getTime() - d1.getTime()) / 86_400_000) === 1
}

function useLocalProfile() {
  const [profile, setProfile] = useState<LocalProfile>(() => readLocal())

  useEffect(() => {
    const sync = () => setProfile(readLocal())
    window.addEventListener("storage", sync)
    window.addEventListener("local-progress-changed", sync)
    return () => {
      window.removeEventListener("storage", sync)
      window.removeEventListener("local-progress-changed", sync)
    }
  }, [])

  const update = useCallback((updater: (prev: LocalProfile) => LocalProfile) => {
    const next = updater(readLocal())
    writeLocal(next)
    setProfile(next)
  }, [])

  return { profile, update }
}

export function useProgress(courseId: string = DEFAULT_COURSE) {
  const queryClient = useQueryClient()
  const { user, session } = useAuth()
  const userId = user?.id
  const { profile: localProfile, update: updateLocal } = useLocalProfile()

  const { data: userProfile, isLoading: isProgressLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) return null
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()
      if (error) {
        console.error("Error fetching profile:", error)
        return null
      }
      return data
    },
    enabled: !!userId,
  })

  const remoteByCourse: Record<string, CourseProgressState> = (() => {
    if (!userProfile) return {}
    const cp = (userProfile as any).course_progress
    if (cp && typeof cp === "object") return cp as Record<string, CourseProgressState>
    // Legacy: top-level completed_days/notes/confidence_ratings are React-course data.
    return {
      react: {
        completedDays: ((userProfile as any).completed_days || []) as number[],
        notes: ((userProfile as any).notes || {}) as Record<number, string>,
        confidenceRatings: ((userProfile as any).confidence_ratings || {}) as Record<number, number>,
      },
    }
  })()

  const useRemote = !!userId && !!userProfile
  const currentCourseRemote = remoteByCourse[courseId] || emptyCourse()
  const currentCourseLocal = localProfile.byCourse[courseId] || emptyCourse()

  const completedDays = useRemote ? currentCourseRemote.completedDays : currentCourseLocal.completedDays
  const notes = useRemote ? currentCourseRemote.notes : currentCourseLocal.notes
  const confidenceRatings = useRemote ? currentCourseRemote.confidenceRatings : currentCourseLocal.confidenceRatings

  const highestScore: number | null = useRemote
    ? (userProfile as any)?.exam_highest_score ?? null
    : localProfile.examHighest
  const lastScore: number | null = useRemote
    ? (userProfile as any)?.exam_last_score ?? null
    : localProfile.examLast
  const currentStreak: number = useRemote
    ? (userProfile as any)?.current_streak ?? 0
    : localProfile.currentStreak
  const lastLoginDate: string | null = useRemote
    ? (userProfile as any)?.last_login_date ?? null
    : localProfile.lastLoginDate

  const persistRemoteProgress = async (mutator: (cur: CourseProgressState) => CourseProgressState) => {
    if (!userId) return
    const next = { ...remoteByCourse, [courseId]: mutator(currentCourseRemote) }
    const { error } = await supabase
      .from("profiles")
      .update({ course_progress: next, updated_at: new Date().toISOString() })
      .eq("id", userId)
    if (error) {
      // course_progress column may not exist yet; fall back to legacy fields for React.
      if (courseId === "react") {
        const cp = next[courseId]
        const { error: legacyErr } = await supabase
          .from("profiles")
          .update({
            completed_days: cp.completedDays,
            notes: cp.notes,
            confidence_ratings: cp.confidenceRatings,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId)
        if (legacyErr) throw new Error(legacyErr.message)
        return
      }
      throw new Error(error.message)
    }
  }

  const { mutate: toggleDayCompletion } = useMutation({
    mutationFn: async (day: number) => {
      if (useRemote) {
        await persistRemoteProgress((cur) => {
          const isDone = cur.completedDays.includes(day)
          return {
            ...cur,
            completedDays: isDone
              ? cur.completedDays.filter((d) => d !== day)
              : [...cur.completedDays, day].sort((a, b) => a - b),
          }
        })
      } else {
        updateLocal((prev) => {
          const p = ensureCourse(prev, courseId)
          const cur = p.byCourse[courseId]
          const isDone = cur.completedDays.includes(day)
          return {
            ...p,
            byCourse: {
              ...p.byCourse,
              [courseId]: {
                ...cur,
                completedDays: isDone
                  ? cur.completedDays.filter((d) => d !== day)
                  : [...cur.completedDays, day].sort((a, b) => a - b),
              },
            },
          }
        })
      }
      return day
    },
    onSuccess: (day) => {
      const isCompleted = !completedDays.includes(day)
      toast.success(isCompleted ? `Day ${day} marked complete!` : `Day ${day} progress removed.`)
      if (useRemote) queryClient.invalidateQueries({ queryKey: ["profile", userId] })
    },
    onError: () => toast.error("Failed to update progress."),
  })

  const { mutate: resetProgress } = useMutation({
    mutationFn: async () => {
      if (useRemote) {
        await persistRemoteProgress(() => emptyCourse())
      } else {
        updateLocal((prev) => ({
          ...prev,
          byCourse: { ...prev.byCourse, [courseId]: emptyCourse() },
        }))
      }
    },
    onSuccess: () => {
      toast.success("Your course progress has been reset.")
      if (useRemote) queryClient.invalidateQueries({ queryKey: ["profile", userId] })
    },
    onError: () => toast.error("Failed to reset progress."),
  })

  const { mutate: updateNote } = useMutation({
    mutationFn: async ({ day, content }: { day: number; content: string }) => {
      if (useRemote) {
        await persistRemoteProgress((cur) => ({ ...cur, notes: { ...cur.notes, [day]: content } }))
      } else {
        updateLocal((prev) => {
          const p = ensureCourse(prev, courseId)
          const cur = p.byCourse[courseId]
          return {
            ...p,
            byCourse: { ...p.byCourse, [courseId]: { ...cur, notes: { ...cur.notes, [day]: content } } },
          }
        })
      }
    },
    onSuccess: () => {
      if (useRemote) queryClient.invalidateQueries({ queryKey: ["profile", userId] })
    },
    onError: () => toast.error("Failed to save note."),
  })

  const { mutate: updateExamScores } = useMutation({
    mutationFn: async ({ newScore, totalQuestions }: { newScore: number; totalQuestions: number }) => {
      const percentage = Math.round((newScore / totalQuestions) * 100)
      if (useRemote) {
        const newHighest = Math.max(highestScore || 0, percentage)
        const { error } = await supabase
          .from("profiles")
          .update({ exam_last_score: percentage, exam_highest_score: newHighest })
          .eq("id", userId)
        if (error) throw new Error(error.message)
      } else {
        updateLocal((prev) => ({
          ...prev,
          examLast: percentage,
          examHighest: Math.max(prev.examHighest || 0, percentage),
        }))
      }
    },
    onSuccess: () => {
      toast.success("Exam score saved.")
      if (useRemote) queryClient.invalidateQueries({ queryKey: ["profile", userId] })
    },
    onError: () => toast.error("Failed to save your score."),
  })

  const { mutate: updateConfidenceRating } = useMutation({
    mutationFn: async ({ day, rating }: { day: number; rating: number }) => {
      if (useRemote) {
        await persistRemoteProgress((cur) => ({
          ...cur,
          confidenceRatings: { ...cur.confidenceRatings, [day]: rating },
        }))
      } else {
        updateLocal((prev) => {
          const p = ensureCourse(prev, courseId)
          const cur = p.byCourse[courseId]
          return {
            ...p,
            byCourse: {
              ...p.byCourse,
              [courseId]: { ...cur, confidenceRatings: { ...cur.confidenceRatings, [day]: rating } },
            },
          }
        })
      }
    },
    onSuccess: () => {
      if (useRemote) queryClient.invalidateQueries({ queryKey: ["profile", userId] })
    },
  })

  const { mutate: updateStreak } = useMutation({
    mutationFn: async () => {
      const today = new Date()
      const last = lastLoginDate ? new Date(lastLoginDate) : null
      if (last && today.toDateString() === last.toDateString()) return
      let next = 1
      if (last && areDatesConsecutive(last, today)) next = (currentStreak || 0) + 1
      const todayStr = today.toISOString().split("T")[0]
      if (useRemote) {
        const { error } = await supabase
          .from("profiles")
          .update({ current_streak: next, last_login_date: todayStr })
          .eq("id", userId)
        if (error) throw new Error(error.message)
      } else {
        updateLocal((prev) => ({ ...prev, currentStreak: next, lastLoginDate: todayStr }))
      }
    },
    onSuccess: () => {
      if (useRemote) queryClient.invalidateQueries({ queryKey: ["profile", userId] })
    },
  })

  // When a user signs in, merge any local progress into the remote profile (one-time).
  useEffect(() => {
    if (!useRemote) return
    const local = readLocal()
    const hasLocal = Object.keys(local.byCourse).length > 0
    if (!hasLocal) return
    const merged = { ...remoteByCourse }
    let changed = false
    for (const [cid, localState] of Object.entries(local.byCourse)) {
      const remote = merged[cid] || emptyCourse()
      const mergedDays = Array.from(new Set([...remote.completedDays, ...localState.completedDays])).sort(
        (a, b) => a - b
      )
      const mergedState: CourseProgressState = {
        completedDays: mergedDays,
        notes: { ...localState.notes, ...remote.notes },
        confidenceRatings: { ...localState.confidenceRatings, ...remote.confidenceRatings },
      }
      if (JSON.stringify(mergedState) !== JSON.stringify(remote)) {
        merged[cid] = mergedState
        changed = true
      }
    }
    if (!changed) return
    supabase
      .from("profiles")
      .update({ course_progress: merged, updated_at: new Date().toISOString() })
      .eq("id", userId!)
      .then(({ error }) => {
        if (!error) {
          writeLocal({ ...local, byCourse: {} })
          queryClient.invalidateQueries({ queryKey: ["profile", userId] })
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useRemote, userId])

  return {
    isLoading: isProgressLoading && !!userId,
    completedDays,
    notes,
    highestScore,
    lastScore,
    confidenceRatings,
    currentStreak,
    isAuthenticated: !!userId,
    session,
    courseId,
    isCompleted: (day: number) => completedDays.includes(day),
    toggleDayCompletion,
    resetProgress,
    updateNote,
    updateExamScores,
    updateConfidenceRating,
    updateStreak,
  }
}
