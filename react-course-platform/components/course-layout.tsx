// filepath: components/course-layout.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Menu, X, Home, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchDialog } from "@/components/search-dialog"
import { courseDays, phases, getPhaseForDay } from "@/lib/course-data"
import { useProgress } from "@/hooks/use-progress"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserProfile } from "./user-profile"
import { useAuth } from "@/components/auth/auth-provider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CourseLayoutProps {
  children: React.ReactNode
  currentDay?: number
}

export function CourseLayout({ children, currentDay }: CourseLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { completedDays, isCompleted, updateStreak } = useProgress()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      updateStreak();
    }
  }, [user, updateStreak]);

  const currentDayData = currentDay ? courseDays.find((d) => d.day === currentDay) : null
  const currentPhase = currentDayData ? getPhaseForDay(currentDayData.day) : null

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
        fixed top-0 left-0 z-50 h-full w-80 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
        transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                React Course
              </h2>
              <p className="text-sm text-muted-foreground">25-Day Journey</p>
            </div>
            <div className="flex items-center space-x-2 lg:hidden">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-4 border-b">
             <div className="flex items-center justify-between mb-4">
               <span className="text-sm font-medium">Progress</span>
               <span className="text-sm text-muted-foreground">{Math.round((completedDays.length / 25) * 100)}%</span>
             </div>
             <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-in-out"
                  style={{ width: `${(completedDays.length / 25) * 100}%` }}
                />
             </div>
          </div>

          <div className="p-4">
             <SearchDialog />
          </div>

          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4 pb-10">
              {phases.map((phase, index) => {
                const phaseDays = courseDays.filter((day) => day.phase === phase.name);
                if (phaseDays.length === 0) return null;

                // Check if this phase is active (contains current day)
                const isActivePhase = currentPhase?.name === phase.name;

                return (
                  <Collapsible key={phase.name} defaultOpen={isActivePhase || index === 0}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-muted/50 transition-colors group">
                       <div className="flex items-center space-x-2">
                         <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${phase.gradient}`} />
                         <div className="text-left">
                           <h3 className="font-semibold text-sm">{phase.name}</h3>
                           <p className="text-xs text-muted-foreground">{phase.days}</p>
                         </div>
                       </div>
                       <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>

                    <CollapsibleContent className="space-y-1 mt-2 ml-3 pl-3 border-l border-border/50">
                      {phaseDays.map((dayData) => {
                        const dayNumber = dayData.day;
                        const isActive = currentDay === dayNumber;
                        const isDayCompleted = isCompleted(dayNumber);

                        return (
                          <Link
                            key={dayNumber}
                            href={`/day/${dayNumber}`}
                            className={`
                              group flex items-center justify-between p-2 rounded-md text-sm transition-all
                              ${isActive
                                ? "bg-primary/10 text-primary font-medium"
                                : "hover:bg-muted text-muted-foreground hover:text-foreground"
                              }
                              ${isDayCompleted && !isActive ? "opacity-60 hover:opacity-100" : ""}
                            `}
                          >
                            <span className="flex items-center">
                               {isDayCompleted && (
                                   <span className="mr-2 text-green-500">✓</span>
                               )}
                               Day {dayNumber}
                            </span>
                            {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                          </Link>
                        );
                      })}
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          </ScrollArea>

          <div className="p-4 border-t flex justify-between items-center bg-muted/20">
             <ThemeToggle />
             <span className="text-xs text-muted-foreground">v2.0.0</span>
          </div>
        </div>
      </aside>

      <div className="flex-1 lg:pl-80 transition-all duration-300">
        <header className="sticky top-0 z-30 bg-background/70 backdrop-blur-lg border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <nav className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-foreground transition-colors">
                  <Home className="h-4 w-4" />
                </Link>
                {currentDayData && currentPhase && (
                  <>
                    <ChevronRight className="h-4 w-4" />
                    <span className="font-medium text-foreground">
                      {currentPhase.name}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                    <span>
                      Day {currentDay}
                    </span>
                  </>
                )}
              </nav>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              {currentDay && (
                <div className="flex items-center space-x-2 mr-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={!currentDay || currentDay <= 1}
                    asChild={currentDay > 1}
                  >
                    {currentDay > 1 ? (
                        <Link href={`/day/${currentDay - 1}`}>Prev</Link>
                    ) : (
                        <span>Prev</span>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={!currentDay || currentDay >= 25}
                    asChild={currentDay < 25}
                  >
                    {currentDay < 25 ? (
                        <Link href={`/day/${currentDay + 1}`}>Next</Link>
                    ) : (
                        <span>Next</span>
                    )}
                  </Button>
                </div>
              )}
              <UserProfile />
            </div>
          </div>
        </header>
        <main className="container max-w-5xl mx-auto p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
        </main>
      </div>
    </div>
  )
}
