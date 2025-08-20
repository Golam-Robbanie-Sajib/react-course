// hooks/use-progress.ts

"use client"

import { useState, useEffect } from "react"

export function useProgress() {
  const [completedDays, setCompletedDays] = useState<number[]>([])
  const [currentDay, setCurrentDay] = useState<number>(1)

  useEffect(() => {
    // Load progress from localStorage
    const saved = localStorage.getItem("course-progress")
    if (saved) {
      try {
        const progress = JSON.parse(saved)
        setCompletedDays(progress.completedDays || [])
        setCurrentDay(progress.currentDay || 1)
      } catch (error) {
        console.error("Failed to load progress:", error)
      }
    }
  }, [])

  const saveProgress = (completed: number[], current: number) => {
    const progress = {
      completedDays: completed,
      currentDay: current,
      lastUpdated: new Date().toISOString(),
    }
    localStorage.setItem("course-progress", JSON.stringify(progress))
    setCompletedDays(completed)
    setCurrentDay(current)
  }

  const markDayComplete = (day: number) => {
    const newCompleted = [...completedDays]
    if (!newCompleted.includes(day)) {
      newCompleted.push(day)
      newCompleted.sort((a, b) => a - b)
    }
    const newCurrent = Math.max(currentDay, day + 1)
    saveProgress(newCompleted, newCurrent)
  }

  const resetProgress = () => {
    localStorage.removeItem("course-progress")
    setCompletedDays([])
    setCurrentDay(1)
  }

  return {
    completedDays,
    currentDay,
    markDayComplete,
    resetProgress,
    isCompleted: (day: number) => completedDays.includes(day),
  }
}
