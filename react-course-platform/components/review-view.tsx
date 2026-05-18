"use client"

import { useMemo, useState } from "react"
import { CheckCircle, XCircle, Brain, ArrowRight, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { courses } from "@/lib/courses"
import { useQuizAttempts, questionId } from "@/hooks/use-quiz-attempts"
import Link from "next/link"
import type { QuizQuestion } from "@/lib/courses/types"

interface ReviewItem {
  id: string
  courseId: string
  courseTitle: string
  day: number
  dayTitle: string
  qIndex: number
  question: QuizQuestion
}

function buildItems(): ReviewItem[] {
  const items: ReviewItem[] = []
  for (const c of courses) {
    for (const d of c.days) {
      if (!d.quiz) continue
      d.quiz.forEach((q, i) => {
        items.push({
          id: questionId(c.id, d.day, i),
          courseId: c.id,
          courseTitle: c.title.split(" in ")[0],
          day: d.day,
          dayTitle: d.title,
          qIndex: i,
          question: q,
        })
      })
    }
  }
  return items
}

export function ReviewView() {
  const { dueQuestionIds, record, stats } = useQuizAttempts()
  const allItems = useMemo(buildItems, [])
  const dueIds = dueQuestionIds()
  const queue = useMemo(
    () =>
      allItems
        .filter((it) => dueIds.includes(it.id))
        .sort((a, b) => (stats(a.id)?.dueAt || 0) - (stats(b.id)?.dueAt || 0)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allItems, dueIds.join(",")]
  )

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  if (queue.length === 0) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" /> No reviews due
          </CardTitle>
          <CardDescription>
            You're all caught up. Answer some quiz questions on a lesson — missed ones come back
            here on a spaced schedule.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/">
              Browse courses <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (finished) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" /> Review session complete
          </CardTitle>
          <CardDescription>
            You answered {score.correct} of {score.total} correctly. Missed questions will come
            back tomorrow; correct answers move up to longer intervals (1d → 3d → 7d → 14d → 30d).
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3 flex-wrap">
          <Button
            onClick={() => {
              setIndex(0)
              setSelected(null)
              setSubmitted(false)
              setFinished(false)
              setScore({ correct: 0, total: 0 })
            }}
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Review again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  const item = queue[index]
  const q = item.question
  const isCorrect = selected === q.correctAnswerIndex

  const submit = () => {
    if (selected === null) return
    record(item.id, isCorrect)
    setScore((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }))
    setSubmitted(true)
  }

  const next = () => {
    if (index < queue.length - 1) {
      setIndex(index + 1)
      setSelected(null)
      setSubmitted(false)
    } else {
      setFinished(true)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="h-6 w-6 text-purple-500" /> Review queue
        </h1>
        <div className="text-sm text-muted-foreground">
          {index + 1} / {queue.length} due
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start gap-3 flex-wrap">
            <div className="space-y-1">
              <Badge variant="outline" className="text-xs">
                {item.courseTitle} · Day {item.day}: {item.dayTitle}
              </Badge>
              <CardTitle className="text-lg pt-2">{q.question}</CardTitle>
            </div>
            <Link
              href={`/courses/${item.courseId}/day/${item.day}`}
              className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
            >
              Go to lesson
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {q.options.map((opt, i) => {
            const correct = q.correctAnswerIndex === i
            const sel = selected === i
            return (
              <Button
                key={i}
                variant="outline"
                className={`w-full justify-start h-auto py-3 text-left whitespace-normal transition-all
                  ${submitted && correct ? "border-green-500 text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30" : ""}
                  ${submitted && sel && !correct ? "border-red-500 text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30" : ""}
                  ${!submitted && sel ? "border-foreground" : ""}
                `}
                onClick={() => !submitted && setSelected(i)}
              >
                {submitted && correct && <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />}
                {submitted && sel && !correct && (
                  <XCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                )}
                {opt}
              </Button>
            )
          })}
          {submitted && (
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold mb-1 text-sm">Explanation</h4>
              <p className="text-sm text-muted-foreground">{q.explanation}</p>
            </div>
          )}
          <div className="flex justify-end pt-2">
            {!submitted ? (
              <Button onClick={submit} disabled={selected === null}>
                Submit
              </Button>
            ) : (
              <Button onClick={next}>
                {index < queue.length - 1 ? "Next" : "Finish session"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
