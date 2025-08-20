// filepath: components/home-page.tsx
"use client"

import { ArrowRight, BookOpen, Clock, Trophy, Users, Zap, Code, Lightbulb, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { courseData } from "@/lib/course-data"
import Link from "next/link"

export function HomePage() {
  const phases = [
    { name: "JavaScript Fundamentals", days: "Days 1-7", description: "Master the core concepts of JavaScript programming" },
    { name: "Advanced JavaScript", days: "Days 8-11", description: "Dive deep into advanced JavaScript patterns and concepts" },
    { name: "React Fundamentals", days: "Days 12-16", description: "Learn the building blocks of React development" },
    { name: "Advanced React", days: "Days 17-22", description: "Master advanced React patterns and state management" },
    { name: "Production Ready", days: "Days 23-25", description: "Build production-ready applications with testing and optimization" },
  ]

  const features = [
    { icon: BookOpen, title: "Structured Learning", description: "25 carefully crafted lessons that build upon each other" },
    { icon: Code, title: "Hands-on Exercises", description: "Practice with real code examples and interactive solutions" },
    { icon: Clock, title: "Self-Paced", description: "Learn at your own speed with flexible scheduling" },
    { icon: Trophy, title: "Progressive Difficulty", description: "From JavaScript basics to advanced React patterns" },
    { icon: Lightbulb, title: "Modern Practices", description: "Learn current industry standards and best practices" },
    { icon: Users, title: "Production Ready", description: "Build skills for real-world development projects" },
  ]

  const stats = [
    { label: "Lessons", value: "25", icon: BookOpen },
    { label: "Exercises", value: "50+", icon: Code },
    { label: "Hours", value: "40+", icon: Clock },
    { label: "Rating", value: "4.9", icon: Star },
  ]

  // Direct download link for the syllabus PDF
  const syllabusUrl = "https://drive.google.com/uc?export=download&id=1kRGR8BFqifimXHhcJo0wZ48VIgbthZFq"

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="flex-1">
        <section className="bg-white dark:bg-gray-900 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-gray-300 dark:border-gray-600">
              <Zap className="w-4 h-4 mr-2" />
              25-Day Learning Journey
            </Badge>

            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Master React in 25 Days</h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Transform from JavaScript fundamentals to building production-ready React applications. A comprehensive,
              hands-on course designed for modern web development.
            </p>

            <div className="flex gap-4 justify-center mb-12">
              <Button size="lg" asChild>
                <Link href="/day/1">
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              {/* --- MODIFIED "VIEW CURRICULUM" BUTTON --- */}
              <Button variant="outline" size="lg" asChild>
                <a href="#curriculum">View Curriculum</a>
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- ADDED ID TO THIS SECTION --- */}
        <section id="curriculum" className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Learning Journey</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Five carefully structured phases that take you from beginner to advanced React developer
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {phases.map((phase, index) => {
                const phaseDays = courseData.filter((day) => day.phase === phase.name)
                return (
                  <Card key={phase.name} className="border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">Phase {index + 1}</Badge>
                        <Badge variant="outline" className="text-xs">{phase.days}</Badge>
                      </div>
                      <CardTitle className="text-xl">{phase.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{phase.description}</p>
                      {phaseDays.length > 0 ? (
                        <Button variant="outline" className="w-full bg-transparent" asChild>
                          <Link href={`/day/${phaseDays[0].day}`}>
                            Start Phase {index + 1}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="outline" disabled className="w-full bg-transparent">Coming Soon</Button>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose This Course?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Designed with modern learning principles and industry best practices
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card key={feature.title} className="border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Join thousands of developers who have transformed their careers with our comprehensive React course.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/day/1">
                      Begin Day 1
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>

                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/exam">
                      <Trophy className="ml-2 h-5 w-5 mr-2" />
                      Take Final Exam
                    </Link>
                  </Button>
                  
                  {/* --- MODIFIED "DOWNLOAD SYLLABUS" BUTTON --- */}
                  <Button variant="outline" size="lg" asChild>
                    <a href={syllabusUrl} target="_blank" rel="noopener noreferrer">
                      Download Syllabus
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}