import type { Course, Phase } from "./types"
import { reactCourse } from "./react"
import { htmlCourse } from "./html"

export const courses: Course[] = [htmlCourse, reactCourse]

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
