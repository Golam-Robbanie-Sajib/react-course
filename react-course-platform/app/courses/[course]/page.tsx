import { notFound } from "next/navigation"
import { CourseLayout } from "@/components/course-layout"
import { CourseLanding } from "@/components/course-landing"
import { getCourse, courses } from "@/lib/courses"
import type { Course } from "@/lib/courses/types"

function sanitizeCourse(c: Course): Course {
  return {
    ...c,
    days: c.days.map((d) => ({
      ...d,
      theory: typeof d.theory === "string" ? d.theory : "",
    })),
  }
}

interface Props {
  params: Promise<{ course: string }>
}

export default async function CoursePage({ params }: Props) {
  const { course: slug } = await params
  const course = getCourse(slug)
  if (!course) notFound()
  const safeCourse = sanitizeCourse(course)
  return (
    <CourseLayout course={safeCourse}>
      <CourseLanding course={safeCourse} />
    </CourseLayout>
  )
}

export function generateStaticParams() {
  return courses.map((c) => ({ course: c.slug }))
}
