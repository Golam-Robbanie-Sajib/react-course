// filepath: components/day-page.tsx
"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, ExternalLink, BookOpen, Target, Lightbulb, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/code-block"
import { useProgress } from "@/hooks/use-progress"
import type { CourseDay } from "@/lib/course-data"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"
import { NotesSection } from "@/components/notes-section"
import { QuizSection } from "@/components/quiz-section"
import { ConfidenceRating } from "@/components/confidence-rating"
import Confetti from 'react-confetti'

interface DayPageProps {
  day: CourseDay
}

export function DayPage({ day }: DayPageProps) {
  const { toggleDayCompletion, isCompleted, isLoading } = useProgress()
  const [isClient, setIsClient] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const dayCompleted = isCompleted(day.day)

  // Confetti dimensions
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setIsClient(true)
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const handleToggleComplete = () => {
    const isNowComplete = !dayCompleted;
    toggleDayCompletion(day.day)

    if (isNowComplete) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000) // Stop confetti after 5 seconds
    }
  }

  if (!isClient || isLoading) {
    return <DayPageSkeleton />
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20 relative">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={500}
          recycle={false}
          className="fixed top-0 left-0 z-50 pointer-events-none"
        />
      )}

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-muted-foreground border-primary/20 bg-primary/5">
                  Phase: {day.phase}
                </Badge>
                <Badge className="bg-primary text-primary-foreground">Day {day.day}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {day.title}
              </h1>
           </div>

           <Button
             onClick={handleToggleComplete}
             size="lg"
             variant={dayCompleted ? "outline" : "default"}
             className={`transition-all duration-300 ${dayCompleted ? "border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/30" : "shadow-lg hover:shadow-xl hover:scale-105"}`}
           >
             {dayCompleted ? (
               <>
                 <CheckCircle className="h-5 w-5 mr-2" />
                 Completed
               </>
             ) : (
               <>
                 <CheckCircle className="h-5 w-5 mr-2" />
                 Mark Complete
               </>
             )}
           </Button>
        </div>

        <div className="flex flex-wrap gap-2">
            {day.topics.map((topic) => (
              <Badge key={topic} variant="secondary" className="px-3 py-1 text-sm bg-secondary/50 hover:bg-secondary transition-colors">
                #{topic}
              </Badge>
            ))}
        </div>

        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex items-start gap-3">
            <Target className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              <span className="font-semibold text-foreground">Learning Goal:</span> By the end of this lesson, you will have a solid understanding of {day.topics.slice(0, 3).join(", ").toLowerCase()} and how to apply them in real-world scenarios.
            </p>
        </div>
      </motion.div>

      {/* Theory Content */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-border/50 shadow-sm overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 w-full" />
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <BookOpen className="h-5 w-5" />
              </div>
              Theory & Concepts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: day.theory }}
            />
          </CardContent>
        </Card>
      </motion.section>

      {/* Exercises */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
            <Lightbulb className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Practice Exercises</h2>
        </div>

        <div className="grid gap-8">
          {day.exercises.map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} index={index} />
          ))}
        </div>
      </motion.section>
      
      {/* Interactive Sections */}
      <div className="grid md:grid-cols-2 gap-6">
          <NotesSection day={day.day} />
          <ConfidenceRating day={day.day} />
      </div>

      {/* Resources */}
      {day.resources.length > 0 && (
        <Card className="border-border/50 bg-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ExternalLink className="h-5 w-5" />
              Additional Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-3">
              {day.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-xl bg-background border hover:border-primary/50 hover:shadow-md transition-all duration-200"
                >
                  <span className="font-medium truncate mr-2">{resource.name}</span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quiz */}
      <div className="pt-4">
         <QuizSection questions={day.quiz} />
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center pt-10 border-t">
        <div>
          {day.day > 1 ? (
            <Button variant="ghost" className="group pl-0 hover:pl-2 transition-all" asChild>
              <Link href={`/day/${day.day - 1}`}>
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Previous Day
              </Link>
            </Button>
          ) : <div />}
        </div>
        <div>
          {day.day < 25 ? (
            <Button className="group pr-4 hover:pr-6 transition-all" asChild>
              <Link href={`/day/${day.day + 1}`}>
                Next Day
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          ) : (
            <Button variant="default" asChild>
                <Link href="/dashboard">Finish Course</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function DayPageSkeleton() {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
        <div className="p-8 border rounded-xl space-y-4">
          <div className="flex justify-between">
             <div className="h-8 w-48 bg-muted rounded" />
             <div className="h-10 w-32 bg-muted rounded" />
          </div>
          <div className="h-12 w-3/4 bg-muted rounded" />
          <div className="flex gap-2">
             <div className="h-6 w-20 bg-muted rounded-full" />
             <div className="h-6 w-20 bg-muted rounded-full" />
          </div>
        </div>
        <div className="h-64 bg-muted rounded-xl" />
        <div className="h-40 bg-muted rounded-xl" />
      </div>
    )
}

interface ExerciseCardProps {
  exercise: CourseDay["exercises"][0]
  index: number
}

function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  const [showSolution, setShowSolution] = useState(false)

  return (
    <Card className="border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden group">
      <CardHeader className="bg-muted/10 pb-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">
            {index + 1}
          </div>
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold">{exercise.title}</CardTitle>
            <CardDescription>Exercise Challenge</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground">
           <p>{exercise.description}</p>
        </div>

        <div className="border-t pt-4">
            <Button
                variant="ghost"
                onClick={() => setShowSolution(!showSolution)}
                className="w-full flex justify-between items-center group/btn hover:bg-muted"
            >
            <span className="font-medium text-foreground group-hover/btn:text-primary transition-colors">
                {showSolution ? "Hide Solution" : "Reveal Solution"}
            </span>
            {showSolution ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            <AnimatePresence>
                {showSolution && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <div className="pt-6 space-y-6">
                        <div className="rounded-lg overflow-hidden border shadow-sm">
                             <CodeBlock code={exercise.solution.code} language="javascript" title="Solution Code" />
                        </div>

                        <div className="p-5 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                            <h4 className="flex items-center gap-2 font-semibold text-blue-800 dark:text-blue-300 mb-3">
                                <Lightbulb className="w-4 h-4" />
                                Explanation
                            </h4>
                            <div
                                className="prose prose-sm prose-blue dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: exercise.solution.explanation }}
                            />
                        </div>
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}
