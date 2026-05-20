"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  buildAllCodeItems,
  buildAllMcqItems,
  getCourseLabels,
  sampleItems,
  type PracticeCodeItem,
  type PracticeItem,
  type PracticeMcqItem,
} from "@/lib/practice"
import { CheckCircle2, XCircle, RefreshCw, ArrowRight, Brain, Code2, Sparkles } from "lucide-react"
import { useChatContext } from "@/components/chat/chat-context"
import dynamic from "next/dynamic"

const LiveExercise = dynamic(() => import("@/components/live-exercise").then((m) => m.LiveExercise), {
  ssr: false,
  loading: () => (
    <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
      Loading editor…
    </div>
  ),
})

type Mode = "mcq" | "code" | "mixed"
type Phase = "setup" | "running" | "finished"

interface SetupState {
  mode: Mode
  courseId: string | "all"
  count: number
}

const DEFAULT_SETUP: SetupState = { mode: "mcq", courseId: "all", count: 10 }

export function PracticeView() {
  const [phase, setPhase] = useState<Phase>("setup")
  const [setup, setSetup] = useState<SetupState>(DEFAULT_SETUP)
  const [items, setItems] = useState<PracticeItem[]>([])
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number | null>>({})
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({})

  const allMcqs = useMemo(buildAllMcqItems, [])
  const allCode = useMemo(buildAllCodeItems, [])
  const courseLabels = useMemo(getCourseLabels, [])

  const start = () => {
    const filter = (it: PracticeItem) => setup.courseId === "all" || it.courseId === setup.courseId
    let pool: PracticeItem[] = []
    if (setup.mode === "mcq") pool = allMcqs.filter(filter)
    else if (setup.mode === "code") pool = allCode.filter(filter)
    else pool = [...allMcqs.filter(filter), ...allCode.filter(filter)]
    const sampled = sampleItems(pool, setup.count)
    setItems(sampled)
    setIndex(0)
    setAnswers({})
    setSubmitted({})
    setPhase("running")
  }

  if (phase === "setup") {
    return (
      <SetupPanel
        setup={setup}
        setSetup={setSetup}
        courseLabels={courseLabels}
        mcqAvailable={allMcqs.length}
        codeAvailable={allCode.length}
        onStart={start}
      />
    )
  }

  if (phase === "finished") {
    const mcqItems = items.filter((it): it is PracticeMcqItem => it.kind === "mcq")
    const codeItems = items.filter((it): it is PracticeCodeItem => it.kind === "code")
    const mcqCorrect = mcqItems.filter(
      (it) => answers[it.id] === it.question.correctAnswerIndex
    ).length
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" /> Practice session done
          </CardTitle>
          <CardDescription>
            {mcqItems.length > 0 && (
              <>
                You scored <span className="font-semibold">{mcqCorrect}</span> of{" "}
                <span className="font-semibold">{mcqItems.length}</span> on the MCQs
                ({Math.round((mcqCorrect / Math.max(1, mcqItems.length)) * 100)}%).{" "}
              </>
            )}
            {codeItems.length > 0 && (
              <>You also worked through {codeItems.length} coding exercise{codeItems.length === 1 ? "" : "s"}.</>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button onClick={() => setPhase("setup")}>
            <RefreshCw className="h-4 w-4 mr-2" /> New practice session
          </Button>
        </CardContent>
      </Card>
    )
  }

  const current = items[index]
  const total = items.length

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="h-6 w-6 text-purple-500" /> Practice
        </h1>
        <div className="text-sm text-muted-foreground">
          {index + 1} / {total} ·{" "}
          <button
            type="button"
            className="underline underline-offset-2 hover:text-foreground"
            onClick={() => {
              if (confirm("Quit this practice session?")) setPhase("setup")
            }}
          >
            quit
          </button>
        </div>
      </div>

      {current.kind === "mcq" ? (
        <McqRunner
          item={current}
          answer={answers[current.id]}
          submitted={!!submitted[current.id]}
          setAnswer={(v) => setAnswers((p) => ({ ...p, [current.id]: v }))}
          markSubmitted={() => setSubmitted((p) => ({ ...p, [current.id]: true }))}
        />
      ) : (
        <CodeRunner item={current} />
      )}

      <div className="flex justify-between pt-2">
        <Button
          variant="outline"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          Previous
        </Button>
        {index < total - 1 ? (
          <Button onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={() => setPhase("finished")}>Finish session</Button>
        )}
      </div>
    </div>
  )
}

function SetupPanel({
  setup,
  setSetup,
  courseLabels,
  mcqAvailable,
  codeAvailable,
  onStart,
}: {
  setup: SetupState
  setSetup: (s: SetupState) => void
  courseLabels: { id: string; label: string }[]
  mcqAvailable: number
  codeAvailable: number
  onStart: () => void
}) {
  const total = setup.mode === "mcq" ? mcqAvailable : setup.mode === "code" ? codeAvailable : mcqAvailable + codeAvailable
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-500" /> Practice
        </CardTitle>
        <CardDescription>
          Pick what you want to practise. We&apos;ll randomly assemble a set from the
          available pool of {total} item{total === 1 ? "" : "s"} and let you take a self-paced exam.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <div className="text-sm font-medium mb-2">What do you want to practise?</div>
          <div className="grid grid-cols-3 gap-2">
            <ModeButton
              active={setup.mode === "mcq"}
              onClick={() => setSetup({ ...setup, mode: "mcq" })}
              icon={<Brain className="h-4 w-4" />}
              label="MCQ"
              hint={`${mcqAvailable} qs`}
            />
            <ModeButton
              active={setup.mode === "code"}
              onClick={() => setSetup({ ...setup, mode: "code" })}
              icon={<Code2 className="h-4 w-4" />}
              label="Code"
              hint={`${codeAvailable} ex`}
            />
            <ModeButton
              active={setup.mode === "mixed"}
              onClick={() => setSetup({ ...setup, mode: "mixed" })}
              icon={<Sparkles className="h-4 w-4" />}
              label="Mixed"
              hint="both"
            />
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">Which course?</div>
          <div className="flex gap-2 flex-wrap">
            <CourseButton
              active={setup.courseId === "all"}
              onClick={() => setSetup({ ...setup, courseId: "all" })}
              label="All courses"
            />
            {courseLabels.map((c) => (
              <CourseButton
                key={c.id}
                active={setup.courseId === c.id}
                onClick={() => setSetup({ ...setup, courseId: c.id })}
                label={c.label}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">How many questions?</div>
          <div className="flex gap-2 flex-wrap">
            {[5, 10, 20, 30, 50].map((n) => (
              <Button
                key={n}
                size="sm"
                variant={setup.count === n ? "default" : "outline"}
                onClick={() => setSetup({ ...setup, count: n })}
              >
                {n}
              </Button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Button size="lg" onClick={onStart} disabled={total === 0}>
            Start session <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ModeButton({
  active,
  onClick,
  icon,
  label,
  hint,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  hint: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1 rounded-lg border px-3 py-3 text-sm transition-colors ${
        active
          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
    >
      <span className="flex items-center gap-2 font-medium">
        {icon}
        {label}
      </span>
      <span className="text-xs text-muted-foreground">{hint}</span>
    </button>
  )
}

function CourseButton({
  active,
  onClick,
  label,
}: {
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
        active
          ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300"
          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
    >
      {label}
    </button>
  )
}

function McqRunner({
  item,
  answer,
  submitted,
  setAnswer,
  markSubmitted,
}: {
  item: PracticeMcqItem
  answer: number | null | undefined
  submitted: boolean
  setAnswer: (n: number) => void
  markSubmitted: () => void
}) {
  const { setContext } = useChatContext()
  useEffect(() => {
    setContext({
      pageTitle: "Practice MCQ",
      courseTitle: item.courseTitle,
      exerciseTitle: item.source,
      exercisePrompt: `${item.question.question}\n\nOptions:\n${item.question.options
        .map((o, i) => `${i + 1}. ${o}`)
        .join("\n")}`,
      language: "text",
    })
  }, [item, setContext])

  const correct = item.question.correctAnswerIndex
  const isCorrect = submitted && answer === correct

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="space-y-1">
            <Badge variant="outline" className="text-xs">
              {item.courseTitle} · {item.source}
            </Badge>
            <CardTitle className="text-lg pt-2">{item.question.question}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {item.question.options.map((opt, i) => {
          const isThis = answer === i
          const showCorrect = submitted && i === correct
          const showWrong = submitted && isThis && i !== correct
          return (
            <Button
              key={i}
              variant="outline"
              className={`w-full justify-start h-auto py-3 text-left whitespace-normal transition-all
                ${showCorrect ? "border-green-500 text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30" : ""}
                ${showWrong ? "border-red-500 text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30" : ""}
                ${!submitted && isThis ? "border-foreground" : ""}
              `}
              onClick={() => !submitted && setAnswer(i)}
            >
              {showCorrect && <CheckCircle2 className="h-5 w-5 mr-3 flex-shrink-0" />}
              {showWrong && <XCircle className="h-5 w-5 mr-3 flex-shrink-0" />}
              {opt}
            </Button>
          )
        })}
        {submitted && (
          <div className="rounded-md border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-3 text-sm">
            <div className="font-semibold mb-1">
              {isCorrect ? "Correct!" : "Not quite."}
            </div>
            <div className="text-muted-foreground">{item.question.explanation}</div>
          </div>
        )}
        <div className="flex justify-end">
          {!submitted ? (
            <Button disabled={answer === null || answer === undefined} onClick={markSubmitted}>
              Submit
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}

function CodeRunner({ item }: { item: PracticeCodeItem }) {
  const { setContext } = useChatContext()
  const storageKey = `slh:practice:sandpack:${item.id}`
  useEffect(() => {
    setContext({
      pageTitle: "Practice — Code",
      courseTitle: item.courseTitle,
      dayTitle: `${item.source}`,
      exerciseTitle: item.exercise.title,
      exercisePrompt: item.exercise.description,
      language: item.exercise.template === "c" ? "c" : item.exercise.template === "react" ? "jsx" : "html",
      getUserCode: () => {
        if (typeof window === "undefined") return ""
        const raw = window.localStorage.getItem(storageKey)
        if (!raw) return ""
        try {
          const files = JSON.parse(raw) as Record<string, string>
          return Object.entries(files)
            .map(([n, c]) => `// ${n}\n${c}`)
            .join("\n\n")
            .slice(0, 4000)
        } catch {
          return ""
        }
      },
    })
  }, [item, storageKey, setContext])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="space-y-1">
            <Badge variant="outline" className="text-xs">
              {item.courseTitle} · {item.source}
            </Badge>
            <CardTitle className="text-lg pt-2">{item.exercise.title}</CardTitle>
            <CardDescription className="text-sm">{item.exercise.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <LiveExercise exercise={item.exercise} storageKey={storageKey} />
        <div className="mt-3 text-xs text-muted-foreground">
          Stuck? Open the AI tutor bubble — it sees the prompt and your current code.
        </div>
      </CardContent>
    </Card>
  )
}
