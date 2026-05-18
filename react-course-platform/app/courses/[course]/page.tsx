import { notFound } from "next/navigation"
import { CourseLayout } from "@/components/course-layout"
import { CourseLanding } from "@/components/course-landing"
import { getCourse, courses } from "@/lib/courses"

interface Props {
  params: Promise<{ course: string }>
}

export default async function CoursePage({ params }: Props) {
  const { course: slug } = await params
  const course = getCourse(slug)
  if (!course) notFound()
  return (
    <CourseLayout course={course}>
      <CourseLanding course={course} />
    </CourseLayout>
  )
}

export function generateStaticParams() {
  return courses.map((c) => ({ course: c.slug }))
}
