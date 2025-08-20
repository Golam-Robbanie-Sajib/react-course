// filepath: components/confidence-rating.tsx
"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ConfidenceRatingProps {
  day: number
}

export function ConfidenceRating({ day }: ConfidenceRatingProps) {
  const { confidenceRatings, updateConfidenceRating, isAuthenticated } = useProgress()
  const currentRating = confidenceRatings[day] || 0
  const [hoverRating, setHoverRating] = useState(0)

  // Do not render the component if the user is not logged in
  if (!isAuthenticated) {
    return null
  }

  const handleRating = (rating: number) => {
    // Allow users to clear their rating by clicking the same star again
    const newRating = currentRating === rating ? 0 : rating;
    updateConfidenceRating({ day, rating: newRating })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rate Your Confidence</CardTitle>
        <CardDescription>How well do you understand this topic?</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                "h-8 w-8 cursor-pointer transition-all",
                (hoverRating >= star || currentRating >= star) 
                  ? "text-yellow-400 fill-yellow-400" 
                  : "text-gray-300 dark:text-gray-600 hover:scale-110"
              )}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => handleRating(star)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}