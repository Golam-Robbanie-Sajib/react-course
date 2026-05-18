import { notFound } from "next/navigation"
import { CourseLayout } from "@/components/course-layout"
import { ExamView } from "@/components/exam-view"
import { getCourse, getExamQuestions, courses } from "@/lib/courses"
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

export default async function ExamPage({ params }: Props) {
  const { course: slug } = await params
  const course = getCourse(slug)
  if (!course || !course.hasFinalExam) notFound()
  const questions = getExamQuestions(course.id)
  if (!questions || questions.length === 0) notFound()
  const safeCourse = sanitizeCourse(course)
  return (
    <CourseLayout course={safeCourse}>
      <ExamView
        courseId={safeCourse.id}
        courseTitle={safeCourse.title.split(" in ")[0]}
        questions={questions}
      />
    </CourseLayout>
  )
}

export function generateStaticParams() {
  return courses.filter((c) => c.hasFinalExam).map((c) => ({ course: c.slug }))
}
