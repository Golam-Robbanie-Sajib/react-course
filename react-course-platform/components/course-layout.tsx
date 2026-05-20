"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Menu, X, Home, ChevronRight, BookOpen, Brain, Layout, Repeat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchDialog } from "@/components/search-dialog"
import { courses, getCourse, getPhaseForDay } from "@/lib/courses"
import { useProgress } from "@/hooks/use-progress"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { UserProfile } from "./user-profile"
import { useAuth } from "@/components/auth/auth-provider"
import { VirtualizedDayNav } from "./virtualized-day-nav"
import type { Course } from "@/lib/courses/types"

interface CourseLayoutProps {
  children: React.ReactNode
  course?: Course
  currentDay?: number
}

export function CourseLayout({ children, course, currentDay }: CourseLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const activeCourse = course ?? courses[0]
  const { completedDays, isCompleted, updateStreak } = useProgress(activeCourse.id)
  const { user } = useAuth()

  useEffect(() => {
    if (user) updateStreak()
  }, [user, updateStreak])

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  const currentDayData = currentDay ? activeCourse.days.find((d) => d.day === currentDay) : null
  const currentPhase = currentDay ? getPhaseForDay(activeCourse, currentDay) : null
  const totalDays = activeCourse.days.length

  const goToDay = useCallback(
    (delta: number) => {
      if (!currentDay) return
      const next = currentDay + delta
      if (next < 1 || next > totalDays) return
      router.push(`/courses/${activeCourse.slug}/day/${next}`)
    },
    [currentDay, totalDays, activeCourse.slug, router]
  )

  useEffect(() => {
    if (!currentDay) return
    const handler = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === "ArrowLeft") goToDay(-1)
      else if (e.key === "ArrowRight") goToDay(1)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [currentDay, goToDay])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
        fixed top-0 left-0 z-50 h-full w-[min(20rem,calc(100vw-3rem))] transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="h-full glass dark:glass-dark border-r border-white/20 dark:border-white/10">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-6 border-b border-white/20 dark:border-white/10">
              <div>
                <Link href="/" className="block">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Self-Learn Hub
                  </h2>
                  <p className="text-xs text-muted-foreground">All courses · {courses.length}</p>
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-4 border-b border-white/20 dark:border-white/10 space-y-3">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Courses</div>
              <div className="space-y-1">
                {courses.map((c) => (
                  <Link
                    key={c.id}
                    href={`/courses/${c.slug}`}
                    className={`flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                      c.id === activeCourse.id
                        ? "bg-white/60 dark:bg-white/10 font-medium"
                        : "hover:bg-white/40 dark:hover:bg-white/5"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="h-3.5 w-3.5 opacity-70" />
                      {c.title.split(" in ")[0]}
                    </span>
                    <span className="text-xs text-muted-foreground">{c.days.length}d</span>
                  </Link>
                ))}
              </div>

              <div className="text-xs uppercase tracking-wide text-muted-foreground pt-2">Tools</div>
              <div className="space-y-1">
                <Link
                  href="/practice"
                  className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${
                    pathname === "/practice"
                      ? "bg-white/60 dark:bg-white/10 font-medium"
                      : "hover:bg-white/40 dark:hover:bg-white/5"
                  }`}
                >
                  <Brain className="h-3.5 w-3.5 opacity-70" />
                  Practice
                </Link>
                <Link
                  href="/review"
                  className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${
                    pathname === "/review"
                      ? "bg-white/60 dark:bg-white/10 font-medium"
                      : "hover:bg-white/40 dark:hover:bg-white/5"
                  }`}
                >
                  <Repeat className="h-3.5 w-3.5 opacity-70" />
                  Spaced review
                </Link>
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${
                    pathname === "/dashboard"
                      ? "bg-white/60 dark:bg-white/10 font-medium"
                      : "hover:bg-white/40 dark:hover:bg-white/5"
                  }`}
                >
                  <Layout className="h-3.5 w-3.5 opacity-70" />
                  Dashboard
                </Link>
              </div>
            </div>

            <div className="p-4 border-b border-white/20 dark:border-white/10">
              <SearchDialog course={activeCourse} />
            </div>
            <div className="p-6 border-b border-white/20 dark:border-white/10">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{activeCourse.title.split(" in ")[0]} progress</span>
                  <span className="font-medium">
                    {completedDays.length}/{totalDays}
                  </span>
                </div>
                <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{ width: `${(completedDays.length / totalDays) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <VirtualizedDayNav
              course={activeCourse}
              currentDay={currentDay}
              isCompleted={isCompleted}
            />
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-white/70 dark:bg-slate-950/70 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between gap-2 p-3 sm:p-4">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open course menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <nav className="flex items-center gap-1.5 text-sm min-w-0 overflow-hidden">
                <Link
                  href="/"
                  className="flex items-center text-muted-foreground hover:text-foreground shrink-0"
                  aria-label="Home"
                >
                  <Home className="h-4 w-4" />
                </Link>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />
                <Link
                  href={`/courses/${activeCourse.slug}`}
                  className="font-medium text-foreground hover:underline shrink-0 hidden sm:inline"
                >
                  {activeCourse.title.split(" in ")[0]}
                </Link>
                {currentDayData && (
                  <>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 hidden md:block" />
                    {currentPhase && (
                      <span
                        className={`font-medium bg-gradient-to-r ${currentPhase.gradient} bg-clip-text text-transparent shrink-0 hidden md:inline`}
                      >
                        {currentPhase.name}
                      </span>
                    )}
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />
                    <span className="font-medium text-foreground truncate min-w-0">
                      <span className="sm:hidden">Day {currentDay}</span>
                      <span className="hidden sm:inline">
                        Day {currentDay}: {currentDayData.title}
                      </span>
                    </span>
                  </>
                )}
              </nav>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <UserProfile />
              {currentDay && (
                <div className="hidden sm:flex items-center gap-2">
                  {currentDay > 1 && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/courses/${activeCourse.slug}/day/${currentDay - 1}`}>
                        Previous
                      </Link>
                    </Button>
                  )}
                  {currentDay < totalDays && (
                    <Button size="sm" asChild>
                      <Link href={`/courses/${activeCourse.slug}/day/${currentDay + 1}`}>Next</Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>
        <main
          className={`p-3 sm:p-6 lg:p-8 ${currentDay ? "pb-24 sm:pb-8" : "pb-8"}`}
        >
          {children}
        </main>

        {/* Mobile-only sticky prev/next dock — sits above the chat bubble. */}
        {currentDay && (
          <div className="fixed bottom-0 inset-x-0 z-30 sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg">
            <div className="flex items-center justify-between gap-2 p-2 pr-20" style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                disabled={currentDay <= 1}
                asChild={currentDay > 1}
              >
                {currentDay > 1 ? (
                  <Link href={`/courses/${activeCourse.slug}/day/${currentDay - 1}`}>
                    ← Prev
                  </Link>
                ) : (
                  <span>← Prev</span>
                )}
              </Button>
              <Button
                size="sm"
                className="flex-1"
                disabled={currentDay >= totalDays}
                asChild={currentDay < totalDays}
              >
                {currentDay < totalDays ? (
                  <Link href={`/courses/${activeCourse.slug}/day/${currentDay + 1}`}>
                    Next →
                  </Link>
                ) : (
                  <span>Next →</span>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Helper used internally by older imports (kept for compatibility with dashboard etc.)
export function resolveCourseBySlug(slug?: string) {
  return slug ? getCourse(slug) : courses[0]
}
