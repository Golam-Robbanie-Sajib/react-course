"use client"

import { useEffect, useRef, useState, type RefObject } from "react"
import { useSandpack } from "@codesandbox/sandpack-react"
import { CheckCircle2, ChevronDown, ChevronRight, Loader2, Play, RefreshCw, TerminalSquare, XCircle, FlaskConical } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ExerciseTest } from "@/lib/courses/types"
import { normaliseOutput, type CRunResult } from "@/lib/c-runner/core"
import { preloadCRunner, runCInWorker } from "@/lib/c-runner/use-c-runner"
import { logActivity } from "@/lib/activity"

interface TestOutcome {
  test: ExerciseTest
  passed: boolean
  got: string
  error: string | null
}

interface CRunPanelProps {
  tests: ExerciseTest[]
  starter: Record<string, string>
  storageKey: string
  containerRef: RefObject<HTMLDivElement | null>
  onAttempt?: () => void
  onAllPassed?: () => void
}

export function CRunPanel({ tests, starter, storageKey, containerRef, onAttempt, onAllPassed }: CRunPanelProps) {
  const { sandpack } = useSandpack()
  const firstStdin = tests.find((t) => t.stdin)?.stdin ?? ""
  const [stdin, setStdin] = useState(firstStdin)
  // Open the input box up-front when the program reads input, so learners
  // don't hit Run and wonder why nothing happened.
  const [stdinOpen, setStdinOpen] = useState(() => {
    const code = sandpack.files[sandpack.activeFile]?.code ?? ""
    return firstStdin.length > 0 || /\bscanf\s*\(/.test(code)
  })
  const [busy, setBusy] = useState<"run" | "test" | null>(null)
  const [runResult, setRunResult] = useState<CRunResult | null>(null)
  const [outcomes, setOutcomes] = useState<TestOutcome[] | null>(null)
  const [openFailure, setOpenFailure] = useState<number | null>(null)

  // Download the interpreter while the learner reads the prompt.
  useEffect(() => {
    const t = setTimeout(preloadCRunner, 800)
    return () => clearTimeout(t)
  }, [])

  const currentCode = () => {
    const file = sandpack.files[sandpack.activeFile] ?? Object.values(sandpack.files)[0]
    return file?.code ?? ""
  }

  const run = async () => {
    if (busy) return
    onAttempt?.()
    setBusy("run")
    setOutcomes(null)
    try {
      const code = currentCode()
      const r = await runCInWorker(code, stdin)
      if (r.error && !stdin.trim() && /\bscanf\s*\(/.test(code)) {
        r.error += "\nTip: this program reads input with scanf — type it in the Program input box above, then Run again."
        setStdinOpen(true)
      }
      setRunResult(r)
      logActivity("code_run")
    } finally {
      setBusy(null)
    }
  }

  const runTests = async () => {
    if (busy || tests.length === 0) return
    onAttempt?.()
    setBusy("test")
    setRunResult(null)
    const code = currentCode()
    const results: TestOutcome[] = []
    try {
      for (const t of tests) {
        const r = await runCInWorker(code, t.stdin ?? "")
        const got = normaliseOutput(r.stdout)
        const want = normaliseOutput(t.expectedOutput ?? "")
        const passed = !r.error && (t.match === "contains" ? got.includes(want) : got === want)
        results.push({ test: t, passed, got: r.stdout, error: r.error })
        // Stop hammering the worker after a timeout — later tests would time out too.
        if (r.errorKind === "timeout") break
      }
      setOutcomes(results)
      const firstFail = results.findIndex((o) => !o.passed)
      setOpenFailure(firstFail === -1 ? null : firstFail)
      if (results.length === tests.length && results.every((o) => o.passed)) {
        logActivity("tests_passed")
        onAllPassed?.()
      }
    } finally {
      setBusy(null)
    }
  }

  // Ctrl/⌘ + Enter anywhere inside this exercise runs the code.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.key === "Enter" && (e.ctrlKey || e.metaKey))) return
      const root = containerRef.current
      if (!root || !(e.target instanceof Node) || !root.contains(e.target)) return
      e.preventDefault()
      void run()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  })

  const reset = () => {
    for (const [name, code] of Object.entries(starter)) sandpack.updateFile(name, code)
    try {
      window.localStorage.removeItem(storageKey)
    } catch {
      /* ignore */
    }
    setRunResult(null)
    setOutcomes(null)
  }

  const passedCount = outcomes?.filter((o) => o.passed).length ?? 0
  const allPassed = outcomes !== null && outcomes.length === tests.length && passedCount === tests.length

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-3 space-y-3">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={run} disabled={busy !== null}>
          {busy === "run" ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : <Play className="h-3.5 w-3.5 mr-1.5" />}
          Run
        </Button>
        {tests.length > 0 && (
          <Button size="sm" variant="secondary" onClick={runTests} disabled={busy !== null}>
            {busy === "test" ? (
              <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
            ) : (
              <FlaskConical className="h-3.5 w-3.5 mr-1.5" />
            )}
            Run tests ({tests.length})
          </Button>
        )}
        <Button size="sm" variant="ghost" onClick={reset} disabled={busy !== null} className="ml-auto">
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Reset
        </Button>
      </div>
      <p className="text-[11px] text-muted-foreground -mt-1">
        Runs in your browser with a C interpreter · <kbd className="font-mono">Ctrl</kbd>/<kbd className="font-mono">⌘</kbd>+
        <kbd className="font-mono">Enter</kbd> to run · work is saved on this device
      </p>

      {/* stdin */}
      <div className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950">
        <button
          type="button"
          onClick={() => setStdinOpen((o) => !o)}
          className="flex w-full items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground"
          aria-expanded={stdinOpen}
        >
          {stdinOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          Program input (stdin)
          {!stdinOpen && stdin && <span className="ml-1 truncate font-mono text-foreground/70">— {stdin.split("\n")[0]}</span>}
        </button>
        {stdinOpen && (
          <textarea
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            rows={2}
            spellCheck={false}
            placeholder="Type what your program should read with scanf, e.g. 3 6"
            className="block w-full resize-y border-t border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 font-mono text-sm focus:outline-none"
          />
        )}
      </div>

      {/* Output terminal */}
      {(runResult || busy === "run") && (
        <div className="rounded-md bg-gray-950 text-gray-100 font-mono text-[13px] overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/10 text-[11px] text-gray-400">
            <TerminalSquare className="h-3.5 w-3.5" /> Output
            {runResult && !busy && (
              <span className="ml-auto">
                {runResult.error ? "failed" : `exit ${runResult.exitCode ?? 0}`} · {runResult.durationMs} ms
              </span>
            )}
          </div>
          <pre className="px-3 py-2 max-h-64 overflow-auto whitespace-pre-wrap break-words">
            {busy === "run" ? (
              <span className="text-gray-400">Running…</span>
            ) : (
              <>
                {runResult?.stdout || (!runResult?.error && <span className="text-gray-500">(no output)</span>)}
                {runResult?.error && (
                  <span className="block text-red-400 mt-1 whitespace-pre-wrap">{runResult.error}</span>
                )}
              </>
            )}
          </pre>
        </div>
      )}

      {/* Test results */}
      {outcomes && (
        <div className="space-y-1.5">
          <div
            className={`text-sm font-medium ${allPassed ? "text-green-700 dark:text-green-400" : "text-foreground"}`}
          >
            {allPassed ? `🎉 All ${tests.length} tests passed!` : `${passedCount}/${tests.length} tests passed`}
          </div>
          <ul className="space-y-1">
            {outcomes.map((o, i) => (
              <li key={i} className="text-sm">
                <button
                  type="button"
                  className={`flex w-full items-start gap-2 text-left ${o.passed ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}
                  onClick={() => !o.passed && setOpenFailure(openFailure === i ? null : i)}
                >
                  {o.passed ? <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" /> : <XCircle className="h-4 w-4 mt-0.5 shrink-0" />}
                  <span className="min-w-0">{o.test.description}</span>
                </button>
                {!o.passed && openFailure === i && (
                  <div className="mt-1.5 ml-6 grid gap-2 sm:grid-cols-2 text-xs">
                    {o.test.stdin ? (
                      <div className="sm:col-span-2">
                        <div className="text-muted-foreground mb-0.5">Input</div>
                        <pre className="rounded bg-gray-100 dark:bg-gray-800 px-2 py-1 font-mono whitespace-pre-wrap">{o.test.stdin}</pre>
                      </div>
                    ) : null}
                    <div className="min-w-0">
                      <div className="text-muted-foreground mb-0.5">
                        Expected{o.test.match === "contains" ? " (to contain)" : ""}
                      </div>
                      <pre className="rounded bg-green-50 dark:bg-green-950/30 px-2 py-1 font-mono whitespace-pre-wrap break-words max-h-40 overflow-auto">
                        {o.test.expectedOutput || "(nothing)"}
                      </pre>
                    </div>
                    <div className="min-w-0">
                      <div className="text-muted-foreground mb-0.5">Your output</div>
                      <pre className="rounded bg-red-50 dark:bg-red-950/30 px-2 py-1 font-mono whitespace-pre-wrap break-words max-h-40 overflow-auto">
                        {o.error ? o.error : o.got || "(nothing)"}
                      </pre>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
