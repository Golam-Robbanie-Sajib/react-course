"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

const ONBOARDING_KEY = "slh:onboarding:v1"

interface Recommendation {
  courseSlug: string
  day: number
  reason: string
}

type Step = "level" | "css" | "react" | "result"

interface Answers {
  htmlLevel?: "none" | "basic" | "comfortable"
  jsLevel?: "none" | "basic" | "comfortable"
  reactLevel?: "none" | "basic" | "comfortable"
}

function recommend(a: Answers): Recommendation {
  if (a.reactLevel === "basic" || a.reactLevel === "comfortable") {
    return {
      courseSlug: "react",
      day: a.reactLevel === "comfortable" ? 17 : 12,
      reason:
        a.reactLevel === "comfortable"
          ? "You're comfortable with React. Skip to advanced hooks and patterns."
          : "You've used React. Start from React fundamentals (Day 12).",
    }
  }
  if (a.jsLevel === "comfortable") {
    return {
      courseSlug: "react",
      day: 8,
      reason: "Solid JS already — start with advanced JavaScript before React.",
    }
  }
  if (a.jsLevel === "basic") {
    return {
      courseSlug: "react",
      day: 1,
      reason: "Start from Day 1 of the React course to firm up JS first.",
    }
  }
  if (a.htmlLevel === "comfortable") {
    return {
      courseSlug: "react",
      day: 1,
      reason: "HTML is in hand. The React course starts with JS — try Day 1.",
    }
  }
  return {
    courseSlug: "html",
    day: 1,
    reason: "Start at the beginning of the HTML course to build a foundation.",
  }
}

export function OnboardingDialog() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>("level")
  const [answers, setAnswers] = useState<Answers>({})

  useEffect(() => {
    if (typeof window === "undefined") return
    const seen = window.localStorage.getItem(ONBOARDING_KEY)
    if (!seen) {
      // Slight delay so the page renders first.
      const t = setTimeout(() => setOpen(true), 600)
      return () => clearTimeout(t)
    }
  }, [])

  const finish = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(ONBOARDING_KEY, JSON.stringify({ at: Date.now(), answers }))
    }
    setOpen(false)
  }

  const rec = step === "result" ? recommend(answers) : null

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) finish() }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Where should you start?
          </DialogTitle>
          <DialogDescription>
            A 30-second skill check, so we can point you at the right day. No account needed.
          </DialogDescription>
        </DialogHeader>

        {step === "level" && (
          <QuestionStep
            label="How much HTML have you written?"
            value={answers.htmlLevel}
            onPick={(v) => {
              setAnswers((a) => ({ ...a, htmlLevel: v }))
              setStep("css")
            }}
          />
        )}
        {step === "css" && (
          <QuestionStep
            label="How comfortable are you with JavaScript?"
            value={answers.jsLevel}
            onPick={(v) => {
              setAnswers((a) => ({ ...a, jsLevel: v }))
              setStep("react")
            }}
            onBack={() => setStep("level")}
          />
        )}
        {step === "react" && (
          <QuestionStep
            label="Have you built anything with React?"
            value={answers.reactLevel}
            onPick={(v) => {
              setAnswers((a) => ({ ...a, reactLevel: v }))
              setStep("result")
            }}
            onBack={() => setStep("css")}
          />
        )}
        {step === "result" && rec && (
          <Card>
            <CardContent className="p-5 space-y-3">
              <p className="text-sm text-muted-foreground">{rec.reason}</p>
              <p className="text-lg font-semibold">
                Recommended: {rec.courseSlug === "html" ? "HTML" : "React"} course, Day {rec.day}.
              </p>
            </CardContent>
          </Card>
        )}

        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={finish}>
            Skip for now
          </Button>
          {step === "result" && rec && (
            <Button asChild onClick={finish}>
              <Link href={`/courses/${rec.courseSlug}/day/${rec.day}`}>
                Start there →
              </Link>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function QuestionStep({
  label,
  value,
  onPick,
  onBack,
}: {
  label: string
  value?: "none" | "basic" | "comfortable"
  onPick: (v: "none" | "basic" | "comfortable") => void
  onBack?: () => void
}) {
  return (
    <div className="space-y-3">
      <p className="font-medium">{label}</p>
      <div className="grid gap-2">
        <Button
          variant={value === "none" ? "default" : "outline"}
          className="justify-start"
          onClick={() => onPick("none")}
        >
          Never used it
        </Button>
        <Button
          variant={value === "basic" ? "default" : "outline"}
          className="justify-start"
          onClick={() => onPick("basic")}
        >
          A little — I know the basics
        </Button>
        <Button
          variant={value === "comfortable" ? "default" : "outline"}
          className="justify-start"
          onClick={() => onPick("comfortable")}
        >
          Comfortable — I've shipped things with it
        </Button>
      </div>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
        >
          ← Back
        </button>
      )}
    </div>
  )
}
