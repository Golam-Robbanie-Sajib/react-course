import { notFound } from "next/navigation"
import { CertificateView } from "@/components/certificate-view"
import { getCourse, courses } from "@/lib/courses"

interface Props {
  params: Promise<{ course: string }>
}

export default async function CertificatePage({ params }: Props) {
  const { course: slug } = await params
  const course = getCourse(slug)
  if (!course || !course.hasFinalExam) notFound()
  // Only plain serialisable fields cross into the client component.
  return (
    <CertificateView
      courseId={course.id}
      courseSlug={course.slug}
      courseTitle={course.title}
      courseDescription={course.tagline}
      totalDays={course.days.length}
    />
  )
}

export function generateStaticParams() {
  return courses.filter((c) => c.hasFinalExam).map((c) => ({ course: c.slug }))
}
