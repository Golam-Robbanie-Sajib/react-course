// filepath: app/profile/page.tsx
"use client"

import { CourseLayout } from "@/components/course-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useProgress } from "@/hooks/use-progress"
import { useAuth } from "@/components/auth/auth-provider"
import { Flame } from "lucide-react"
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

export default function ProfilePage() {
  const { session, isLoading: isAuthLoading } = useAuth()
  const { resetProgress, currentStreak, isLoading: isProgressLoading } = useProgress()

  if (isAuthLoading || isProgressLoading) {
    return (
      <CourseLayout>
        <div className="text-center">Loading profile...</div>
      </CourseLayout>
    );
  }

  if (!session) {
    return (
      <CourseLayout>
        <div className="text-center">Please log in to view your profile.</div>
      </CourseLayout>
    )
  }

  const handleResetProgress = () => {
    resetProgress()
  }

  return (
    <CourseLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your personal details and stats.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Email Address</p>
              <p className="text-muted-foreground">{session.user.email}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium">Daily Streak</p>
              <div className="flex items-center space-x-2 text-orange-500">
                <Flame className="h-5 w-5" />
                <span className="text-lg font-bold">{currentStreak} {currentStreak === 1 ? 'day' : 'days'}</span>
              </div>
            </div>
            
          </CardContent>
        </Card>

        <Card className="border-destructive">
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>This action cannot be undone.</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Reset Course Progress</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your course progress, including completed days, notes, and exam scores.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleResetProgress}>
                    Yes, Reset My Progress
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