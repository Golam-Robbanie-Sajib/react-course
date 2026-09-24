"use client"

import { CourseLayout } from "@/components/course-layout"
import { PlaygroundView } from "@/components/playground-view"
import { cCourse } from "@/lib/courses/c"

export default function PlaygroundPage() {
  return (
    <CourseLayout course={cCourse}>
      <PlaygroundView />
    </CourseLayout>
  )
}
