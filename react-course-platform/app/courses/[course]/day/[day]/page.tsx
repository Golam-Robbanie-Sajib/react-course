import { notFound } from "next/navigation"
import { CourseLayout } from "@/components/course-layout"
import { DayPage } from "@/components/day-page"
import { getCourse, courses } from "@/lib/courses"

interface Props {
  params: Promise<{ course: string; day: string }>
}

export default async function Page({ params }: Props) {
  const { course: slug, day } = await params
  const course = getCourse(slug)
  if (!course) notFound()
  const dayNumber = Number.parseInt(day, 10)
  const dayData = course.days.find((d) => d.day === dayNumber)
  if (!dayData) notFound()
  return (
    <CourseLayout course={course} currentDay={dayNumber}>
      <DayPage course={course} day={dayData} />
    </CourseLayout>
  )
}

export function generateStaticParams() {
  return courses.flatMap((c) =>
    c.days.map((d) => ({ course: c.slug, day: d.day.toString() }))
  )
}
