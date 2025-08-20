// file: components/search-dialog.tsx
"use client"

import { useState, useEffect } from "react"
import { Search, BookOpen, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { courseDays, phases } from "@/lib/course-data"
import Link from "next/link"

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<typeof courseDays>([])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchResults = courseDays.filter((day) => {
      const searchText = query.toLowerCase()
      return (
        day.title.toLowerCase().includes(searchText) ||
        day.phase.toLowerCase().includes(searchText) ||
        day.topics.some((topic) => topic.toLowerCase().includes(searchText)) ||
        day.theory.toLowerCase().includes(searchText)
      )
    })

    setResults(searchResults.slice(0, 8)) // Limit to 8 results
  }, [query])

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

  const getPhaseForDay = (day: number) => {
    if (day <= 5) return phases[0]
    if (day <= 10) return phases[1]
    if (day <= 15) return phases[2]
    if (day <= 20) return phases[3]
    return phases[4]
  }

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
          <DialogTitle>Search Course Content</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search for lessons, topics, or concepts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
            autoFocus
          />

          {results.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.map((day) => {
                const phase = getPhaseForDay(day.day)
                return (
                  <Link
                    key={day.day}
                    href={`/day/${day.day}`}
                    onClick={() => setOpen(false)}
                    className="block p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            Day {day.day}: {day.title}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={`bg-gradient-to-r ${phase.gradient} text-white border-0 text-xs`}
                          >
                            {day.phase}
                          </Badge>
                          <div className="flex flex-wrap gap-1">
                            {day.topics.slice(0, 3).map((topic) => (
                              <Badge key={topic} variant="secondary" className="text-xs">
                                <Hash className="h-3 w-3 mr-1" />
                                {topic}
                              </Badge>
                            ))}
                          </div>
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
