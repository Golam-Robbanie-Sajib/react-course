// Back-compat shim. The platform now supports multiple courses; existing code
// that imports from "@/lib/course-data" continues to see the React course.
// New code should prefer "@/lib/courses".

import { reactCourse } from "./courses/react"
import { getPhaseForDay as getPhaseForDayInCourse } from "./courses"

export type {
  Resource,
  ExerciseSolution,
  Exercise,
  QuizQuestion,
  CourseDay,
} from "./courses/types"

export const courseData = reactCourse.days
export const courseDays = reactCourse.days
export const phases = reactCourse.phases

export function getPhaseForDay(day: number) {
  return getPhaseForDayInCourse(reactCourse, day)
}
