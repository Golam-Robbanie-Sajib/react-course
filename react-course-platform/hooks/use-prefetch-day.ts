"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import type { Course, CourseDay } from "@/lib/courses/types"

/**
 * Warm the TanStack Query cache for an adjacent day so that navigation feels
 * instant. The course data itself is bundled, so this primarily seeds the
 * cache key that the day page can read synchronously on mount.
 */
export function usePrefetchDay(course: Course) {
  const queryClient = useQueryClient()
  return useCallback(
    (day: number) => {
      const dayData = course.days.find((d) => d.day === day)
      if (!dayData) return
      queryClient.setQueryData<CourseDay>(["day", course.id, day], dayData)
      queryClient.prefetchQuery({
        queryKey: ["day-warm", course.id, day],
        queryFn: () => Promise.resolve(dayData),
        staleTime: 1000 * 60 * 60, // 1 hour — course content doesn't change
      })
    },
    [course, queryClient]
  )
}
