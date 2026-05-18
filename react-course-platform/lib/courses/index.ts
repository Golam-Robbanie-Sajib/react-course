import type { Course, Phase, QuizQuestion } from "./types"
import { reactCourse } from "./react"
import { htmlCourse } from "./html"
import { finalExamQuestions as reactExamQuestions } from "@/lib/exam-data"
import { htmlFinalExamQuestions } from "./html-exam-data"

export const courses: Course[] = [htmlCourse, reactCourse]

export const examQuestions: Record<string, QuizQuestion[]> = {
  react: reactExamQuestions,
  html: htmlFinalExamQuestions,
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

export { reactCourse, htmlCourse }
export type { Course, CourseDay, Phase, Exercise, ExerciseTest, QuizQuestion, Resource } from "./types"
