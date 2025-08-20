// filepath: app/dashboard/page.tsx
"use client"

import { CourseLayout } from "@/components/course-layout"
import { useProgress } from "@/hooks/use-progress"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle, Flame, Star, Trophy } from "lucide-react"
import { courseData, phases } from "@/lib/course-data"
import { useAuth } from "@/components/auth/auth-provider"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { 
    completedDays, 
    currentStreak, 
    highestScore, 
    confidenceRatings,
    isLoading 
  } = useProgress();
  const { user } = useAuth();

  if (isLoading) {
    return <CourseLayout><div>Loading dashboard...</div></CourseLayout>
  }

  if (!user) {
    return (
        <CourseLayout>
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
                <p className="mb-6 text-muted-foreground">Please log in to view your dashboard and track your progress.</p>
                {/* Optionally, you could include the UserProfile component here to show a login button directly */}
            </div>
        </CourseLayout>
    )
  }

  const totalLessons = courseData.length;
  const completedCount = completedDays.length;
  const completionPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  
  const averageConfidence = () => {
    const ratings = Object.values(confidenceRatings);
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return (sum / ratings.length).toFixed(1);
  };

  return (
    <CourseLayout>
      <div className="space-y-8">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <Button asChild>
            <Link href="/profile">View Profile Settings</Link>
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCount} / {totalLessons}</div>
              <p className="text-xs text-muted-foreground">{completionPercentage}% complete</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
              <Flame className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStreak} Days</div>
              <p className="text-xs text-muted-foreground">Keep the fire burning!</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Highest Exam Score</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{highestScore !== null ? `${highestScore}%` : 'N/A'}</div>
              <p className="text-xs text-muted-foreground">From the final exam</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Confidence</CardTitle>
              <Star className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageConfidence()} / 5.0</div>
              <p className="text-xs text-muted-foreground">Across all rated lessons</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Progress by Phase</CardTitle>
            <CardDescription>Your completion status for each section of the course.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {phases.map(phase => {
              const phaseDays = courseData.filter(d => d.phase === phase.name);
              const completedInPhase = phaseDays.filter(d => completedDays.includes(d.day)).length;
              const phasePercentage = phaseDays.length > 0 ? Math.round((completedInPhase / phaseDays.length) * 100) : 0;
              return (
                <div key={phase.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium">{phase.name}</span>
                    <span className="text-sm text-muted-foreground">{completedInPhase} / {phaseDays.length}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5 dark:bg-slate-700">
                    <div className={`h-2.5 rounded-full bg-gradient-to-r ${phase.gradient}`} style={{ width: `${phasePercentage}%` }}></div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </CourseLayout>
  )
}