"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import {
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Play,
  CheckCircle2,
  XCircle,
  Eye,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/components/code-block"
import type { Exercise } from "@/lib/courses/types"
import { useChatContext } from "@/components/chat/chat-context"

const LiveExercise = dynamic(() => import("./live-exercise").then((m) => m.LiveExercise), {
  ssr: false,
  loading: () => (
    <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
      Loading editor…
    </div>
  ),
})

interface ExerciseCardProps {
  exercise: Exercise
  index: number
  courseId: string
  day: number
}

export function ExerciseCard({ exercise, index, courseId, day }: ExerciseCardProps) {
  const storageKey = `slh:sandpack:${courseId}:${day}:${index}`
  const [revealedHints, setRevealedHints] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [hasAttempted, setHasAttempted] = useState(false)

  const { openWithPrompt } = useChatContext()

  const hasLive = !!exercise.starter && !!exercise.template
  const hints = exercise.hints || []
  const hasMoreHints = revealedHints < hints.length
  const canShowSolution = hasAttempted || revealedHints >= Math.max(1, hints.length)

  // For exercises without in-browser tests (most notably C), let the user
  // ask the AI to grade their code. The chat already has the exercise prompt
  // and the live editor's contents in its context — we just open it with
  // a clear "please evaluate" question.
  const hasAutoTests = !!exercise.tests && exercise.tests.length > 0
  const checkWithAI = () => {
    setHasAttempted(true)
    openWithPrompt(
      `Please check whether my current code correctly solves this exercise: "${exercise.title}".\n\nFirst answer with PASS or FAIL on its own line. Then give 2–3 sentences of specific feedback. If there are bugs, point at the line that's wrong.`
    )
  }

  return (
    <Card className="border border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold">
            {index + 1}
          </div>
          <span className="text-lg font-semibold break-words">{exercise.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          {/* Descriptions in course data may include HTML (e.g. <br/>, <code>). */}
          <div
            className="prose prose-sm prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: exercise.description }}
          />
        </div>

        {hasLive ? (
          <LiveExercise
            exercise={exercise}
            storageKey={storageKey}
            onAttempt={() => setHasAttempted(true)}
          />
        ) : null}

        {/* "Check with AI" — shown whenever the exercise can't be auto-graded
            (no tests) but does have an in-browser editor (so the AI can see
            actual code in the localStorage snapshot). */}
        {hasLive && !hasAutoTests && (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-purple-200 dark:border-purple-900/50 bg-purple-50/60 dark:bg-purple-950/20 p-3">
            <div className="text-sm text-purple-900 dark:text-purple-100 flex items-center gap-2">
              <Sparkles className="h-4 w-4 shrink-0" />
              No automatic compiler here — ask the AI to grade your code.
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={checkWithAI}
              className="border-purple-300 dark:border-purple-700 shrink-0"
            >
              Check my answer
            </Button>
          </div>
        )}

        {hints.length > 0 && (
          <div className="rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50/60 dark:bg-amber-950/20 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-300 font-medium text-sm">
                <Lightbulb className="h-4 w-4" />
                <span>
                  Hints ({revealedHints}/{hints.length})
                </span>
              </div>
              {hasMoreHints ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRevealedHints((n) => n + 1)}
                >
                  Reveal next hint
                </Button>
              ) : null}
            </div>
            {revealedHints > 0 && (
              <ol className="list-decimal pl-5 space-y-1 text-sm text-amber-900 dark:text-amber-100">
                {hints.slice(0, revealedHints).map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ol>
            )}
          </div>
        )}

        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={() => setShowSolution((s) => !s)}
            disabled={!canShowSolution}
            className="w-full justify-between"
            title={canShowSolution ? undefined : "Try the exercise or reveal a hint first"}
          >
            <span className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              {showSolution ? "Hide" : "Show"} Solution
              {!canShowSolution ? " (try it first)" : ""}
            </span>
            {showSolution ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          {showSolution && (
            <div className="space-y-6">
              <CodeBlock
                code={exercise.solution.code}
                language="javascript"
                title={`Solution: ${exercise.title}`}
              />
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Explanation</h4>
                <div
                  className="prose prose-gray dark:prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: exercise.solution.explanation }}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export { Play, CheckCircle2, XCircle }
