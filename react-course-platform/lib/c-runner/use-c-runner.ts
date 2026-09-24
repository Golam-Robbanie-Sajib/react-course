"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { CRunResult } from "./core"
import type { CRunRequest, CRunResponse } from "./c.worker"

// The worker is shared across every runner on the page and created lazily on
// first use, so pages that never run C code never download the interpreter.
let sharedWorker: Worker | null = null
let nextId = 1
const pending = new Map<number, (r: CRunResult) => void>()

function getWorker(): Worker {
  if (sharedWorker) return sharedWorker
  sharedWorker = new Worker(new URL("./c.worker.ts", import.meta.url))
  sharedWorker.onmessage = (event: MessageEvent<CRunResponse>) => {
    const { id, ...result } = event.data
    pending.get(id)?.(result)
    pending.delete(id)
  }
  sharedWorker.onerror = () => {
    // A crashed worker fails every in-flight run and is rebuilt next time.
    for (const [, resolve] of pending) {
      resolve({
        stdout: "",
        exitCode: null,
        error: "The C runner crashed. Please try again.",
        errorKind: "runtime",
        durationMs: 0,
      })
    }
    pending.clear()
    sharedWorker?.terminate()
    sharedWorker = null
  }
  return sharedWorker
}

/** Warm the interpreter bundle without running anything. */
export function preloadCRunner() {
  if (typeof window === "undefined" || typeof Worker === "undefined") return
  getWorker()
}

/**
 * Run a C program in the shared worker. Resolves with a timeout error if the
 * interpreter doesn't answer within `hardTimeoutMs` (it has its own soft
 * limit; this is the backstop), terminating the worker so it can't spin.
 */
export function runCInWorker(code: string, stdin: string, maxTimeoutMs = 3000): Promise<CRunResult> {
  if (typeof Worker === "undefined") {
    return Promise.resolve({
      stdout: "",
      exitCode: null,
      error: "This browser can't run code (Web Workers are unavailable).",
      errorKind: "runtime",
      durationMs: 0,
    })
  }
  const worker = getWorker()
  const id = nextId++
  const hardTimeoutMs = maxTimeoutMs + 4000
  return new Promise<CRunResult>((resolve) => {
    const timer = setTimeout(() => {
      if (!pending.has(id)) return
      pending.delete(id)
      sharedWorker?.terminate()
      sharedWorker = null
      resolve({
        stdout: "",
        exitCode: null,
        error: "Your program ran for too long and was stopped. Check for an infinite loop.",
        errorKind: "timeout",
        durationMs: hardTimeoutMs,
      })
    }, hardTimeoutMs)
    pending.set(id, (r) => {
      clearTimeout(timer)
      resolve(r)
    })
    const request: CRunRequest = { id, code, stdin, maxTimeoutMs }
    worker.postMessage(request)
  })
}

export function useCRunner() {
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState<CRunResult | null>(null)
  const mounted = useRef(true)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  const run = useCallback(async (code: string, stdin: string) => {
    setRunning(true)
    try {
      const r = await runCInWorker(code, stdin)
      if (mounted.current) setResult(r)
      return r
    } finally {
      if (mounted.current) setRunning(false)
    }
  }, [])

  return { run, running, result, setResult }
}
