"use client"

import { ArrowRight, BookOpen, Clock, Code, Lightbulb, Zap, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { courses } from "@/lib/courses"
import { useProgress } from "@/hooks/use-progress"
import { useIdlePrefetch } from "@/hooks/use-idle-prefetch"
import Link from "next/link"

export function HomePage() {
  // Warm up the Sandpack editor bundle while the user is reading the catalog,
  // so clicking into Day 1 of either course is instant.
  useIdlePrefetch(() => import("@/components/live-exercise"))

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="flex-1">
        <section className="bg-white dark:bg-gray-900 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-gray-300 dark:border-gray-600">
              <Zap className="w-4 h-4 mr-2" />
              Two courses · live coding · save progress without signing in
            </Badge>

            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Learn the web, one day at a time.
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Self-paced courses with in-browser editors, automatic test feedback, progressive hints, and
              progress that persists locally even without an account.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Button size="lg" asChild>
                <Link href="/courses/html">
                  Start with HTML
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/courses/react">
                  Jump to React
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Choose your course</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Each course follows the same proven structure: theory → live exercise → quiz.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {courses.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-10">What makes this practical</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Code,
                  title: "Live, in-browser coding",
                  desc: "Every exercise opens a sandboxed editor + preview. No installs, no setup — type and see results.",
                },
                {
                  icon: GraduationCap,
                  title: "Auto-graded with tests",
                  desc: "Run the included tests to know if your solution actually works, instead of guessing.",
                },
                {
                  icon: Lightbulb,
                  title: "Progressive hints",
                  desc: "Stuck? Reveal hints one at a time. Solutions stay locked until you've tried.",
                },
                {
                  icon: BookOpen,
                  title: "Works without an account",
                  desc: "Progress, notes, and confidence ratings save to your device. Sign in later to sync.",
                },
                {
                  icon: Clock,
                  title: "Self-paced and structured",
                  desc: "Skim a day in 20 minutes or stretch it over a weekend. The site keeps your place.",
                },
                {
                  icon: Zap,
                  title: "Keyboard friendly",
                  desc: "← / → to jump between days, ⌘K to search across both courses' content.",
                },
              ].map((f) => (
                <Card key={f.title} className="border border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                        <f.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{f.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">{f.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function CourseCard({ course }: { course: (typeof courses)[number] }) {
  const { completedDays } = useProgress(course.id)
  const total = course.days.length
  const done = completedDays.length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  const nextDay = course.days.find((d) => !completedDays.includes(d.day))?.day || 1

  return (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className={`h-2 bg-gradient-to-r ${course.coverGradient}`} />
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">{course.level}</Badge>
          <Badge variant="outline">{course.durationLabel}</Badge>
        </div>
        <CardTitle className="text-2xl">{course.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{course.tagline}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Your progress</span>
            <span>
              {done}/{total} · {pct}%
            </span>
          </div>
          <div className="h-2 bg-muted/40 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${course.coverGradient}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <Button asChild>
            <Link href={`/courses/${course.slug}/day/${nextDay}`}>
              {done > 0 ? "Resume" : "Start"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/courses/${course.slug}`}>View curriculum</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
