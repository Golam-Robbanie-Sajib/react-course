"use client"

import Link from "next/link"
import { CourseLayout } from "@/components/course-layout"
import { useQuizAttempts } from "@/hooks/use-quiz-attempts"
import { courses } from "@/lib/courses"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Flame, Target, FlaskConical, ArrowRight, Brain, Award, CalendarDays, Info } from "lucide-react"
import { useLearningStats, type CourseStats } from "@/lib/learning-stats"
import { computeAchievements, CERTIFICATE_PASS_MARK } from "@/lib/achievements"
import { ActivityHeatmap } from "@/components/dashboard/activity-heatmap"

export default function DashboardPage() {
  const stats = useLearningStats()
  const achievements = computeAchievements(stats)
  const earned = achievements.filter((a) => a.earned).length
  const accuracy = stats.quizAttempts ? Math.round((stats.quizCorrect / stats.quizAttempts) * 100) : null

  return (
    <CourseLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold">My Dashboard</h1>
            <p className="text-muted-foreground text-sm">Your progress across every course.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild size="sm">
              <Link href="/practice">Practice</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/profile">Profile</Link>
            </Button>
          </div>
        </div>

        {stats.needsMigration && (
          <div className="flex gap-2 rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20 p-3 text-sm text-amber-900 dark:text-amber-100">
            <Info className="h-4 w-4 mt-0.5 shrink-0" />
            <span>
              HTML and C progress is currently saved on this device. It will sync to your account once the
              site&apos;s database update is applied.
            </span>
          </div>
        )}

        {/* Headline stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatTile
            icon={<CheckCircle className="h-4 w-4 text-emerald-500" />}
            label="Lessons"
            value={`${stats.completedLessons}/${stats.totalLessons}`}
            hint={`${stats.totalLessons ? Math.round((stats.completedLessons / stats.totalLessons) * 100) : 0}% of all courses`}
          />
          <StatTile
            icon={<Flame className="h-4 w-4 text-orange-500" />}
            label="Study streak"
            value={`${stats.streak.current} day${stats.streak.current === 1 ? "" : "s"}`}
            hint={`Longest: ${stats.streak.longest}`}
          />
          <StatTile
            icon={<FlaskConical className="h-4 w-4 text-indigo-500" />}
            label="Exercises solved"
            value={String(stats.solvedExercises)}
            hint="All tests passing"
          />
          <StatTile
            icon={<Target className="h-4 w-4 text-sky-500" />}
            label="Quiz accuracy"
            value={accuracy === null ? "—" : `${accuracy}%`}
            hint={`${stats.quizCorrect} correct of ${stats.quizAttempts}`}
          />
        </div>

        {/* Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarDays className="h-4 w-4 text-emerald-500" /> Study activity
            </CardTitle>
            <CardDescription>Lessons, quiz answers, code runs and passed tests over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityHeatmap log={stats.activity} />
          </CardContent>
        </Card>

        <ReviewQueueCard />

        {/* Per-course */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {stats.byCourse.map((c) => (
            <CourseCard key={c.courseId} stats={c} />
          ))}
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Award className="h-4 w-4 text-yellow-500" /> Achievements
              <span className="ml-auto text-xs font-normal text-muted-foreground">
                {earned}/{achievements.length} earned
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {achievements.map((a) => (
                <li
                  key={a.id}
                  className={`rounded-lg border p-3 ${
                    a.earned
                      ? "border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-950/20"
                      : "border-gray-200 dark:border-gray-700 opacity-80"
                  }`}
                >
                  <div className={`text-2xl ${a.earned ? "" : "grayscale opacity-60"}`} aria-hidden>
                    {a.emoji}
                  </div>
                  <div className="mt-1 text-sm font-medium leading-tight">{a.title}</div>
                  <div className="text-xs text-muted-foreground leading-snug">{a.description}</div>
                  {!a.earned && (
                    <div
                      className="mt-2 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={a.goal}
                      aria-valuenow={a.progress}
                      aria-label={`${a.title} progress`}
                    >
                      <div className="h-full bg-yellow-400" style={{ width: `${(a.progress / a.goal) * 100}%` }} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </CourseLayout>
  )
}

function StatTile({ icon, label, value, hint }: { icon: React.ReactNode; label: string; value: string; hint: string }) {
  return (
    <Card className="gap-2 py-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 pb-0">
        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">{label}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="px-4">
        <div className="text-xl sm:text-2xl font-bold tabular-nums">{value}</div>
        <p className="text-[11px] sm:text-xs text-muted-foreground truncate">{hint}</p>
      </CardContent>
    </Card>
  )
}

function CourseCard({ stats: c }: { stats: CourseStats }) {
  const course = courses.find((x) => x.id === c.courseId)!
  const done = c.completedDays.length
  const pct = c.totalDays ? Math.round((done / c.totalDays) * 100) : 0
  const nextDay = course.days.find((d) => !c.completedDays.includes(d.day))?.day ?? 1
  const accuracy = c.quizAttempts ? Math.round((c.quizCorrect / c.quizAttempts) * 100) : null
  const certified = (c.examHighest ?? 0) >= CERTIFICATE_PASS_MARK

  return (
    <Card className="overflow-hidden gap-3 pt-0">
      <div className={`h-1.5 bg-gradient-to-r ${course.coverGradient}`} />
      <CardHeader className="pb-0">
        <CardTitle className="text-base">{c.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>
              {done}/{c.totalDays} lessons
            </span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${course.coverGradient}`} style={{ width: `${pct}%` }} />
          </div>
        </div>
        <dl className="grid grid-cols-3 gap-2 text-center">
          <Metric label="Solved" value={`${c.solvedExercises}/${c.totalExercises}`} />
          <Metric label="Quiz" value={accuracy === null ? "—" : `${accuracy}%`} />
          <Metric label="Exam best" value={c.examHighest === null ? "—" : `${c.examHighest}%`} />
        </dl>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" asChild className="flex-1">
            <Link href={`/courses/${c.slug}/day/${nextDay}`}>
              {done > 0 ? "Resume" : "Start"} <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          {certified ? (
            <Button size="sm" variant="outline" asChild className="flex-1">
              <Link href={`/courses/${c.slug}/certificate`}>📜 Certificate</Link>
            </Button>
          ) : (
            <Button size="sm" variant="outline" asChild className="flex-1">
              <Link href={`/courses/${c.slug}/exam`}>Final exam</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-muted/50 px-1 py-2">
      <dd className="text-sm font-semibold tabular-nums">{value}</dd>
      <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</dt>
    </div>
  )
}

function ReviewQueueCard() {
  const { dueQuestionIds, store } = useQuizAttempts()
  const dueCount = dueQuestionIds().length
  const totalSeen = Object.keys(store.byQuestion).length
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center gap-3 flex-wrap">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-2 text-base">
              <Brain className="h-4 w-4 text-purple-500" /> Spaced review
            </CardTitle>
            <CardDescription>
              {totalSeen === 0
                ? "Answer quiz questions in lessons — missed ones come back here on a spaced schedule."
                : dueCount > 0
                  ? `${dueCount} question${dueCount === 1 ? "" : "s"} due for review.`
                  : `All caught up — ${totalSeen} questions tracked.`}
            </CardDescription>
          </div>
          {dueCount > 0 && (
            <Button asChild size="sm">
              <Link href="/review">
                Start review <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardHeader>
    </Card>
  )
}
