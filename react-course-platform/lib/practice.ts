import { courses, examQuestions } from "@/lib/courses"
import { cMcqMasterSet } from "@/lib/courses/c-mcqs"
import type { CourseDay, Exercise, QuizQuestion } from "@/lib/courses/types"

export interface PracticeMcqItem {
  kind: "mcq"
  id: string
  courseId: string
  courseTitle: string
  source: string // e.g. "Day 4: Variables" or "C MCQ Master Set"
  question: QuizQuestion
}

export interface PracticeCodeItem {
  kind: "code"
  id: string
  courseId: string
  courseTitle: string
  source: string
  day: number
  dayTitle: string
  exerciseIndex: number
  exercise: Exercise
}

export type PracticeItem = PracticeMcqItem | PracticeCodeItem

/**
 * Build the full set of MCQ items available for practice. Mixes:
 *  - Per-day quiz questions from every course
 *  - Each course's full exam pool (which for C is the 300-item master set)
 */
export function buildAllMcqItems(): PracticeMcqItem[] {
  const items: PracticeMcqItem[] = []

  for (const c of courses) {
    // Per-day quizzes
    for (const day of c.days) {
      if (!day.quiz) continue
      day.quiz.forEach((q, i) => {
        items.push({
          kind: "mcq",
          id: `mcq:${c.id}:day${day.day}:q${i}`,
          courseId: c.id,
          courseTitle: c.title.split(" in ")[0],
          source: `Day ${day.day} · ${day.title}`,
          question: q,
        })
      })
    }
    // Course-level exam pool
    const pool = examQuestions[c.id]
    if (pool) {
      pool.forEach((q, i) => {
        items.push({
          kind: "mcq",
          id: `mcq:${c.id}:exam:q${i}`,
          courseId: c.id,
          courseTitle: c.title.split(" in ")[0],
          source: `${c.title.split(" in ")[0]} exam pool`,
          question: q,
        })
      })
    }
  }

  // De-duplicate by question text (the exam pool may overlap with per-day quizzes).
  const seen = new Set<string>()
  return items.filter((it) => {
    const key = it.question.question
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/** All code (Sandpack-backed) exercises across every course. */
export function buildAllCodeItems(): PracticeCodeItem[] {
  const items: PracticeCodeItem[] = []
  for (const c of courses) {
    for (const day of c.days) {
      day.exercises.forEach((ex, i) => {
        // Only include exercises with starter code — those are practice-able.
        if (!ex.starter || !ex.template) return
        items.push({
          kind: "code",
          id: `code:${c.id}:day${day.day}:e${i}`,
          courseId: c.id,
          courseTitle: c.title.split(" in ")[0],
          source: `Day ${day.day} · ${day.title}`,
          day: day.day,
          dayTitle: day.title,
          exerciseIndex: i,
          exercise: ex,
        })
      })
    }
  }
  return items
}

export function sampleItems<T>(pool: T[], n: number): T[] {
  if (n >= pool.length) return [...pool].sort(() => Math.random() - 0.5)
  const copy = [...pool]
  const out: T[] = []
  while (out.length < n && copy.length > 0) {
    const idx = Math.floor(Math.random() * copy.length)
    out.push(copy.splice(idx, 1)[0])
  }
  return out
}

export function getCourseLabels(): { id: string; label: string }[] {
  return courses.map((c) => ({ id: c.id, label: c.title.split(" in ")[0] }))
}

export { cMcqMasterSet }
