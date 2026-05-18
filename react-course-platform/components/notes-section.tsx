"use client"

import { useEffect, useState } from "react"
import { useProgress } from "@/hooks/use-progress"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { useDebounce } from "@/hooks/use-debounce"

interface NotesSectionProps {
  courseId: string
  day: number
}

export function NotesSection({ courseId, day }: NotesSectionProps) {
  const { notes, updateNote, isAuthenticated } = useProgress(courseId)
  const stored = notes[day] || ""
  const [noteContent, setNoteContent] = useState(stored)
  const [synced, setSynced] = useState(true)

  useEffect(() => {
    setNoteContent(stored)
  }, [stored, day])

  useDebounce(
    () => {
      if (noteContent !== stored) {
        updateNote({ day, content: noteContent })
        setSynced(true)
      }
    },
    800,
    [noteContent]
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>My Notes</span>
          <span className="text-xs font-normal text-muted-foreground">
            {isAuthenticated ? "Synced to your account" : "Saved on this device"}
            {synced ? "" : " · saving…"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Write your notes, thoughts, and code snippets here. They save automatically."
          value={noteContent}
          onChange={(e) => {
            setSynced(false)
            setNoteContent(e.target.value)
          }}
          className="min-h-[150px]"
        />
      </CardContent>
    </Card>
  )
}
