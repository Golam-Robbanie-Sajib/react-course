"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2, Circle } from "lucide-react"
import type { Course } from "@/lib/courses/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useProgress } from "@/hooks/use-progress"

interface Props {
  course: Course
}

export function CourseLanding({ course }: Props) {
  const { completedDays, isCompleted } = useProgress(course.id)
  const total = course.days.length
  const done = completedDays.length
  const pct = Math.round((done / total) * 100)
  const nextDay = course.days.find((d) => !completedDays.includes(d.day))?.day || 1

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{course.level}</Badge>
          <Badge variant="outline">{course.durationLabel}</Badge>
        </div>
        <h1 className="text-4xl font-bold">{course.title}</h1>
        <p className="text-lg text-muted-foreground">{course.description}</p>
        <div className="flex gap-3 flex-wrap">
          <Button size="lg" asChild>
            <Link href={`/courses/${course.slug}/day/${nextDay}`}>
              {done > 0 ? `Resume at Day ${nextDay}` : "Start Day 1"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          {course.hasFinalExam && (
            <Button size="lg" variant="outline" asChild>
              <Link href={`/exam`}>Take the final exam</Link>
            </Button>
          )}
        </div>
        <div className="pt-2 space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Your progress</span>
            <span>
              {done}/{total} ({pct}%)
            </span>
          </div>
          <div className="h-2 bg-muted/40 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${course.coverGradient}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </header>

      <section className="space-y-8">
        {course.phases.map((phase) => {
          const phaseDays = course.days.filter((d) => d.phase === phase.name)
          if (phaseDays.length === 0) return null
          return (
            <div key={phase.name} className="space-y-3">
              <div
                className={`p-4 rounded-xl bg-gradient-to-r ${phase.bgGradient} dark:${phase.darkBgGradient} border border-white/30`}
              >
                <h2
                  className={`text-xl font-semibold bg-gradient-to-r ${phase.gradient} bg-clip-text text-transparent`}
                >
                  {phase.name}
                </h2>
                <p className="text-sm text-muted-foreground">{phase.days}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {phaseDays.map((day) => {
                  const done = isCompleted(day.day)
                  return (
                    <Link key={day.day} href={`/courses/${course.slug}/day/${day.day}`}>
                      <Card className="h-full hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700">
                        <CardHeader>
                          <CardTitle className="flex items-start justify-between gap-2 text-base">
                            <span>
                              <span className="text-muted-foreground mr-1">Day {day.day}.</span>
                              {day.title}
                            </span>
                            {done ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            ) : (
                              <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex flex-wrap gap-1">
                            {day.topics.slice(0, 3).map((t) => (
                              <Badge key={t} variant="secondary" className="text-xs">
                                {t}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
