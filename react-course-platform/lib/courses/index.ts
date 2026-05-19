import type { Course, Phase, QuizQuestion } from "./types"
import { reactCourse } from "./react"
import { htmlCourse } from "./html"
import { cCourse } from "./c"
import { finalExamQuestions as reactExamQuestions } from "@/lib/exam-data"
import { htmlFinalExamQuestions } from "./html-exam-data"
import { cMcqMasterSet } from "./c-mcqs"

export const courses: Course[] = [htmlCourse, cCourse, reactCourse]

export const examQuestions: Record<string, QuizQuestion[]> = {
  react: reactExamQuestions,
  html: htmlFinalExamQuestions,
  // Use the first 50 of the master MCQ set as the final exam pool.
  c: cMcqMasterSet.slice(0, 50),
}

export function getExamQuestions(courseId: string): QuizQuestion[] | null {
  return examQuestions[courseId] || null
}

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug)
}

export function getPhaseForDay(course: Course, day: number): Phase | null {
  const dayData = course.days.find((d) => d.day === day)
  if (!dayData) return null
  return course.phases.find((p) => p.name === dayData.phase) || null
}

export { reactCourse, htmlCourse, cCourse, cMcqMasterSet }
export type { Course, CourseDay, Phase, Exercise, ExerciseTest, QuizQuestion, Resource } from "./types"
