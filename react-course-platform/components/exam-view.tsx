"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { QuizQuestion } from "@/lib/courses/types"
import { ArrowRight, CheckCircle, RefreshCw, Trophy, Clock, X } from "lucide-react"
import { useCountdown } from "@/hooks/use-countdown"
import { useRouter } from "next/navigation"
import { useProgress } from "@/hooks/use-progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const EXAM_DURATION = 3600 * 1000 // 1 hour

const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5)

type ExamState = "idle" | "active" | "finished"

interface ExamViewProps {
  courseId: string
  courseTitle: string
  questions: QuizQuestion[]
}

export function ExamView({ courseId, courseTitle, questions: pool }: ExamViewProps) {
  const storageKey = `exam:${courseId}`
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [examState, setExamState] = useState<ExamState>("idle")
  const [examFinished, setExamFinished] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([])
  const [score, setScore] = useState(0)
  const [examDeadline, setExamDeadline] = useState<number | null>(null)

  const router = useRouter()
  const { highestScore, lastScore, updateExamScores } = useProgress(courseId)

  const clearExamState = useCallback(() => {
    localStorage.removeItem(`${storageKey}:deadline`)
    localStorage.removeItem(`${storageKey}:answers`)
    localStorage.removeItem(`${storageKey}:questions`)
  }, [storageKey])

  const handleFinishExam = useCallback(() => {
    if (examFinished) return
    const finalAnswers = JSON.parse(
      localStorage.getItem(`${storageKey}:answers`) || "[]"
    ) as (number | null)[]
    const savedQuestions = JSON.parse(
      localStorage.getItem(`${storageKey}:questions`) || "[]"
    ) as QuizQuestion[]
    if (savedQuestions.length === 0) return
    let finalScore = 0
    for (let i = 0; i < savedQuestions.length; i++) {
      if (finalAnswers[i] === savedQuestions[i].correctAnswerIndex) finalScore++
    }
    setScore(finalScore)
    updateExamScores({ newScore: finalScore, totalQuestions: savedQuestions.length })
    setExamFinished(true)
    setExamState("finished")
    clearExamState()
  }, [examFinished, updateExamScores, clearExamState, storageKey])

  const { minutes, seconds } = useCountdown(examDeadline, handleFinishExam)

  useEffect(() => {
    const savedDeadline = localStorage.getItem(`${storageKey}:deadline`)
    if (savedDeadline) {
      const deadline = parseInt(savedDeadline, 10)
      if (deadline > Date.now()) {
        setExamDeadline(deadline)
        setQuestions(JSON.parse(localStorage.getItem(`${storageKey}:questions`) || "[]"))
        setUserAnswers(JSON.parse(localStorage.getItem(`${storageKey}:answers`) || "[]"))
        setExamState("active")
      } else {
        handleFinishExam()
      }
    }
  }, [handleFinishExam, storageKey])

  const handleStartExam = () => {
    clearExamState()
    const shuffledQuestions = shuffleArray(pool)
    const processed = shuffledQuestions.map((q) => {
      const correctText = q.options[q.correctAnswerIndex]
      const shuffledOptions = shuffleArray(q.options)
      const newCorrect = shuffledOptions.indexOf(correctText)
      return { ...q, options: shuffledOptions, correctAnswerIndex: newCorrect }
    })
    const deadline = Date.now() + EXAM_DURATION
    const initialAnswers = new Array(processed.length).fill(null)
    setQuestions(processed)
    setExamDeadline(deadline)
    setUserAnswers(initialAnswers)
    setExamFinished(false)
    setScore(0)
    setCurrentQuestionIndex(0)
    localStorage.setItem(`${storageKey}:questions`, JSON.stringify(processed))
    localStorage.setItem(`${storageKey}:deadline`, deadline.toString())
    localStorage.setItem(`${storageKey}:answers`, JSON.stringify(initialAnswers))
    setExamState("active")
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const next = [...userAnswers]
    next[currentQuestionIndex] = answerIndex
    setUserAnswers(next)
    localStorage.setItem(`${storageKey}:answers`, JSON.stringify(next))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handleCancelExam = () => {
    clearExamState()
    router.push(`/courses/${courseId}`)
  }

  if (examState === "idle") {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8">
        <Trophy className="h-16 w-16 text-yellow-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">{courseTitle} — Final Exam</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          You have 1 hour to complete {pool.length} questions. Question and answer order
          are shuffled each attempt. Good luck!
        </p>
        {(highestScore !== null || lastScore !== null) && (
          <Card className="mb-8 p-6 text-left">
            <CardTitle className="mb-4">Your previous scores</CardTitle>
            <div className="flex space-x-8">
              {highestScore !== null && (
                <div>
                  <p className="text-sm text-muted-foreground">Highest</p>
                  <p className="text-2xl font-bold">{highestScore}%</p>
                </div>
              )}
              {lastScore !== null && (
                <div>
                  <p className="text-sm text-muted-foreground">Last</p>
                  <p className="text-2xl font-bold">{lastScore}%</p>
                </div>
              )}
            </div>
          </Card>
        )}
        <Button size="lg" onClick={handleStartExam}>
          Start Exam <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    )
  }

  if (examState === "finished") {
    const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0
    return (
      <div className="flex flex-col items-center justify-center text-center p-8">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Exam complete!</h1>
        <p className="text-muted-foreground mb-6">Your score has been saved.</p>
        <Card className="p-8">
          <p className="text-lg">Your score</p>
          <p className="text-5xl font-bold my-2">{percentage}%</p>
          <p className="text-muted-foreground">
            You answered {score} out of {questions.length} questions correctly.
          </p>
        </Card>
        <Button size="lg" onClick={() => setExamState("idle")} className="mt-8">
          <RefreshCw className="h-4 w-4 mr-2" />
          Back to exam page
        </Button>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const selectedAnswer = userAnswers[currentQuestionIndex]

  return (
    <>
      <div className="fixed top-16 w-full px-4 z-20">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div
            className={`flex items-center space-x-2 px-4 py-2 rounded-full border shadow-lg transition-colors ${
              parseInt(minutes) < 5
                ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-200 dark:border-red-800"
                : "bg-white/70 backdrop-blur-lg dark:bg-slate-900/70"
            }`}
          >
            <Clock className="h-5 w-5" />
            <span className="text-lg font-semibold tabular-nums">
              {minutes}:{seconds}
            </span>
          </div>
          <div className="flex space-x-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel exam?</AlertDialogTitle>
                  <AlertDialogDescription>Your progress will be lost.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Continue exam</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancelExam}>Yes, cancel</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Restart
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Restart exam?</AlertDialogTitle>
                  <AlertDialogDescription>Your progress will be lost.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => setExamState("idle")}>
                    Yes, restart
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="pt-32"
      >
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>
              Question {currentQuestionIndex + 1}/{questions.length}
            </CardTitle>
            <CardDescription className="pt-4 text-lg text-foreground">
              {currentQuestion?.question}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {currentQuestion?.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full justify-start h-auto py-3 text-left whitespace-normal transition-colors duration-200 border-2 ${
                      isSelected
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent hover:bg-accent"
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    {option}
                  </Button>
                )
              })}
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="text-sm text-muted-foreground">
                Answered: {userAnswers.filter((a) => a !== null).length}/{questions.length}
              </span>
              {currentQuestionIndex < questions.length - 1 ? (
                <Button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
                  Next question <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleFinishExam}
                  disabled={selectedAnswer === null}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Finish exam <Trophy className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}
