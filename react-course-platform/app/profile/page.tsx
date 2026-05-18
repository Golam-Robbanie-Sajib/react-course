"use client"

import { CourseLayout } from "@/components/course-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useProgress } from "@/hooks/use-progress"
import { useAuth } from "@/components/auth/auth-provider"
import { Flame } from "lucide-react"
import { ProgressExport } from "@/components/progress-export"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { courses } from "@/lib/courses"

export default function ProfilePage() {
  const { session, isLoading: isAuthLoading } = useAuth()
  const reactProg = useProgress("react")
  const htmlProg = useProgress("html")

  if (isAuthLoading) {
    return (
      <CourseLayout>
        <div className="text-center">Loading profile...</div>
      </CourseLayout>
    )
  }

  const handleResetAll = () => {
    reactProg.resetProgress()
    htmlProg.resetProgress()
  }

  return (
    <CourseLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">My Profile</h1>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Your account info and platform-wide stats.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {session && (
              <div>
                <p className="text-sm font-medium">Email Address</p>
                <p className="text-muted-foreground">{session.user.email}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium">Daily Streak</p>
              <div className="flex items-center space-x-2 text-orange-500">
                <Flame className="h-5 w-5" />
                <span className="text-lg font-bold">
                  {reactProg.currentStreak} {reactProg.currentStreak === 1 ? "day" : "days"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <ProgressExport />

        <Card className="border-destructive">
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>This action cannot be undone.</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Reset Progress (All Courses)</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will reset completed days, notes, and confidence ratings across all{" "}
                    {courses.length} courses. Exam scores stay.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleResetAll}>
                    Yes, reset everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </CourseLayout>
  )
}
