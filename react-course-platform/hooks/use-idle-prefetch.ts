"use client"

import { useEffect } from "react"

type Importer = () => Promise<unknown>

/**
 * Schedule a dynamic-import to run when the browser is idle, so heavy
 * client-only modules (Sandpack, etc.) are warm in the cache before the
 * user needs them. Falls back to a short `setTimeout` if requestIdleCallback
 * is unavailable.
 */
export function useIdlePrefetch(importer: Importer, deps: unknown[] = []) {
  useEffect(() => {
    if (typeof window === "undefined") return
    let cancelled = false
    const run = () => {
      if (cancelled) return
      // Errors are swallowed — this is a best-effort warm-up.
      importer().catch(() => undefined)
    }
    const ric: typeof window.requestIdleCallback | undefined =
      (window as any).requestIdleCallback
    if (ric) {
      const id = ric(run, { timeout: 2000 })
      return () => {
        cancelled = true
        ;(window as any).cancelIdleCallback?.(id)
      }
    }
    const t = window.setTimeout(run, 500)
    return () => {
      cancelled = true
      window.clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
