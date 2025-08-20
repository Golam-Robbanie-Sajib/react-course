// filepath: components/notes-section.tsx
"use client"

import { useState } from "react"
import { useProgress } from "@/hooks/use-progress"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { useDebounce } from "@/hooks/use-debounce" // We'll create this hook next

interface NotesSectionProps {
  day: number
}

export function NotesSection({ day }: NotesSectionProps) {
  const { notes, updateNote, isAuthenticated } = useProgress()
  const [noteContent, setNoteContent] = useState(notes[day] || "")

  // Debounce the updateNote call so we don't spam the database on every keystroke
  useDebounce(() => {
    // Only save if the note has changed from what's in the database
    if (isAuthenticated && noteContent !== (notes[day] || "")) {
      updateNote({ day, content: noteContent })
    }
  }, 1500, [noteContent])


  if (!isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please log in to save your personal notes for this lesson.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Write your notes, thoughts, and code snippets here. They will be saved automatically."
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          className="min-h-[150px]"
        />
      </CardContent>
    </Card>
  )
}