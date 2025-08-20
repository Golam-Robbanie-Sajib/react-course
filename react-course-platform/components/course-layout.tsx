// filepath: components/course-layout.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Menu, X, Home, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchDialog } from "@/components/search-dialog"
import { courseDays, phases, getPhaseForDay } from "@/lib/course-data"
import { useProgress } from "@/hooks/use-progress"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface CourseLayoutProps {
  children: React.ReactNode
  currentDay?: number
}

export function CourseLayout({ children, currentDay }: CourseLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { completedDays, isCompleted } = useProgress()

  const currentDayData = currentDay ? courseDays.find((d) => d.day === currentDay) : null
  const currentPhase = currentDayData ? getPhaseForDay(currentDayData.day) : null

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Mobile sidebar overlay, now used for all screen sizes */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Always a fixed overlay, controlled by state */}
      <aside
        className={`
        fixed top-0 left-0 z-50 h-full w-80 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="h-full glass dark:glass-dark border-r border-white/20 dark:border-white/10">
          <div className="flex h-full flex-col">
            {/* Sidebar header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20 dark:border-white/10">
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  React Course
                </h2>
                <p className="text-sm text-muted-foreground">25-Day Journey</p>
              </div>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                {/* Close button is always visible when sidebar is open */}
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-white/20 dark:border-white/10">
              <SearchDialog />
            </div>

            {/* Progress indicator */}
            <div className="p-6 border-b border-white/20 dark:border-white/10">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{completedDays.length}/25</span>
                </div>
                <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${(completedDays.length / 25) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="space-y-6">
                {phases.map((phase) => {
                  const phaseDays = courseDays.filter((day) => day.phase === phase.name)

                  return (
                    <div key={phase.name} className="space-y-2">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${phase.bgGradient} dark:${phase.darkBgGradient} border border-white/20`}
                      >
                        <h3
                          className={`font-semibold text-sm bg-gradient-to-r ${phase.gradient} bg-clip-text text-transparent`}
                        >
                          {phase.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">{phase.days}</p>
                      </div>

                      <div className="space-y-1 ml-2">
                        {phaseDays.map((dayData) => {
                          const dayNumber = dayData.day
                          const isActive = currentDay === dayNumber
                          const isDayCompleted = isCompleted(dayNumber)

                          return (
                            <Link
                              key={dayNumber}
                              href={`/day/${dayNumber}`}
                              className={`
                                block p-2 rounded-lg text-sm transition-all duration-200 group
                                ${
                                  isActive
                                    ? `bg-gradient-to-r ${phase.gradient} text-white shadow-lg scale-105`
                                    : isDayCompleted
                                      ? "text-green-700 dark:text-green-300 hover:scale-105 opacity-60"
                                      : "hover:bg-white/50 dark:hover:bg-white/5 text-foreground hover:scale-105"
                                }
                              `}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">Day {dayNumber}</span>
                                {isDayCompleted && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                              </div>
                              <div className="text-xs opacity-75 mt-1 truncate">{dayData.title}</div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main content - Takes full width */}
      <div className="flex-1 transition-all duration-300">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/70 dark:bg-slate-950/70 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              {/* Hamburger menu - Always visible */}
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-4 w-4" />
              </Button>

              {/* Breadcrumbs */}
              <nav className="flex items-center space-x-2 text-sm">
                <Link
                  href="/"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Home className="h-4 w-4" />
                </Link>

                {currentDayData && (
                  <>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span
                      className={`font-medium bg-gradient-to-r ${currentPhase?.gradient} bg-clip-text text-transparent`}
                    >
                      {currentPhase?.name}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">
                      Day {currentDay}: {currentDayData.title}
                    </span>
                  </>
                )}
              </nav>
            </div>

            {/* Day navigation */}
            {currentDay && (
              <div className="flex items-center space-x-2">
                {currentDay > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="hover:scale-105 transition-transform"
                  >
                    <Link href={`/day/${currentDay - 1}`}>Previous</Link>
                  </Button>
                )}
                {currentDay < 25 && courseDays.find((d) => d.day === currentDay + 1) && (
                  <Button size="sm" asChild className="hover:scale-105 transition-transform">
                    <Link href={`/day/${currentDay + 1}`}>Next</Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">{children}</main>
      </div>
    </div>
  )
}