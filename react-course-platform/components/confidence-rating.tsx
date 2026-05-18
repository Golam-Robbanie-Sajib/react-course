"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { useProgress } from "@/hooks/use-progress"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ConfidenceRatingProps {
  courseId: string
  day: number
}

export function ConfidenceRating({ courseId, day }: ConfidenceRatingProps) {
  const { confidenceRatings, updateConfidenceRating } = useProgress(courseId)
  const currentRating = confidenceRatings[day] || 0
  const [hoverRating, setHoverRating] = useState(0)

  const handleRating = (rating: number) => {
    const newRating = currentRating === rating ? 0 : rating
    updateConfidenceRating({ day, rating: newRating })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rate Your Confidence</CardTitle>
        <CardDescription>How well do you understand this topic?</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2" role="radiogroup" aria-label="Confidence rating from 1 to 5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={currentRating === star}
              aria-label={`Rate ${star} out of 5`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => handleRating(star)}
              className="rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Star
                className={cn(
                  "h-8 w-8 cursor-pointer transition-all",
                  hoverRating >= star || currentRating >= star
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 dark:text-gray-600 hover:scale-110"
                )}
              />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
