"use client"

import { useState } from "react"
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  useSandpack,
} from "@codesandbox/sandpack-react"
import { CheckCircle2, Play, RefreshCw, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Exercise, ExerciseTest, SandboxTemplate } from "@/lib/courses/types"

interface LiveExerciseProps {
  exercise: Exercise
  onAttempt?: () => void
}

const TEMPLATE_MAP: Record<SandboxTemplate, "vanilla" | "static" | "react"> = {
  vanilla: "vanilla",
  static: "static",
  react: "react",
  "react-ts": "react",
}

export function LiveExercise({ exercise, onAttempt }: LiveExerciseProps) {
  const template = TEMPLATE_MAP[exercise.template || "vanilla"]
  const wantsPreview = template === "react" || template === "static"
  const wantsConsole = template === "vanilla"

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      <SandpackProvider
        template={template}
        files={exercise.starter || {}}
        options={{ activeFile: exercise.activeFile, recompileMode: "delayed", recompileDelay: 400 }}
        theme="auto"
      >
        <SandpackLayout style={{ borderRadius: 0 }}>
          <SandpackCodeEditor showLineNumbers showTabs style={{ height: 380 }} />
          {wantsPreview && <SandpackPreview style={{ height: 380 }} />}
          {wantsConsole && <SandpackConsole style={{ height: 380 }} />}
        </SandpackLayout>
        {exercise.tests && exercise.tests.length > 0 ? (
          <TestRunner tests={exercise.tests} onAttempt={onAttempt} />
        ) : (
          <ResetBar onAttempt={onAttempt} />
        )}
      </SandpackProvider>
    </div>
  )
}

function ResetBar({ onAttempt }: { onAttempt?: () => void }) {
  const { sandpack } = useSandpack()
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-sm">
      <span className="text-muted-foreground">
        Edit the code above and the preview updates live.
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          sandpack.resetAllFiles()
          onAttempt?.()
        }}
      >
        <RefreshCw className="h-3.5 w-3.5 mr-2" /> Reset
      </Button>
    </div>
  )
}

interface TestResult {
  description: string
  passed: boolean
  error?: string
}

function runTests(userCode: string, tests: ExerciseTest[]): TestResult[] {
  return tests.map((t) => {
    try {
      const body = `${userCode}\n;return (function(){ ${t.assertion} })();`
      // eslint-disable-next-line no-new-func
      const fn = new Function(body)
      const passed = !!fn()
      return { description: t.description, passed }
    } catch (err: any) {
      return { description: t.description, passed: false, error: err?.message || String(err) }
    }
  })
}

function TestRunner({ tests, onAttempt }: { tests: ExerciseTest[]; onAttempt?: () => void }) {
  const { sandpack } = useSandpack()
  const [results, setResults] = useState<TestResult[] | null>(null)

  const handleRun = () => {
    onAttempt?.()
    const activeFile = sandpack.activeFile
    const code = sandpack.files[activeFile]?.code || ""
    // Find the first JS-ish file if active is HTML
    let testTargetCode = code
    if (!/\.(js|ts|jsx|tsx|mjs)$/i.test(activeFile)) {
      const jsFile = Object.entries(sandpack.files).find(([name]) => /\.(js|mjs)$/.test(name))
      if (jsFile) testTargetCode = jsFile[1].code
    }
    setResults(runTests(testTargetCode, tests))
  }

  const passedCount = results?.filter((r) => r.passed).length ?? 0
  const total = tests.length

  return (
    <div className="px-3 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {results
            ? `${passedCount}/${total} test${total === 1 ? "" : "s"} passing`
            : `${total} test${total === 1 ? "" : "s"} ready`}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              sandpack.resetAllFiles()
              setResults(null)
            }}
          >
            <RefreshCw className="h-3.5 w-3.5 mr-2" /> Reset
          </Button>
          <Button size="sm" onClick={handleRun}>
            <Play className="h-3.5 w-3.5 mr-2" /> Run tests
          </Button>
        </div>
      </div>
      {results && (
        <ul className="space-y-1.5 text-sm">
          {results.map((r, i) => (
            <li
              key={i}
              className={
                r.passed
                  ? "flex items-start gap-2 text-green-700 dark:text-green-400"
                  : "flex items-start gap-2 text-red-700 dark:text-red-400"
              }
            >
              {r.passed ? (
                <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <div>{r.description}</div>
                {r.error && (
                  <div className="text-xs opacity-80 mt-0.5 font-mono">{r.error}</div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
