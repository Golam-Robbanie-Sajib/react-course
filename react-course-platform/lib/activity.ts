"use client"

import { useEffect, useState } from "react"

// A tiny local activity log that powers the dashboard heatmap, stats and
// achievements. One entry per calendar day (local time) with counts per
// event type. Kept deliberately small: ~1 year of data is a few KB.

export type ActivityType =
  | "lesson_view"
  | "lesson_complete"
  | "quiz_answer"
  | "quiz_correct"
  | "code_run"
  | "tests_passed"
  | "exam_finished"
  | "review_answer"

export interface ActivityDay {
  total: number
  events: Partial<Record<ActivityType, number>>
}

export type ActivityLog = Record<string, ActivityDay>

const KEY = "slh:activity:v1"
const EVENT = "slh-activity-changed"
const MAX_DAYS = 400

export function dayKey(d: Date = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

export function readActivity(): ActivityLog {
  if (typeof window === "undefined") return {}
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "{}") as ActivityLog
  } catch {
    return {}
  }
}

export function logActivity(type: ActivityType, count = 1) {
  if (typeof window === "undefined") return
  try {
    const log = readActivity()
    const k = dayKey()
    const entry: ActivityDay = log[k] ?? { total: 0, events: {} }
    entry.total += count
    entry.events[type] = (entry.events[type] ?? 0) + count
    log[k] = entry
    // Trim the oldest days so storage never grows unbounded.
    const keys = Object.keys(log).sort()
    for (const old of keys.slice(0, Math.max(0, keys.length - MAX_DAYS))) delete log[old]
    window.localStorage.setItem(KEY, JSON.stringify(log))
    window.dispatchEvent(new Event(EVENT))
  } catch {
    /* storage full / private mode — activity is best-effort */
  }
}

export function useActivity(): ActivityLog {
  const [log, setLog] = useState<ActivityLog>({})
  useEffect(() => {
    const sync = () => setLog(readActivity())
    sync()
    window.addEventListener(EVENT, sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener("storage", sync)
    }
  }, [])
  return log
}

/** Totals of each event type across the whole log. */
export function sumEvents(log: ActivityLog): Partial<Record<ActivityType, number>> {
  const out: Partial<Record<ActivityType, number>> = {}
  for (const d of Object.values(log)) {
    for (const [k, v] of Object.entries(d.events)) {
      out[k as ActivityType] = (out[k as ActivityType] ?? 0) + (v ?? 0)
    }
  }
  return out
}

/** Consecutive active days ending today (or yesterday, so a streak isn't
 *  "broken" before the learner has had a chance to study today). */
export function activityStreak(log: ActivityLog): { current: number; longest: number } {
  const active = new Set(Object.keys(log).filter((k) => (log[k]?.total ?? 0) > 0))
  let current = 0
  const cursor = new Date()
  if (!active.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1)
  while (active.has(dayKey(cursor))) {
    current++
    cursor.setDate(cursor.getDate() - 1)
  }
  let longest = 0
  let run = 0
  let prev: Date | null = null
  for (const k of [...active].sort()) {
    const d = new Date(k + "T00:00:00")
    run = prev && Math.round((d.getTime() - prev.getTime()) / 86_400_000) === 1 ? run + 1 : 1
    longest = Math.max(longest, run)
    prev = d
  }
  return { current, longest: Math.max(longest, current) }
}
