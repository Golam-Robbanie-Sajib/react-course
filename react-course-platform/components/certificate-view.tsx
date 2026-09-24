"use client"

import Link from "next/link"
import { ArrowLeft, Printer, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import { useProgress } from "@/hooks/use-progress"
import { CERTIFICATE_PASS_MARK } from "@/lib/achievements"

interface Props {
  courseId: string
  courseSlug: string
  courseTitle: string
  courseDescription: string
  totalDays: number
}

/** Short, stable verification code derived from the learner and course. */
function certificateCode(userId: string, courseId: string): string {
  let h = 2166136261
  for (const ch of `${userId}:${courseId}`) {
    h ^= ch.charCodeAt(0)
    h = Math.imul(h, 16777619)
  }
  return `SLH-${courseId.toUpperCase()}-${(h >>> 0).toString(36).toUpperCase().padStart(7, "0")}`
}

export function CertificateView({ courseId, courseSlug, courseTitle, courseDescription, totalDays }: Props) {
  const { user } = useAuth()
  const { highestScore, completedDays, isLoading } = useProgress(courseId)
  const earned = (highestScore ?? 0) >= CERTIFICATE_PASS_MARK
  const name =
    (user?.user_metadata?.full_name as string | undefined) ||
    (user?.user_metadata?.name as string | undefined) ||
    user?.email?.split("@")[0] ||
    "Learner"
  const issued = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Loading…</div>
  }

  if (!earned) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-md w-full rounded-xl border bg-white dark:bg-gray-900 p-6 text-center space-y-3">
          <Lock className="h-10 w-10 mx-auto text-muted-foreground" />
          <h1 className="text-xl font-bold">Certificate locked</h1>
          <p className="text-sm text-muted-foreground">
            Score at least {CERTIFICATE_PASS_MARK}% on the {courseTitle} final exam to earn your certificate.
            {highestScore !== null && ` Your best so far is ${highestScore}%.`}
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <Button asChild>
              <Link href={`/courses/${courseSlug}/exam`}>Take the exam</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/courses/${courseSlug}`}>Back to course</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-3 sm:p-8 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto mb-4 flex flex-wrap gap-2 print:hidden">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Dashboard
          </Link>
        </Button>
        <Button size="sm" onClick={() => window.print()} className="ml-auto">
          <Printer className="h-4 w-4 mr-1.5" /> Print / Save as PDF
        </Button>
      </div>

      {/* The certificate itself — fixed light colours so it prints the same in dark mode. */}
      <article className="certificate mx-auto max-w-4xl bg-white text-slate-900 rounded-lg shadow-xl print:shadow-none p-2 sm:p-3">
        <div className="border-4 border-double border-amber-500 rounded-md px-5 py-8 sm:px-14 sm:py-14 text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-amber-700">Certificate of Completion</p>
          <p className="mt-6 text-sm text-slate-500">This certifies that</p>
          <h1 className="mt-2 text-3xl sm:text-5xl font-serif font-bold break-words">{name}</h1>
          <p className="mt-4 text-sm text-slate-500">has successfully completed</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-indigo-700">{courseTitle}</h2>
          <p className="mt-3 mx-auto max-w-xl text-xs sm:text-sm text-slate-600">{courseDescription}</p>

          <dl className="mt-8 grid grid-cols-3 gap-2 sm:gap-6 max-w-lg mx-auto">
            <div>
              <dt className="text-[10px] sm:text-xs uppercase tracking-wide text-slate-500">Exam score</dt>
              <dd className="text-lg sm:text-2xl font-bold">{highestScore}%</dd>
            </div>
            <div>
              <dt className="text-[10px] sm:text-xs uppercase tracking-wide text-slate-500">Lessons</dt>
              <dd className="text-lg sm:text-2xl font-bold">
                {completedDays.length}/{totalDays}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] sm:text-xs uppercase tracking-wide text-slate-500">Issued</dt>
              <dd className="text-xs sm:text-sm font-semibold mt-1 sm:mt-2">{issued}</dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div>
              <p className="font-semibold">Self-Learn Hub</p>
              <p className="text-xs text-slate-500">Self-paced learning with auto-graded practice</p>
            </div>
            <p className="font-mono text-[10px] sm:text-xs text-slate-500">
              Certificate ID: {user ? certificateCode(user.id, courseId) : "—"}
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
