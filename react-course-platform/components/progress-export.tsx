"use client"

import { useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Upload } from "lucide-react"
import { toast } from "sonner"

const LOCAL_KEY = "course-platform:progress:v1"

interface ExportShape {
  version: 1
  exportedAt: string
  byCourse: Record<
    string,
    {
      completedDays: number[]
      notes: Record<number, string>
      confidenceRatings: Record<number, number>
    }
  >
  examHighest: number | null
  examLast: number | null
  currentStreak: number
  lastLoginDate: string | null
}

function readLocal(): ExportShape | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      byCourse: parsed.byCourse || {},
      examHighest: parsed.examHighest ?? null,
      examLast: parsed.examLast ?? null,
      currentStreak: parsed.currentStreak ?? 0,
      lastLoginDate: parsed.lastLoginDate ?? null,
    }
  } catch {
    return null
  }
}

function writeLocal(next: Omit<ExportShape, "version" | "exportedAt">) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(next))
  window.dispatchEvent(new Event("local-progress-changed"))
}

export function ProgressExport() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [importing, setImporting] = useState(false)

  const handleExport = () => {
    const data = readLocal()
    if (!data || Object.keys(data.byCourse).length === 0) {
      toast.error("No local progress to export yet.")
      return
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `self-learn-hub-progress-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
    toast.success("Progress exported.")
  }

  const handleImport = async (file: File) => {
    setImporting(true)
    try {
      const text = await file.text()
      const parsed = JSON.parse(text) as ExportShape
      if (parsed.version !== 1 || !parsed.byCourse) {
        toast.error("Unrecognised file format.")
        return
      }
      writeLocal({
        byCourse: parsed.byCourse,
        examHighest: parsed.examHighest ?? null,
        examLast: parsed.examLast ?? null,
        currentStreak: parsed.currentStreak ?? 0,
        lastLoginDate: parsed.lastLoginDate ?? null,
      })
      toast.success("Progress imported. Refresh to see updates everywhere.")
    } catch (err: any) {
      toast.error(`Import failed: ${err?.message || "invalid JSON"}`)
    } finally {
      setImporting(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Backup &amp; Restore</CardTitle>
        <CardDescription>
          Export your local progress to a JSON file or restore from one. Useful for moving between devices or clearing your browser.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" /> Export progress
        </Button>
        <Button
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={importing}
        >
          <Upload className="h-4 w-4 mr-2" />
          {importing ? "Importing…" : "Import progress"}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) handleImport(f)
          }}
        />
      </CardContent>
    </Card>
  )
}
