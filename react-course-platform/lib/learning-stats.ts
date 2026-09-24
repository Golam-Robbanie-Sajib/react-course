"use client"

import { useEffect, useMemo, useState } from "react"
import { courses } from "@/lib/courses"
import { useProgress } from "@/hooks/use-progress"
import { useQuizAttempts } from "@/hooks/use-quiz-attempts"
import { activityStreak, sumEvents, useActivity, type ActivityLog } from "@/lib/activity"

export interface CourseStats {
  courseId: string
  title: string
  slug: string
  totalDays: number
  completedDays: number[]
  solvedExercises: number
  totalExercises: number
  quizAttempts: number
  quizCorrect: number
  examHighest: number | null
  examLast: number | null
}

export interface LearningStats {
  byCourse: CourseStats[]
  totalLessons: number
  completedLessons: number
  solvedExercises: number
  quizAttempts: number
  quizCorrect: number
  streak: { current: number; longest: number }
  activity: ActivityLog
  needsMigration: boolean
}

const SOLVED_PREFIX = "slh:solved:"

/** Count exercises the learner has fully passed, per course id. */
function readSolvedCounts(): Record<string, number> {
  const out: Record<string, number> = {}
  if (typeof window === "undefined") return out
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i)
      if (!key?.startsWith(SOLVED_PREFIX) || window.localStorage.getItem(key) !== "1") continue
      const courseId = key.slice(SOLVED_PREFIX.length).split(":")[0]
      out[courseId] = (out[courseId] ?? 0) + 1
    }
  } catch {
    /* ignore */
  }
  return out
}

export function useLearningStats(): LearningStats {
  const { progressFor, needsMigration } = useProgress()
  const { store } = useQuizAttempts()
  const activity = useActivity()
  const [solved, setSolved] = useState<Record<string, number>>({})

  useEffect(() => {
    setSolved(readSolvedCounts())
  }, [activity])

  return useMemo(() => {
    const quizByCourse: Record<string, { attempts: number; correct: number }> = {}
    for (const [id, stat] of Object.entries(store.byQuestion)) {
      const cid = id.split(":")[0]
      const q = (quizByCourse[cid] ??= { attempts: 0, correct: 0 })
      q.attempts += stat.attempts
      q.correct += stat.correct
    }

    const byCourse: CourseStats[] = courses.map((c) => {
      const p = progressFor(c.id)
      return {
        courseId: c.id,
        title: c.title.split(" in ")[0],
        slug: c.slug,
        totalDays: c.days.length,
        completedDays: p.completedDays,
        solvedExercises: solved[c.id] ?? 0,
        totalExercises: c.days.reduce((n, d) => n + d.exercises.filter((e) => e.tests?.length).length, 0),
        quizAttempts: quizByCourse[c.id]?.attempts ?? 0,
        quizCorrect: quizByCourse[c.id]?.correct ?? 0,
        examHighest: p.examHighest ?? null,
        examLast: p.examLast ?? null,
      }
    })

    const events = sumEvents(activity)
    return {
      byCourse,
      totalLessons: byCourse.reduce((n, c) => n + c.totalDays, 0),
      completedLessons: byCourse.reduce((n, c) => n + c.completedDays.length, 0),
      solvedExercises: byCourse.reduce((n, c) => n + c.solvedExercises, 0),
      quizAttempts: byCourse.reduce((n, c) => n + c.quizAttempts, 0),
      quizCorrect: Math.max(
        byCourse.reduce((n, c) => n + c.quizCorrect, 0),
        events.quiz_correct ?? 0
      ),
      streak: activityStreak(activity),
      activity,
      needsMigration,
    }
  }, [store, activity, solved, needsMigration, progressFor])
}
