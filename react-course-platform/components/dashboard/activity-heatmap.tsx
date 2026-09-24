"use client"

import { useEffect, useMemo, useRef } from "react"
import { dayKey, type ActivityLog } from "@/lib/activity"

const WEEKS = 26
const LEVEL_CLASSES = [
  "bg-gray-100 dark:bg-gray-800",
  "bg-emerald-200 dark:bg-emerald-900",
  "bg-emerald-400 dark:bg-emerald-700",
  "bg-emerald-500 dark:bg-emerald-500",
  "bg-emerald-700 dark:bg-emerald-300",
]

function level(n: number) {
  if (n <= 0) return 0
  if (n <= 2) return 1
  if (n <= 5) return 2
  if (n <= 9) return 3
  return 4
}

/** GitHub-style contribution grid of the last ~6 months of study activity. */
export function ActivityHeatmap({ log }: { log: ActivityLog }) {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const weeks = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    // Grid starts on the Sunday WEEKS-1 weeks ago so today lands in the last column.
    const start = new Date(today)
    start.setDate(start.getDate() - start.getDay() - (WEEKS - 1) * 7)
    const cols: { key: string; date: Date; count: number; future: boolean }[][] = []
    for (let w = 0; w < WEEKS; w++) {
      const col = []
      for (let d = 0; d < 7; d++) {
        const date = new Date(start)
        date.setDate(start.getDate() + w * 7 + d)
        const key = dayKey(date)
        col.push({ key, date, count: log[key]?.total ?? 0, future: date > today })
      }
      cols.push(col)
    }
    return cols
  }, [log])

  // On narrow screens, show the most recent weeks first.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollLeft = el.scrollWidth
  }, [weeks])

  const activeDays = Object.values(log).filter((d) => d.total > 0).length
  const monthLabels = weeks.map((col, i) => {
    const first = col[0].date
    const prev = i > 0 ? weeks[i - 1][0].date : null
    return !prev || prev.getMonth() !== first.getMonth()
      ? first.toLocaleString(undefined, { month: "short" })
      : ""
  })

  return (
    <div>
      <div ref={scrollRef} className="overflow-x-auto pb-1">
        <div className="inline-flex flex-col gap-1 min-w-max">
          <div className="flex gap-[3px] pl-7 text-[10px] text-muted-foreground h-3">
            {monthLabels.map((m, i) => (
              <div key={i} className="w-[11px] overflow-visible whitespace-nowrap">
                {m}
              </div>
            ))}
          </div>
          <div className="flex gap-[3px]">
            <div className="flex flex-col gap-[3px] pr-1 text-[10px] text-muted-foreground w-6">
              {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                <div key={i} className="h-[11px] leading-[11px]">
                  {d}
                </div>
              ))}
            </div>
            {weeks.map((col, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {col.map((cell) => (
                  <div
                    key={cell.key}
                    title={
                      cell.future
                        ? ""
                        : `${cell.count} activit${cell.count === 1 ? "y" : "ies"} on ${cell.date.toLocaleDateString()}`
                    }
                    className={`h-[11px] w-[11px] rounded-[2px] ${
                      cell.future ? "opacity-0" : LEVEL_CLASSES[level(cell.count)]
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
        <span>
          {activeDays} active day{activeDays === 1 ? "" : "s"}
        </span>
        <span className="flex items-center gap-1">
          Less
          {LEVEL_CLASSES.map((c, i) => (
            <span key={i} className={`h-[11px] w-[11px] rounded-[2px] ${c}`} />
          ))}
          More
        </span>
      </div>
    </div>
  )
}
