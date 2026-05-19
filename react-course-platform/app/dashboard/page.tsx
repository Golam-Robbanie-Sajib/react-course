"use client"

import Link from "next/link"
import { CourseLayout } from "@/components/course-layout"
import { useProgress } from "@/hooks/use-progress"
import { useQuizAttempts } from "@/hooks/use-quiz-attempts"
import { courses } from "@/lib/courses"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Flame, Star, Trophy, ArrowRight, Brain } from "lucide-react"

export default function DashboardPage() {
  return (
    <CourseLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <p className="text-muted-foreground text-sm">
              Track your progress across every course on the platform.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/practice">Practice</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/profile">Profile settings</Link>
            </Button>
          </div>
        </div>

        <PlatformStats />

        <ReviewQueueCard />

        <div className="space-y-6">
          {courses.map((c) => (
            <CourseProgressCard key={c.id} course={c} />
          ))}
        </div>
      </div>
    </CourseLayout>
  )
}

function ReviewQueueCard() {
  const { dueQuestionIds, store } = useQuizAttempts()
  const dueCount = dueQuestionIds().length
  const totalSeen = Object.keys(store.byQuestion).length
  if (totalSeen === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Brain className="h-4 w-4 text-purple-500" /> Spaced review
          </CardTitle>
          <CardDescription>
            Answer any quiz question on a lesson and it gets added to your review queue —
            missed ones come back tomorrow, correct ones reappear at growing intervals.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start gap-3 flex-wrap">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-500" /> Spaced review
            </CardTitle>
            <CardDescription>
              {dueCount > 0
                ? `${dueCount} question${dueCount === 1 ? "" : "s"} due for review.`
                : `All caught up — ${totalSeen} questions tracked.`}
            </CardDescription>
          </div>
          <Button asChild disabled={dueCount === 0}>
            <Link href="/review">
              {dueCount > 0 ? "Start review" : "Nothing due"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}

function PlatformStats() {
  const reactProg = useProgress("react")
  const htmlProg = useProgress("html")
  const totalDone = reactProg.completedDays.length + htmlProg.completedDays.length
  const totalDays = courses.reduce((s, c) => s + c.days.length, 0)
  const allConfidence = [
    ...Object.values(reactProg.confidenceRatings),
    ...Object.values(htmlProg.confidenceRatings),
  ]
  const avg = allConfidence.length
    ? (allConfidence.reduce((a, b) => a + b, 0) / allConfidence.length).toFixed(1)
    : "0.0"

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalDone} / {totalDays}
          </div>
          <p className="text-xs text-muted-foreground">
            {Math.round((totalDone / totalDays) * 100)}% complete
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
          <Flame className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{reactProg.currentStreak} Days</div>
          <p className="text-xs text-muted-foreground">Keep the fire burning</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">React Exam Best</CardTitle>
          <Trophy className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {reactProg.highestScore !== null ? `${reactProg.highestScore}%` : "N/A"}
          </div>
          <p className="text-xs text-muted-foreground">From the final exam</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Confidence</CardTitle>
          <Star className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avg} / 5.0</div>
          <p className="text-xs text-muted-foreground">Across all rated lessons</p>
        </CardContent>
      </Card>
    </div>
  )
}

function CourseProgressCard({ course }: { course: (typeof courses)[number] }) {
  const { completedDays } = useProgress(course.id)
  const total = course.days.length
  const done = completedDays.length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  const nextDay = course.days.find((d) => !completedDays.includes(d.day))?.day || 1
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start gap-3 flex-wrap">
          <div>
            <CardTitle>{course.title}</CardTitle>
            <CardDescription>{course.tagline}</CardDescription>
          </div>
          <Button size="sm" asChild>
            <Link href={`/courses/${course.slug}/day/${nextDay}`}>
              {done > 0 ? "Resume" : "Start"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{done} / {total} lessons</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2 bg-muted/40 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${course.coverGradient}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="space-y-2 pt-2">
          {course.phases.map((phase) => {
            const phaseDays = course.days.filter((d) => d.phase === phase.name)
            const doneInPhase = phaseDays.filter((d) => completedDays.includes(d.day)).length
            const phasePct = phaseDays.length > 0 ? Math.round((doneInPhase / phaseDays.length) * 100) : 0
            return (
              <div key={phase.name}>
                <div className="flex justify-between mb-1 text-sm">
                  <span>{phase.name}</span>
                  <span className="text-muted-foreground">
                    {doneInPhase} / {phaseDays.length}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 dark:bg-slate-700">
                  <div
                    className={`h-1.5 rounded-full bg-gradient-to-r ${phase.gradient}`}
                    style={{ width: `${phasePct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
