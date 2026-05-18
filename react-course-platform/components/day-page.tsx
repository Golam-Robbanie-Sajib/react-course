"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ExternalLink, BookOpen, Target, Lightbulb, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useProgress } from "@/hooks/use-progress"
import type { Course, CourseDay } from "@/lib/courses/types"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import { NotesSection } from "@/components/notes-section"
import { QuizSection } from "@/components/quiz-section"
import { ConfidenceRating } from "@/components/confidence-rating"
import { ExerciseCard } from "@/components/exercise-card"
import { usePrefetchDay } from "@/hooks/use-prefetch-day"

interface DayPageProps {
  course: Course
  day: CourseDay
  /** Pre-rendered theory body. Provided by the server page so MDX components
   *  (which can't cross the server→client boundary) render correctly. */
  theoryNode?: React.ReactNode
}

export function DayPage({ course, day, theoryNode }: DayPageProps) {
  const { toggleDayCompletion, isCompleted, isLoading } = useProgress(course.id)
  const [isClient, setIsClient] = useState(false)
  const dayCompleted = isCompleted(day.day)
  const totalDays = course.days.length
  const prefetchDay = usePrefetchDay(course)

  useEffect(() => {
    setIsClient(true)
    // Prefetch adjacent days on mount so Prev/Next are warm.
    prefetchDay(day.day + 1)
    prefetchDay(day.day - 1)
  }, [day.day, prefetchDay])

  if (!isClient || isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="p-6 border rounded-lg bg-white dark:bg-gray-900 space-y-4">
          <Skeleton className="h-9 w-3/4 rounded-md" />
          <Skeleton className="h-5 w-1/2 rounded-md" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-48 rounded-md" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleToggleComplete = () => toggleDayCompletion(day.day)
  const prevHref = day.day > 1 ? `/courses/${course.slug}/day/${day.day - 1}` : null
  const nextHref = day.day < totalDays ? `/courses/${course.slug}/day/${day.day + 1}` : null

  return (
    <motion.div
      className="max-w-4xl mx-auto space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="text-xs font-medium">
                Day {day.day} of {totalDays}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {day.phase}
              </Badge>
            </div>
            {dayCompleted ? (
              <Button
                onClick={handleToggleComplete}
                size="sm"
                variant="outline"
                className="text-green-600 border-green-300 hover:bg-green-50 dark:text-green-400 dark:border-green-700 dark:hover:bg-green-900/50"
              >
                <CheckCircle className="h-4 w-4 mr-2" /> Completed
              </Button>
            ) : (
              <Button onClick={handleToggleComplete} size="sm">
                <CheckCircle className="h-4 w-4 mr-2" /> Mark as Complete
              </Button>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{day.title}</h1>
          <div className="flex flex-wrap gap-2">
            {day.topics.map((topic) => (
              <Badge key={topic} variant="secondary" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>
          <div className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <Target className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>
              By the end of this lesson, you'll understand {day.topics.join(", ").toLowerCase()}.
            </span>
          </div>
        </div>
      </div>

      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <span>Theory &amp; Concepts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {theoryNode ??
              (typeof day.theory === "string" ? (
                <div dangerouslySetInnerHTML={{ __html: day.theory }} />
              ) : null)}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
            <Lightbulb className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Practice Exercises</h2>
        </div>
        <div className="grid gap-6">
          {day.exercises.map((exercise, index) => (
            <ExerciseCard
              key={index}
              exercise={exercise}
              index={index}
              courseId={course.id}
              day={day.day}
            />
          ))}
        </div>
      </div>

      <NotesSection courseId={course.id} day={day.day} />
      <ConfidenceRating courseId={course.id} day={day.day} />

      {day.resources.length > 0 && (
        <Card className="border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                <ExternalLink className="h-5 w-5" />
              </div>
              <span>Additional Resources</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {day.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                >
                  <span className="font-medium text-gray-900 dark:text-white">{resource.name}</span>
                  <ExternalLink className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <QuizSection questions={day.quiz} courseId={course.id} day={day.day} />

      <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
        <div>
          {prevHref ? (
            <Button variant="outline" asChild onMouseEnter={() => prefetchDay(day.day - 1)}>
              <Link href={prevHref} prefetch>← Previous Day</Link>
            </Button>
          ) : null}
        </div>
        <div>
          {nextHref ? (
            <Button asChild onMouseEnter={() => prefetchDay(day.day + 1)}>
              <Link href={nextHref} prefetch>Next Day →</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </motion.div>
  )
}
