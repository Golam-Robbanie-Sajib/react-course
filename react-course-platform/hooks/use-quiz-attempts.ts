"use client"

import { useCallback, useEffect, useState } from "react"

const LOCAL_KEY = "slh:quiz-attempts:v1"

const DAY = 24 * 60 * 60 * 1000

/**
 * Simple Leitner-style spaced repetition.
 * Box 0 (just failed) → review tomorrow.
 * Each consecutive correct answer promotes to next box with intervals
 * 1d → 3d → 7d → 14d → 30d (capped).
 * A wrong answer drops back to box 0.
 */
const BOX_INTERVALS = [1, 3, 7, 14, 30] // days

export interface QuestionStat {
  attempts: number
  correct: number
  lastSeen: number
  dueAt: number
  box: number
  lastResult: "correct" | "wrong"
}

export interface QuizAttemptsStore {
  byQuestion: Record<string, QuestionStat>
}

function readLocal(): QuizAttemptsStore {
  if (typeof window === "undefined") return { byQuestion: {} }
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY)
    if (!raw) return { byQuestion: {} }
    const parsed = JSON.parse(raw)
    return { byQuestion: parsed.byQuestion || {} }
  } catch {
    return { byQuestion: {} }
  }
}

function writeLocal(store: QuizAttemptsStore) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(store))
  window.dispatchEvent(new Event("local-quiz-attempts-changed"))
}

export function questionId(courseId: string, day: number, index: number) {
  return `${courseId}:${day}:${index}`
}

export function useQuizAttempts() {
  const [store, setStore] = useState<QuizAttemptsStore>(() => readLocal())

  useEffect(() => {
    const sync = () => setStore(readLocal())
    window.addEventListener("storage", sync)
    window.addEventListener("local-quiz-attempts-changed", sync)
    return () => {
      window.removeEventListener("storage", sync)
      window.removeEventListener("local-quiz-attempts-changed", sync)
    }
  }, [])

  const record = useCallback(
    (id: string, correct: boolean) => {
      const prev = readLocal()
      const cur: QuestionStat = prev.byQuestion[id] || {
        attempts: 0,
        correct: 0,
        lastSeen: 0,
        dueAt: 0,
        box: 0,
        lastResult: "wrong",
      }
      const now = Date.now()
      const nextBox = correct ? Math.min(cur.box + 1, BOX_INTERVALS.length - 1) : 0
      const intervalDays = BOX_INTERVALS[nextBox]
      const next: QuestionStat = {
        attempts: cur.attempts + 1,
        correct: cur.correct + (correct ? 1 : 0),
        lastSeen: now,
        dueAt: now + intervalDays * DAY,
        box: nextBox,
        lastResult: correct ? "correct" : "wrong",
      }
      const updated: QuizAttemptsStore = {
        byQuestion: { ...prev.byQuestion, [id]: next },
      }
      writeLocal(updated)
      setStore(updated)
    },
    []
  )

  const dueQuestionIds = useCallback(
    (now = Date.now()): string[] => {
      return Object.entries(store.byQuestion)
        .filter(([, s]) => s.dueAt <= now)
        .sort((a, b) => a[1].dueAt - b[1].dueAt)
        .map(([id]) => id)
    },
    [store]
  )

  const stats = (id: string): QuestionStat | undefined => store.byQuestion[id]

  return { store, record, dueQuestionIds, stats }
}
