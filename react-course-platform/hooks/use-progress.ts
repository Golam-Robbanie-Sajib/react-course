"use client"

import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@/components/auth/auth-provider"
import { logActivity } from "@/lib/activity"

const DEFAULT_COURSE = "react"

export interface CourseProgressState {
  completedDays: number[]
  notes: Record<number, string>
  confidenceRatings: Record<number, number>
  /** Per-course final-exam results (percentages). */
  examHighest?: number | null
  examLast?: number | null
}

interface LocalProfile {
  byCourse: Record<string, CourseProgressState>
  /** Legacy single exam score (pre per-course scores); treated as React's. */
  examHighest: number | null
  examLast: number | null
  currentStreak: number
  lastLoginDate: string | null
}

const LOCAL_KEY = "course-platform:progress:v1"

function emptyLocal(): LocalProfile {
  return { byCourse: {}, examHighest: null, examLast: null, currentStreak: 0, lastLoginDate: null }
}

function readLocal(): LocalProfile {
  if (typeof window === "undefined") return emptyLocal()
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY)
    if (!raw) return emptyLocal()
    const parsed = JSON.parse(raw)
    return {
      byCourse: parsed.byCourse || {},
      examHighest: parsed.examHighest ?? null,
      examLast: parsed.examLast ?? null,
      currentStreak: parsed.currentStreak ?? 0,
      lastLoginDate: parsed.lastLoginDate ?? null,
    }
  } catch {
    return emptyLocal()
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
  // Start empty so the first client render matches the server HTML, then
  // load from localStorage after mount (avoids React hydration mismatches).
  const [profile, setProfile] = useState<LocalProfile>(emptyLocal)

  useEffect(() => {
    const sync = () => setProfile(readLocal())
    sync()
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

  const profile = userProfile as Record<string, any> | null | undefined
  const useRemote = !!userId && !!profile
  // `select *` only includes course_progress if the column exists, so this
  // tells us whether the database migration has been applied.
  const hasCourseProgressColumn = !!profile && "course_progress" in profile

  // React's progress predates course_progress and lives in legacy columns.
  const legacyReact: CourseProgressState | null = profile
    ? {
        completedDays: (profile.completed_days || []) as number[],
        notes: (profile.notes || {}) as Record<number, string>,
        confidenceRatings: (profile.confidence_ratings || {}) as Record<number, number>,
        examHighest: profile.exam_highest_score ?? null,
        examLast: profile.exam_last_score ?? null,
      }
    : null

  const remoteByCourse: Record<string, CourseProgressState> = (() => {
    if (!profile) return {}
    const cp = profile.course_progress
    const fromColumn = cp && typeof cp === "object" ? (cp as Record<string, CourseProgressState>) : {}
    return legacyReact && !fromColumn.react ? { react: legacyReact, ...fromColumn } : { ...fromColumn }
  })()

  /** Where writes for a course go right now. */
  const storageFor = (cid: string): "cloud" | "legacy" | "local" => {
    if (!useRemote) return "local"
    if (hasCourseProgressColumn) return "cloud"
    return cid === "react" ? "legacy" : "local"
  }

  /** Effective state for a course, combining cloud and this-device data. */
  const stateFor = (cid: string): CourseProgressState => {
    const local = localProfile.byCourse[cid]
    const localWithLegacyExam: CourseProgressState | undefined =
      cid === "react" && (local || localProfile.examHighest !== null)
        ? {
            ...(local ?? emptyCourse()),
            examHighest: local?.examHighest ?? localProfile.examHighest,
            examLast: local?.examLast ?? localProfile.examLast,
          }
        : local
    const mode = storageFor(cid)
    if (mode === "local") return localWithLegacyExam ?? emptyCourse()
    return remoteByCourse[cid] ?? localWithLegacyExam ?? emptyCourse()
  }

  const current = stateFor(courseId)
  const completedDays = current.completedDays
  const notes = current.notes
  const confidenceRatings = current.confidenceRatings
  const highestScore: number | null = current.examHighest ?? null
  const lastScore: number | null = current.examLast ?? null

  const currentStreak: number = useRemote ? profile?.current_streak ?? 0 : localProfile.currentStreak
  const lastLoginDate: string | null = useRemote ? profile?.last_login_date ?? null : localProfile.lastLoginDate

  const profileKey = ["profile", userId] as const

  /**
   * Apply a course-progress mutation. Cloud writes are optimistic:
   * 1. Snapshot the cached profile. 2. Patch the cache so the UI updates
   * instantly. 3. Write to Supabase; roll back on failure.
   * When the database can't hold this course yet, it's saved on this device.
   */
  const optimisticCoursePatch = async (
    mutator: (cur: CourseProgressState) => CourseProgressState,
    label: string
  ) => {
    const mode = storageFor(courseId)
    if (mode === "local") {
      updateLocal((prev) => {
        const p = ensureCourse(prev, courseId)
        return { ...p, byCourse: { ...p.byCourse, [courseId]: mutator(stateFor(courseId)) } }
      })
      return
    }

    await queryClient.cancelQueries({ queryKey: profileKey })
    const previous = queryClient.getQueryData<any>(profileKey)
    const next = mutator(current)

    if (mode === "legacy") {
      const legacyPatch = {
        completed_days: next.completedDays,
        notes: next.notes,
        confidence_ratings: next.confidenceRatings,
        exam_highest_score: next.examHighest ?? null,
        exam_last_score: next.examLast ?? null,
      }
      if (previous) queryClient.setQueryData(profileKey, { ...previous, ...legacyPatch })
      const { error } = await supabase
        .from("profiles")
        .update({ ...legacyPatch, updated_at: new Date().toISOString() })
        .eq("id", userId!)
      if (error) {
        if (previous) queryClient.setQueryData(profileKey, previous)
        toast.error(`Failed to ${label}. Please try again.`)
        throw new Error(error.message)
      }
      return
    }

    // mode === "cloud"
    const nextByCourse = { ...remoteByCourse, [courseId]: next }
    if (previous) queryClient.setQueryData(profileKey, { ...previous, course_progress: nextByCourse })
    const { error } = await supabase
      .from("profiles")
      .update({ course_progress: nextByCourse, updated_at: new Date().toISOString() } as any)
      .eq("id", userId!)
    if (error) {
      if (previous) queryClient.setQueryData(profileKey, previous)
      toast.error(`Failed to ${label}. Please try again.`)
      throw new Error(error.message)
    }
  }

  const { mutate: toggleDayCompletion } = useMutation({
    mutationFn: async (day: number) => {
      const wasDone = completedDays.includes(day)
      await optimisticCoursePatch(
        (cur) => ({
          ...cur,
          completedDays: cur.completedDays.includes(day)
            ? cur.completedDays.filter((d) => d !== day)
            : [...cur.completedDays, day].sort((a, b) => a - b),
        }),
        "update progress"
      )
      return { day, wasDone }
    },
    onSuccess: ({ day, wasDone }) => {
      if (!wasDone) logActivity("lesson_complete")
      toast.success(wasDone ? `Day ${day} progress removed.` : `Day ${day} marked complete!`)
    },
  })

  /** Clear lessons, notes and ratings but keep exam results. */
  const resetKeepingExams = (cur: CourseProgressState): CourseProgressState => ({
    ...emptyCourse(),
    examHighest: cur.examHighest ?? null,
    examLast: cur.examLast ?? null,
  })

  const { mutate: resetProgress } = useMutation({
    mutationFn: () => optimisticCoursePatch(resetKeepingExams, "reset progress"),
    onSuccess: () => toast.success("Your course progress has been reset."),
  })

  /**
   * Reset several courses in ONE write. Calling resetProgress per course would
   * race: each cloud write sends the whole course_progress object from its own
   * snapshot, so the last one would restore the others.
   */
  const { mutate: resetAllProgress } = useMutation({
    mutationFn: async (courseIds: string[]) => {
      const localIds = courseIds.filter((cid) => storageFor(cid) === "local")
      if (localIds.length) {
        updateLocal((prev) => {
          const byCourse = { ...prev.byCourse }
          for (const cid of localIds) byCourse[cid] = resetKeepingExams(stateFor(cid))
          return { ...prev, byCourse }
        })
      }
      const cloudIds = courseIds.filter((cid) => storageFor(cid) === "cloud")
      if (cloudIds.length) {
        const nextByCourse = { ...remoteByCourse }
        for (const cid of cloudIds) nextByCourse[cid] = resetKeepingExams(stateFor(cid))
        const { error } = await supabase
          .from("profiles")
          .update({ course_progress: nextByCourse, updated_at: new Date().toISOString() } as any)
          .eq("id", userId!)
        if (error) throw new Error(error.message)
      }
      if (courseIds.some((cid) => storageFor(cid) === "legacy")) {
        const { error } = await supabase
          .from("profiles")
          .update({ completed_days: [], notes: {}, confidence_ratings: {}, updated_at: new Date().toISOString() })
          .eq("id", userId!)
        if (error) throw new Error(error.message)
      }
    },
    onSuccess: () => {
      toast.success("Progress reset for all courses.")
      if (useRemote) queryClient.invalidateQueries({ queryKey: profileKey })
    },
    onError: () => toast.error("Failed to reset progress. Please try again."),
  })

  const { mutate: updateNote } = useMutation({
    mutationFn: async ({ day, content }: { day: number; content: string }) => {
      await optimisticCoursePatch(
        (cur) => ({ ...cur, notes: { ...cur.notes, [day]: content } }),
        "save note"
      )
    },
    // Notes are auto-saved on debounce — silent on success to avoid toast spam.
  })

  const { mutate: updateExamScores } = useMutation({
    mutationFn: async ({ newScore, totalQuestions }: { newScore: number; totalQuestions: number }) => {
      const percentage = Math.round((newScore / totalQuestions) * 100)
      await optimisticCoursePatch(
        (cur) => ({
          ...cur,
          examLast: percentage,
          examHighest: Math.max(cur.examHighest ?? 0, percentage),
        }),
        "save your exam score"
      )
    },
    onSuccess: () => toast.success("Exam score saved."),
  })

  const { mutate: updateConfidenceRating } = useMutation({
    mutationFn: ({ day, rating }: { day: number; rating: number }) =>
      optimisticCoursePatch(
        (cur) => ({ ...cur, confidenceRatings: { ...cur.confidenceRatings, [day]: rating } }),
        "save rating"
      ),
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
    if (!useRemote || !hasCourseProgressColumn) return
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
        examHighest: Math.max(localState.examHighest ?? 0, remote.examHighest ?? 0) || null,
        examLast: remote.examLast ?? localState.examLast ?? null,
      }
      if (JSON.stringify(mergedState) !== JSON.stringify(remote)) {
        merged[cid] = mergedState
        changed = true
      }
    }
    if (!changed) return
    supabase
      .from("profiles")
      .update({ course_progress: merged, updated_at: new Date().toISOString() } as any)
      .eq("id", userId!)
      .then(({ error }) => {
        if (!error) {
          writeLocal({ ...local, byCourse: {} })
          queryClient.invalidateQueries({ queryKey: ["profile", userId] })
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useRemote, userId, hasCourseProgressColumn])

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
    /** Effective progress for any course id. */
    progressFor: stateFor,
    /** True when signed in but the course_progress migration hasn't run, so
     *  HTML/C progress is being kept on this device only. */
    needsMigration: useRemote && !hasCourseProgressColumn,
    isCompleted: (day: number) => completedDays.includes(day),
    toggleDayCompletion,
    resetProgress,
    resetAllProgress,
    updateNote,
    updateExamScores,
    updateConfidenceRating,
    updateStreak,
  }
}
