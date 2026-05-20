"use client"

import { useEffect, useMemo, useState } from "react"
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
  storageKey: string
  onAttempt?: () => void
}

const TEMPLATE_MAP: Record<SandboxTemplate, "vanilla" | "static" | "react"> = {
  vanilla: "vanilla",
  static: "static",
  react: "react",
  "react-ts": "react",
  // C exercises render in Sandpack as if vanilla (just for the editor chrome);
  // the in-browser preview/console is hidden since we can't compile C client-side.
  c: "vanilla",
}

function readSavedFiles(storageKey: string): Record<string, string> | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(storageKey)
    return raw ? (JSON.parse(raw) as Record<string, string>) : null
  } catch {
    return null
  }
}

function writeSavedFiles(storageKey: string, files: Record<string, string>) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(files))
  } catch {
    /* ignore storage errors (quota, private mode) */
  }
}

export function LiveExercise({ exercise, storageKey, onAttempt }: LiveExerciseProps) {
  const isC = exercise.template === "c"
  const template = TEMPLATE_MAP[exercise.template || "vanilla"]
  const wantsPreview = !isC && (template === "react" || template === "static")
  const wantsConsole = !isC && template === "vanilla"

  const starter = exercise.starter || {}
  const [initialFiles, setInitialFiles] = useState<Record<string, string>>(starter)
  const [restoredOnce, setRestoredOnce] = useState(false)

  useEffect(() => {
    const saved = readSavedFiles(storageKey)
    if (saved) {
      // Merge starter shape with saved code so newly-added files in updates still appear.
      const merged = { ...starter, ...saved }
      setInitialFiles(merged)
    } else {
      setInitialFiles(starter)
    }
    setRestoredOnce(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey])

  if (!restoredOnce) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
        Restoring your code…
      </div>
    )
  }

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      <SandpackProvider
        template={template}
        files={initialFiles}
        options={{
          activeFile: exercise.activeFile,
          recompileMode: "delayed",
          recompileDelay: 400,
        }}
        theme="auto"
      >
        <PersistFiles storageKey={storageKey} starter={starter} />
        <SandpackLayout style={{ borderRadius: 0 }}>
          <SandpackCodeEditor
            showLineNumbers
            showTabs
            style={{ height: "clamp(260px, 50vh, 380px)" }}
          />
          {wantsPreview && (
            <SandpackPreview style={{ height: "clamp(220px, 40vh, 380px)" }} />
          )}
          {wantsConsole && (
            <SandpackConsole style={{ height: "clamp(180px, 30vh, 380px)" }} />
          )}
        </SandpackLayout>
        {exercise.tests && exercise.tests.length > 0 ? (
          <TestRunner tests={exercise.tests} storageKey={storageKey} starter={starter} onAttempt={onAttempt} />
        ) : (
          <ToolBar storageKey={storageKey} starter={starter} onAttempt={onAttempt} />
        )}
      </SandpackProvider>
    </div>
  )
}

function PersistFiles({ storageKey, starter }: { storageKey: string; starter: Record<string, string> }) {
  const { sandpack } = useSandpack()
  useEffect(() => {
    // Save current files whenever they change, debounced.
    const snapshot: Record<string, string> = {}
    for (const [name, file] of Object.entries(sandpack.files)) {
      // Only persist files that exist in starter to avoid leaking node_modules etc.
      if (name in starter) snapshot[name] = file.code
    }
    const handle = setTimeout(() => writeSavedFiles(storageKey, snapshot), 600)
    return () => clearTimeout(handle)
  }, [sandpack.files, storageKey, starter])
  return null
}

function clearSaved(storageKey: string) {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(storageKey)
}

function ToolBar({
  storageKey,
  starter,
  onAttempt,
}: {
  storageKey: string
  starter: Record<string, string>
  onAttempt?: () => void
}) {
  const { sandpack } = useSandpack()
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-sm">
      <span className="text-muted-foreground">
        Edit the code above and the preview updates live. Your work is saved on this device.
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          // Reset both Sandpack and our saved copy.
          for (const [name, code] of Object.entries(starter)) {
            sandpack.updateFile(name, code)
          }
          clearSaved(storageKey)
          onAttempt?.()
        }}
      >
        <RefreshCw className="h-3.5 w-3.5 mr-2" /> Reset to starter
      </Button>
    </div>
  )
}

interface TestResult {
  description: string
  passed: boolean
  error?: string
}

async function runTests(
  files: Record<string, { code: string }>,
  activeFile: string,
  tests: ExerciseTest[]
): Promise<TestResult[]> {
  // Find the best JS-ish file for "js" runner tests.
  const jsFile = /\.(js|mjs|ts|tsx|jsx)$/i.test(activeFile)
    ? activeFile
    : Object.keys(files).find((n) => /\.(js|mjs)$/.test(n)) || activeFile
  const htmlFile = /\.html?$/i.test(activeFile)
    ? activeFile
    : Object.keys(files).find((n) => /\.html?$/i.test(n)) || activeFile

  return Promise.all(
    tests.map(async (t): Promise<TestResult> => {
      const runner = t.runner || "js"
      try {
        if (runner === "html") {
          const target = t.targetFile || htmlFile
          const html = files[target]?.code || ""
          if (typeof DOMParser === "undefined") {
            return { description: t.description, passed: false, error: "DOMParser unavailable" }
          }
          const doc = new DOMParser().parseFromString(html, "text/html")
          // eslint-disable-next-line no-new-func
          const fn = new Function("doc", `return (function(){ ${t.assertion} })();`)
          const result = await Promise.resolve(fn(doc))
          return { description: t.description, passed: !!result }
        }
        // Default "js" runner — also supports async assertions (Promise return).
        const target = t.targetFile || jsFile
        const code = files[target]?.code || ""
        const body = `${code}\n;return (function(){ ${t.assertion} })();`
        // eslint-disable-next-line no-new-func
        const fn = new Function(body)
        const result = await Promise.resolve(fn())
        return { description: t.description, passed: !!result }
      } catch (err: any) {
        return { description: t.description, passed: false, error: err?.message || String(err) }
      }
    })
  )
}

function TestRunner({
  tests,
  storageKey,
  starter,
  onAttempt,
}: {
  tests: ExerciseTest[]
  storageKey: string
  starter: Record<string, string>
  onAttempt?: () => void
}) {
  const { sandpack } = useSandpack()
  const [results, setResults] = useState<TestResult[] | null>(null)

  const [running, setRunning] = useState(false)
  const handleRun = async () => {
    onAttempt?.()
    setRunning(true)
    try {
      const r = await runTests(sandpack.files, sandpack.activeFile, tests)
      setResults(r)
    } finally {
      setRunning(false)
    }
  }

  const passedCount = results?.filter((r) => r.passed).length ?? 0
  const total = tests.length
  const allPass = results !== null && passedCount === total

  return (
    <div className="px-3 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className={`text-sm ${allPass ? "text-green-700 dark:text-green-400 font-medium" : "text-muted-foreground"}`}>
          {results
            ? allPass
              ? `🎉 All ${total} tests passing`
              : `${passedCount}/${total} test${total === 1 ? "" : "s"} passing`
            : `${total} test${total === 1 ? "" : "s"} ready · saved on this device`}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              for (const [name, code] of Object.entries(starter)) {
                sandpack.updateFile(name, code)
              }
              clearSaved(storageKey)
              setResults(null)
            }}
          >
            <RefreshCw className="h-3.5 w-3.5 mr-2" /> Reset
          </Button>
          <Button size="sm" onClick={handleRun} disabled={running}>
            <Play className="h-3.5 w-3.5 mr-2" /> {running ? "Running…" : "Run tests"}
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
