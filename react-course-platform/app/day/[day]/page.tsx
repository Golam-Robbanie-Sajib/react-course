// filepath: app/day/[day]/page.tsx
import { CourseLayout } from "@/components/course-layout"
import { DayPage } from "@/components/day-page"
import { courseData } from "@/lib/course-data"
import { notFound } from "next/navigation"

interface DayPageProps {
  params: Promise<{
    day: string
  }>
}

export default async function Day({ params }: DayPageProps) {
  const { day } = await params
  const dayNumber = Number.parseInt(day)
  const dayData = courseData.find((d) => d.day === dayNumber)

  if (!dayData) {
    notFound()
  }

  return (
    <CourseLayout currentDay={dayNumber}>
      <DayPage day={dayData} />
    </CourseLayout>
  )
}

export function generateStaticParams() {
  if (!Array.isArray(courseData)) {
    return []
  }
  
  return courseData.map((day) => ({
    day: day.day.toString(),
  }))
}