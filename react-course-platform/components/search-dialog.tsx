"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, BookOpen, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { courses, getPhaseForDay } from "@/lib/courses"
import type { Course, CourseDay } from "@/lib/courses/types"
import Link from "next/link"

interface SearchDialogProps {
  course?: Course
}

interface Hit {
  course: Course
  day: CourseDay
}

export function SearchDialog({ course }: SearchDialogProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Hit[]>([])

  const corpus: Hit[] = useMemo(() => {
    const list = course ? [course] : courses
    const hits: Hit[] = []
    for (const c of list) for (const d of c.days) hits.push({ course: c, day: d })
    return hits
  }, [course])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    const q = query.toLowerCase()
    const matched = corpus.filter(({ day }) => {
      const exerciseHay = day.exercises.map((e) => `${e.title} ${e.description}`).join(" ")
      const theoryText = typeof day.theory === "string" ? day.theory : ""
      return (
        day.title.toLowerCase().includes(q) ||
        day.phase.toLowerCase().includes(q) ||
        day.topics.some((topic) => topic.toLowerCase().includes(q)) ||
        theoryText.toLowerCase().includes(q) ||
        exerciseHay.toLowerCase().includes(q)
      )
    })
    setResults(matched.slice(0, 10))
  }, [query, corpus])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-muted-foreground bg-transparent">
          <Search className="mr-2 h-4 w-4" />
          Search lessons...
          <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search {course ? `the ${course.title.split(" in ")[0]} course` : "all courses"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search for lessons, topics, or exercises..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
            autoFocus
          />

          {results.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.map((hit) => {
                const phase = getPhaseForDay(hit.course, hit.day.day)
                return (
                  <Link
                    key={`${hit.course.id}-${hit.day.day}`}
                    href={`/courses/${hit.course.slug}/day/${hit.day.day}`}
                    onClick={() => setOpen(false)}
                    className="block p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {hit.course.title.split(" in ")[0]} · Day {hit.day.day}: {hit.day.title}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 flex-wrap gap-1">
                          {phase && (
                            <Badge
                              variant="outline"
                              className={`bg-gradient-to-r ${phase.gradient} text-white border-0 text-xs`}
                            >
                              {hit.day.phase}
                            </Badge>
                          )}
                          {hit.day.topics.slice(0, 3).map((topic) => (
                            <Badge key={topic} variant="secondary" className="text-xs">
                              <Hash className="h-3 w-3 mr-1" />
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          {query && results.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No results found for "{query}"</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
