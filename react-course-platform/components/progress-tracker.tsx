"use client"
// filepath: components/progress-tracker.tsx
"use client"

import { Trophy, Target, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useProgress } from "@/hooks/use-progress"
import { phases } from "@/lib/course-data"

export function ProgressTracker() {
  const { completedDays, currentDay } = useProgress()

  const totalDays = 25
  const completionPercentage = (completedDays.length / totalDays) * 100

  const phaseProgress = phases.map((phase, index) => {
    const startDay = index * 5 + 1
    const endDay = (index + 1) * 5
    const phaseDays = Array.from({ length: 5 }, (_, i) => startDay + i)
    const completedInPhase = phaseDays.filter((day) => completedDays.includes(day)).length

    return {
      ...phase,
      completed: completedInPhase,
      total: 5,
      percentage: (completedInPhase / 5) * 100,
    }
  })

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="glass dark:glass-dark border-white/20 dark:border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span>Overall Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">
              {completedDays.length}/{totalDays}
            </span>
            <Badge variant="secondary" className="text-sm">
              {Math.round(completionPercentage)}% Complete
            </Badge>
          </div>
          <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Target className="h-4 w-4" />
              <span>Current: Day {currentDay}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{25 - completedDays.length} days remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phase Progress */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Phase Progress</h3>
        <div className="grid gap-4">
          {phaseProgress.map((phase, index) => (
            <Card key={phase.name} className="glass dark:glass-dark border-white/20 dark:border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${phase.gradient}`} />
                    <span className="font-medium text-sm">{phase.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {phase.completed}/{phase.total}
                  </Badge>
                </div>
                <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${phase.gradient} rounded-full transition-all duration-500`}
                    style={{ width: `${phase.percentage}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
