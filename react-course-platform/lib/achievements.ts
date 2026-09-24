import type { LearningStats } from "./learning-stats"

export interface Achievement {
  id: string
  title: string
  description: string
  emoji: string
  earned: boolean
  /** Progress toward the goal, for a small bar on locked badges. */
  progress: number
  goal: number
}

export const CERTIFICATE_PASS_MARK = 70

function badge(
  id: string,
  emoji: string,
  title: string,
  description: string,
  progress: number,
  goal: number
): Achievement {
  return { id, emoji, title, description, progress: Math.min(progress, goal), goal, earned: progress >= goal }
}

export function computeAchievements(s: LearningStats): Achievement[] {
  const coursesStarted = s.byCourse.filter((c) => c.completedDays.length > 0).length
  const bestCourseRatio = Math.max(0, ...s.byCourse.map((c) => (c.totalDays ? c.completedDays.length / c.totalDays : 0)))
  const bestExam = Math.max(0, ...s.byCourse.map((c) => c.examHighest ?? 0))
  const graduatedAny = s.byCourse.some((c) => c.totalDays > 0 && c.completedDays.length >= c.totalDays)

  return [
    badge("first-step", "👣", "First step", "Complete your first lesson.", s.completedLessons, 1),
    badge("streak-3", "🔥", "On a roll", "Study 3 days in a row.", s.streak.longest, 3),
    badge("streak-7", "📅", "Week warrior", "Study 7 days in a row.", s.streak.longest, 7),
    badge("solver-5", "🧪", "Test driven", "Pass every test on 5 exercises.", s.solvedExercises, 5),
    badge("solver-15", "🐞", "Bug squasher", "Pass every test on 15 exercises.", s.solvedExercises, 15),
    badge("quiz-50", "🧠", "Quiz whiz", "Answer 50 quiz questions correctly.", s.quizCorrect, 50),
    badge("polyglot", "🌐", "Polyglot", `Complete a lesson in all ${s.byCourse.length} courses.`, coursesStarted, s.byCourse.length),
    badge("halfway", "⛰️", "Halfway there", "Finish half of any course.", Math.round(bestCourseRatio * 100), 50),
    badge("graduate", "🎓", "Graduate", "Finish every lesson in a course.", graduatedAny ? 1 : 0, 1),
    badge("certified", "📜", "Certified", `Score ${CERTIFICATE_PASS_MARK}%+ on a final exam.`, bestExam, CERTIFICATE_PASS_MARK),
    badge("exam-ace", "🏆", "Exam ace", "Score 90%+ on a final exam.", bestExam, 90),
  ]
}
