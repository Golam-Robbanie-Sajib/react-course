// filepath: components/day-page.tsx
"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, ExternalLink, BookOpen, Target, Lightbulb, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/code-block"
import { useProgress } from "@/hooks/use-progress"
import type { CourseDay } from "@/lib/course-data"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import { NotesSection } from "@/components/notes-section"
import { QuizSection } from "@/components/quiz-section"
import { ConfidenceRating } from "@/components/confidence-rating"

interface DayPageProps {
  day: CourseDay
}

export function DayPage({ day }: DayPageProps) {
  const { toggleDayCompletion, isCompleted, isLoading } = useProgress()
  const [isClient, setIsClient] = useState(false)
  const dayCompleted = isCompleted(day.day)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleToggleComplete = () => {
    toggleDayCompletion(day.day)
  }

  if (!isClient || isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="p-6 border rounded-lg bg-white dark:bg-gray-900 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <Skeleton className="h-9 w-36 rounded-md" />
          </div>
          <Skeleton className="h-9 w-3/4 rounded-md" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
        </div>
        {/* Theory Card Skeleton */}
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

  return (
    <motion.div
      className="max-w-4xl mx-auto space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="text-xs font-medium">
                Day {day.day}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {day.phase}
              </Badge>
            </div>
            {dayCompleted ? (
              <Button onClick={handleToggleComplete} size="sm" variant="outline" className="text-green-600 border-green-300 hover:bg-green-50 dark:text-green-400 dark:border-green-700 dark:hover:bg-green-900/50">
                <CheckCircle className="h-4 w-4 mr-2" />
                Completed
              </Button>
            ) : (
              <Button onClick={handleToggleComplete} size="sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Complete
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
            <span>By the end of this lesson, you'll understand {day.topics.join(", ").toLowerCase()}</span>
          </div>
        </div>
      </div>

      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <span>Theory & Concepts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="prose prose-gray dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: day.theory }}
          />
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
            <ExerciseCard key={index} exercise={exercise} index={index} />
          ))}
        </div>
      </div>
      
      <NotesSection day={day.day} />

      <ConfidenceRating day={day.day} />

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

      <QuizSection questions={day.quiz} />

      <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
        <div>
          {day.day > 1 && (
            <Button variant="outline" asChild>
              <Link href={`/day/${day.day - 1}`}>← Previous Day</Link>
            </Button>
          )}
        </div>
        <div>
          {day.day < 25 && (
            <Button asChild>
              <Link href={`/day/${day.day + 1}`}>Next Day →</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

interface ExerciseCardProps {
  exercise: CourseDay["exercises"][0]
  index: number
}

function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  const [showSolution, setShowSolution] = useState(false)
  return (
    <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold">
            {index + 1}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{exercise.title}</h3>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300">{exercise.description}</p>
        </div>
        <Button variant="outline" onClick={() => setShowSolution(!showSolution)} className="w-full justify-between">
          <span>{showSolution ? "Hide" : "Show"} Solution</span>
          {showSolution ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {showSolution && (
          <div className="space-y-6">
            <CodeBlock code={exercise.solution.code} language="javascript" title={`Solution: ${exercise.title}`} />
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Explanation</h4>
              <div
                className="prose prose-gray dark:prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: exercise.solution.explanation }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}