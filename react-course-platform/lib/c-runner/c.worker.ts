/// <reference lib="webworker" />
// Runs C programs off the main thread so a long-running learner program can
// never freeze the page. The host also hard-terminates this worker if it
// stops responding (see use-c-runner.ts).

import JSCPP from "JSCPP"
import { runC, type CRunResult } from "./core"

export interface CRunRequest {
  id: number
  code: string
  stdin: string
  maxTimeoutMs?: number
}

export interface CRunResponse extends CRunResult {
  id: number
}

self.onmessage = (event: MessageEvent<CRunRequest>) => {
  const { id, code, stdin, maxTimeoutMs } = event.data
  const result = runC(JSCPP as any, code, stdin, { maxTimeoutMs: maxTimeoutMs ?? 3000 })
  const response: CRunResponse = { id, ...result }
  ;(self as unknown as Worker).postMessage(response)
}
