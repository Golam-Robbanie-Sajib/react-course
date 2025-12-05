// filepath: components/home-page.tsx
"use client"

import { ArrowRight, BookOpen, Clock, Trophy, Zap, Code, Star, Layout, Database, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { courseData, phases } from "@/lib/course-data"
import Link from "next/link"

export function HomePage() {
  const features = [
    { icon: Layout, title: "Modern Stack", description: "Built with Next.js, React, and Tailwind CSS" },
    { icon: Code, title: "Hands-on Practice", description: "Real-world coding exercises in every lesson" },
    { icon: Database, title: "Backend Integration", description: "Learn to connect with Firebase and APIs" },
    { icon: Trophy, title: "Certificate Ready", description: "Complete the final exam to validate your skills" },
  ]

  const stats = [
    { label: "Lessons", value: "25", icon: BookOpen },
    { label: "Code Examples", value: "100+", icon: Code },
    { label: "Hours of Content", value: "40+", icon: Clock },
    { label: "Average Rating", value: "4.9", icon: Star },
  ]

  // Direct download link for the syllabus PDF
  const syllabusUrl = "https://drive.google.com/uc?export=download&id=1kRGR8BFqifimXHhcJo0wZ48VIgbthZFq"

  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero Section - Removed framer-motion to prevent hydration issues and missing content */}
        <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24 animate-in fade-in zoom-in-95 duration-700">
           {/* Background Elements */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none">
              <div className="absolute top-10 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute top-10 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
           </div>

          <div className="container px-4 md:px-6 relative z-10 text-center">

                <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm backdrop-blur-sm bg-background/50 border shadow-sm">
                <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                Updated for React 19 & Next.js 15
                </Badge>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent mb-6 max-w-4xl mx-auto">
                Master React from <br className="hidden md:block"/> Zero to Production
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                A structured 25-day interactive journey. Transform your JavaScript knowledge into professional React expertise.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button size="lg" className="text-lg px-8 h-12 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all" asChild>
                    <Link href="/day/1">
                    Start Learning Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>

                <Button variant="outline" size="lg" className="text-lg px-8 h-12 bg-background/50 backdrop-blur-sm" asChild>
                    <a href="#curriculum">Explore Curriculum</a>
                </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-8 border-t border-border/50">
                {stats.map((stat) => (
                    <div key={stat.label} className="text-center p-4 rounded-xl hover:bg-muted/50 transition-colors">
                    <div className="flex justify-center mb-2 text-primary opacity-80">
                        <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold tracking-tight mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                    </div>
                ))}
                </div>

          </div>
        </section>

        {/* Curriculum Section */}
        <section id="curriculum" className="py-20 bg-muted/30 relative">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Learning Path</h2>
              <p className="text-lg text-muted-foreground">
                We've broken down complex topics into digestible daily lessons across 5 clear phases.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {phases.map((phase, index) => {
                const phaseDays = courseData.filter((day) => day.phase === phase.name)
                // Using the gradient defined in course-data if available, otherwise fallback
                const gradientClass = (phase as any).gradient ? (phase as any).gradient : "from-blue-500 to-indigo-500";

                return (
                  <Card key={phase.name} className="relative overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-xl group">
                    <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${gradientClass}`} />
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs font-semibold">Phase {index + 1}</Badge>
                        <span className="text-xs font-mono text-muted-foreground">{(phase as any).days}</span>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">{phase.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{(phase as any).description || "Master these concepts."}</p>

                      <div className="space-y-2 mb-6">
                         {phaseDays.slice(0, 3).map(day => (
                             <div key={day.day} className="flex items-center text-sm text-muted-foreground">
                                 <Check className="w-4 h-4 mr-2 text-green-500" />
                                 <span className="truncate">{day.title}</span>
                             </div>
                         ))}
                         {phaseDays.length > 3 && (
                             <div className="text-xs text-muted-foreground pl-6">+ {phaseDays.length - 3} more lessons</div>
                         )}
                      </div>

                      {phaseDays.length > 0 ? (
                        <Button variant="ghost" className="w-full justify-between group/btn hover:bg-primary hover:text-primary-foreground transition-all" asChild>
                          <Link href={`/day/${phaseDays[0].day}`}>
                            Start Phase {index + 1}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="outline" disabled className="w-full">Coming Soon</Button>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why This Course?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Most tutorials are outdated or too shallow. This platform is designed for deep, practical learning.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="border-none shadow-none bg-muted/30 hover:bg-muted/50 transition-colors">
                  <CardContent className="pt-6 text-center">
                    <div className="mb-4 inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
             {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-black/10 blur-3xl pointer-events-none"></div>

          <div className="container px-4 md:px-6 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Code?
            </h2>
            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
              Don't just watch videos. Write code, solve problems, and build your portfolio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg h-12 px-8" asChild>
                <Link href="/day/1">
                  Begin Day 1
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="text-lg h-12 px-8 bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground" asChild>
                <Link href="/exam">
                  <Trophy className="ml-2 h-5 w-5 mr-2" />
                  Final Exam
                </Link>
              </Button>

               <Button variant="link" className="text-primary-foreground underline-offset-4 hover:text-white" asChild>
                <a href={syllabusUrl} target="_blank" rel="noopener noreferrer">
                  Download Syllabus PDF
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
