import { notFound } from "next/navigation"
import { CourseLayout } from "@/components/course-layout"
import { DayPage } from "@/components/day-page"
import { getCourse, courses } from "@/lib/courses"
import type { Course, CourseDay } from "@/lib/courses/types"

/** Strip non-serializable fields (MDX component theory) so the course/day can
 *  cross the Server→Client component boundary. */
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
  params: Promise<{ course: string; day: string }>
}

export default async function Page({ params }: Props) {
  const { course: slug, day } = await params
  const course = getCourse(slug)
  if (!course) notFound()
  const dayNumber = Number.parseInt(day, 10)
  const dayData = course.days.find((d) => d.day === dayNumber)
  if (!dayData) notFound()

  let theoryNode: React.ReactNode
  if (typeof dayData.theory !== "string") {
    const Theory = dayData.theory
    theoryNode = <Theory />
  } else {
    theoryNode = <div dangerouslySetInnerHTML={{ __html: dayData.theory }} />
  }

  const safeCourse = sanitizeCourse(course)
  const safeDay: CourseDay =
    safeCourse.days.find((d) => d.day === dayNumber) ?? { ...dayData, theory: "" }

  return (
    <CourseLayout course={safeCourse} currentDay={dayNumber}>
      <DayPage course={safeCourse} day={safeDay} theoryNode={theoryNode} />
    </CourseLayout>
  )
}

export function generateStaticParams() {
  return courses.flatMap((c) =>
    c.days.map((d) => ({ course: c.slug, day: d.day.toString() }))
  )
}
