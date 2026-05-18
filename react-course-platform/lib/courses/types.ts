// Shared types for all courses on the platform.

import type * as React from "react"

export interface Resource {
  name: string
  url: string
}

export interface ExerciseSolution {
  code: string
  explanation: string
}

export type SandboxTemplate = "vanilla" | "static" | "react" | "react-ts"

export interface ExerciseTest {
  description: string
  /**
   * Body of a function that must return a truthy value when the user's
   * solution is correct. The available globals depend on `runner`:
   *  - "js" (default): user code is concatenated above the assertion, so
   *    any function/variable defined in the editor is in scope.
   *  - "html": parse the active HTML file and expose `doc: Document`.
   */
  assertion: string
  runner?: "js" | "html"
  /** Optional filename to feed into the runner. Defaults to the active file. */
  targetFile?: string
}

export interface Exercise {
  title: string
  description: string
  // Optional Sandpack live-coding setup. When provided, the exercise renders
  // an in-browser editor + preview instead of just a static prompt.
  template?: SandboxTemplate
  starter?: Record<string, string>
  activeFile?: string
  tests?: ExerciseTest[]
  hints?: string[]
  solution: ExerciseSolution
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctAnswerIndex: number
  explanation: string
}

export interface CourseDay {
  day: number
  phase: string
  title: string
  topics: string[]
  resources: Resource[]
  /**
   * The lesson body. Either an HTML string (rendered with
   * dangerouslySetInnerHTML) or a React component — typically an MDX page.
   * MDX is preferred for new content; HTML strings are kept for back-compat.
   */
  theory: string | React.ComponentType
  exercises: Exercise[]
  quiz?: QuizQuestion[]
}

export interface Phase {
  name: string
  days: string
  bgGradient: string
  darkBgGradient: string
  gradient: string
}

export interface Course {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  level: "Beginner" | "Beginner → Intermediate" | "Intermediate" | "Advanced"
  durationLabel: string
  coverGradient: string
  phases: Phase[]
  days: CourseDay[]
  hasFinalExam?: boolean
}
