// Shared types for all courses on the platform.

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
  // Body of a function that returns true when the user's code is correct.
  // Receives `code` (string) plus any helpers exposed by the runner.
  assertion: string
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
  theory: string
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
