// filepath: components/quiz-section.tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Lightbulb, RefreshCw } from "lucide-react"
import type { QuizQuestion } from "@/lib/course-data"

interface QuizSectionProps {
  questions?: QuizQuestion[]
}

export function QuizSection({ questions }: QuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)

  if (!questions || questions.length === 0) {
    return null
  }

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswerSelect = (index: number) => {
    if (showResult) return // Don't allow changing answer after submission
    setSelectedAnswerIndex(index)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswerIndex === null) return

    const isCorrect = selectedAnswerIndex === currentQuestion.correctAnswerIndex
    if (isCorrect) {
      setScore(score + 1)
    }
    setShowResult(true)
  }

  const handleNextQuestion = () => {
    setShowResult(false)
    setSelectedAnswerIndex(null)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setQuizFinished(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswerIndex(null)
    setShowResult(false)
    setScore(0)
    setQuizFinished(false)
  }

  if (quizFinished) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <span>Quiz Complete!</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-lg">
            You scored <span className="font-bold">{score}</span> out of <span className="font-bold">{questions.length}</span>.
          </p>
          <Button onClick={handleRestartQuiz}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center space-x-3">
            <Lightbulb className="h-6 w-6 text-blue-500" />
            <span>Knowledge Check</span>
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg font-medium">{currentQuestion.question}</p>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswerIndex === index
            const isCorrect = currentQuestion.correctAnswerIndex === index
            
            let buttonVariant: "outline" | "secondary" = "outline"
            if (showResult && isCorrect) buttonVariant = "secondary"
            if (isSelected) buttonVariant = "secondary"

            return (
              <Button
                key={index}
                variant={buttonVariant}
                className={`w-full justify-start h-auto py-3 text-left whitespace-normal transition-all duration-300
                  ${showResult && isCorrect ? "border-green-500 text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30" : ""}
                  ${showResult && isSelected && !isCorrect ? "border-red-500 text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30" : ""}
                `}
                onClick={() => handleAnswerSelect(index)}
              >
                {showResult && isCorrect && <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />}
                {showResult && isSelected && !isCorrect && <XCircle className="h-5 w-5 mr-3 flex-shrink-0" />}
                {option}
              </Button>
            )
          })}
        </div>
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800"
            >
              <h4 className="font-semibold mb-2">Explanation</h4>
              <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex justify-end">
          {showResult ? (
            <Button onClick={handleNextQuestion}>Next Question</Button>
          ) : (
            <Button onClick={handleSubmitAnswer} disabled={selectedAnswerIndex === null}>
              Submit Answer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}