"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, XCircle, MinusCircle, RefreshCw, Sparkles, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { QuizQuestion } from "@/lib/courses/types"
import { useChatContext } from "@/components/chat/chat-context"
import { CERTIFICATE_PASS_MARK } from "@/lib/achievements"

interface ExamResultsProps {
  courseId: string
  questions: QuizQuestion[]
  answers: (number | null)[]
  score: number
  highestScore: number | null
  onBack: () => void
}

export function ExamResults({ courseId, questions, answers, score, highestScore, onBack }: ExamResultsProps) {
  const [onlyMistakes, setOnlyMistakes] = useState(true)
  const { setContext, openWithPrompt } = useChatContext()
  const total = questions.length
  const percentage = total ? Math.round((score / total) * 100) : 0
  const passed = percentage >= CERTIFICATE_PASS_MARK
  const certified = passed || (highestScore ?? 0) >= CERTIFICATE_PASS_MARK
  const mistakes = questions.filter((q, i) => answers[i] !== q.correctAnswerIndex).length

  const askWhy = (q: QuizQuestion, picked: number | null) => {
    setContext({
      pageTitle: "Final exam review",
      exercisePrompt: `${q.question}\n\nOptions:\n${q.options.map((o, i) => `${i + 1}. ${o}`).join("\n")}`,
      language: "text",
    })
    openWithPrompt(
      picked === null
        ? `I skipped this exam question: "${q.question}". The correct answer is "${q.options[q.correctAnswerIndex]}". Explain it simply with a small example.`
        : `On this exam question — "${q.question}" — I chose "${q.options[picked]}" but the correct answer is "${q.options[q.correctAnswerIndex]}". Explain why my choice is wrong and why the correct one is right, with a small example.`
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <Card>
        <CardContent className="flex flex-col items-center text-center gap-2 py-2">
          {passed ? (
            <Award className="h-12 w-12 text-yellow-500" />
          ) : (
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          )}
          <h1 className="text-2xl font-bold">Exam complete</h1>
          <p className="text-5xl font-bold tabular-nums">{percentage}%</p>
          <p className="text-muted-foreground text-sm">
            {score} of {total} correct · pass mark {CERTIFICATE_PASS_MARK}%
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {certified && (
              <Button asChild>
                <Link href={`/courses/${courseId}/certificate`}>📜 View certificate</Link>
              </Button>
            )}
            <Button variant="outline" onClick={onBack}>
              <RefreshCw className="h-4 w-4 mr-2" /> Retake
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Review your answers</h2>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={onlyMistakes}
            onChange={(e) => setOnlyMistakes(e.target.checked)}
            className="h-4 w-4"
          />
          Only mistakes ({mistakes})
        </label>
      </div>

      {onlyMistakes && mistakes === 0 && (
        <p className="text-sm text-green-700 dark:text-green-400">No mistakes — every answer was correct. 🎉</p>
      )}

      <ol className="space-y-3">
        {questions.map((q, i) => {
          const picked = answers[i] ?? null
          const correct = picked === q.correctAnswerIndex
          if (onlyMistakes && correct) return null
          return (
            <li key={i}>
              <Card className="gap-3 py-4">
                <CardContent className="space-y-3 px-4">
                  <div className="flex items-start gap-2">
                    {correct ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    ) : picked === null ? (
                      <MinusCircle className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    )}
                    <p className="font-medium min-w-0 break-words">
                      <span className="text-muted-foreground mr-1">{i + 1}.</span>
                      {q.question}
                    </p>
                  </div>
                  <ul className="space-y-1.5 text-sm">
                    {q.options.map((opt, oi) => {
                      const isCorrect = oi === q.correctAnswerIndex
                      const isPicked = oi === picked
                      return (
                        <li
                          key={oi}
                          className={`rounded-md border px-3 py-2 break-words ${
                            isCorrect
                              ? "border-green-400 bg-green-50 dark:bg-green-950/30"
                              : isPicked
                                ? "border-red-400 bg-red-50 dark:bg-red-950/30"
                                : "border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          {opt}
                          {isCorrect && <span className="ml-2 text-xs text-green-700 dark:text-green-400">correct</span>}
                          {isPicked && !isCorrect && (
                            <span className="ml-2 text-xs text-red-700 dark:text-red-400">your answer</span>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                  <p className="text-sm text-muted-foreground">{q.explanation}</p>
                  {!correct && (
                    <Button size="sm" variant="outline" onClick={() => askWhy(q, picked)}>
                      <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Explain this to me
                    </Button>
                  )}
                </CardContent>
              </Card>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
