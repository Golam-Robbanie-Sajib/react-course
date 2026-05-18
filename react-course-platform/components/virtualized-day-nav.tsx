"use client"

import { useMemo, useRef } from "react"
import Link from "next/link"
import { useVirtualizer } from "@tanstack/react-virtual"
import type { Course } from "@/lib/courses/types"
import { getPhaseForDay } from "@/lib/courses"

type Row =
  | { kind: "phase"; phaseName: string; days: string; gradient: string; bgGradient: string; darkBgGradient: string }
  | { kind: "day"; day: number; title: string; phaseGradient: string }

interface Props {
  course: Course
  currentDay?: number
  isCompleted: (day: number) => boolean
}

export function VirtualizedDayNav({ course, currentDay, isCompleted }: Props) {
  const parentRef = useRef<HTMLDivElement | null>(null)

  const rows: Row[] = useMemo(() => {
    const out: Row[] = []
    for (const phase of course.phases) {
      const phaseDays = course.days.filter((d) => d.phase === phase.name)
      if (phaseDays.length === 0) continue
      out.push({
        kind: "phase",
        phaseName: phase.name,
        days: phase.days,
        gradient: phase.gradient,
        bgGradient: phase.bgGradient,
        darkBgGradient: phase.darkBgGradient,
      })
      for (const d of phaseDays) {
        out.push({
          kind: "day",
          day: d.day,
          title: d.title,
          phaseGradient: phase.gradient,
        })
      }
    }
    return out
  }, [course])

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => (rows[i].kind === "phase" ? 64 : 52),
    overscan: 6,
  })

  return (
    <div ref={parentRef} className="flex-1 overflow-y-auto p-4">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((vRow) => {
          const row = rows[vRow.index]
          return (
            <div
              key={vRow.key}
              ref={virtualizer.measureElement}
              data-index={vRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${vRow.start}px)`,
              }}
              className="pb-1"
            >
              {row.kind === "phase" ? (
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${row.bgGradient} dark:${row.darkBgGradient} border border-white/20 mt-3 first:mt-0`}
                >
                  <h3
                    className={`font-semibold text-sm bg-gradient-to-r ${row.gradient} bg-clip-text text-transparent`}
                  >
                    {row.phaseName}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{row.days}</p>
                </div>
              ) : (
                <DayLink
                  course={course}
                  day={row.day}
                  title={row.title}
                  phaseGradient={row.phaseGradient}
                  isActive={currentDay === row.day}
                  isDayCompleted={isCompleted(row.day)}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DayLink({
  course,
  day,
  title,
  phaseGradient,
  isActive,
  isDayCompleted,
}: {
  course: Course
  day: number
  title: string
  phaseGradient: string
  isActive: boolean
  isDayCompleted: boolean
}) {
  return (
    <Link
      prefetch
      href={`/courses/${course.slug}/day/${day}`}
      className={`block p-2 ml-2 rounded-lg text-sm transition-colors ${
        isActive
          ? `bg-gradient-to-r ${phaseGradient} text-white shadow-lg`
          : isDayCompleted
            ? "text-muted-foreground opacity-70 hover:opacity-100"
            : "hover:bg-white/50 dark:hover:bg-white/5"
      }`}
    >
      <div className="font-medium">Day {day}</div>
      <div className="text-xs opacity-75 truncate">{title}</div>
    </Link>
  )
}
