// filepath: app/exam/page.tsx
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CourseLayout } from "@/components/course-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { finalExamQuestions } from "@/lib/exam-data"
import type { QuizQuestion } from "@/lib/course-data"
import { ArrowRight, CheckCircle, RefreshCw, Trophy } from "lucide-react"

// A simple shuffle function
const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function FinalExamPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setQuestions(shuffleArray(finalExamQuestions));
  }, []);

  const handleStartExam = () => {
    setUserAnswers(new Array(questions.length).fill(null));
    setExamStarted(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleFinishExam = () => {
    let finalScore = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].correctAnswerIndex) {
        finalScore++;
      }
    }
    setScore(finalScore);
    setExamFinished(true);
  };

  const handleRestartExam = () => {
    setQuestions(shuffleArray(finalExamQuestions));
    setExamStarted(false);
    setExamFinished(false);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
  };

  if (!examStarted) {
    return (
      <CourseLayout>
        <div className="flex flex-col items-center justify-center text-center p-8">
          <Trophy className="h-16 w-16 text-yellow-500 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Final Exam</h1>
          <p className="text-muted-foreground mb-6 max-w-md">
            Test your knowledge with {questions.length} multiple-choice questions covering all topics from the course. Good luck!
          </p>
          <Button size="lg" onClick={handleStartExam}>
            Start Exam <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CourseLayout>
    );
  }

  if (examFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <CourseLayout>
        <div className="flex flex-col items-center justify-center text-center p-8">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Exam Complete!</h1>
          <p className="text-muted-foreground mb-6">You have completed the final exam.</p>
          <Card className="p-8">
            <p className="text-lg">Your Score</p>
            <p className="text-5xl font-bold my-2">{percentage}%</p>
            <p className="text-muted-foreground">You answered {score} out of {questions.length} questions correctly.</p>
          </Card>
          <Button size="lg" onClick={handleRestartExam} className="mt-8">
            <RefreshCw className="h-4 w-4 mr-2" />
            Take Again
          </Button>
        </div>
      </CourseLayout>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestionIndex];

  return (
    <CourseLayout>
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Question {currentQuestionIndex + 1}/{questions.length}</CardTitle>
            <CardDescription className="pt-4 text-lg text-foreground">{currentQuestion.question}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "secondary" : "outline"}
                  className="w-full justify-start h-auto py-3 text-left whitespace-normal"
                  onClick={() => handleAnswerSelect(index)}
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="flex justify-end pt-4">
              {currentQuestionIndex < questions.length - 1 ? (
                <Button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
                  Next Question <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleFinishExam} disabled={selectedAnswer === null} className="bg-green-600 hover:bg-green-700">
                  Finish Exam <Trophy className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </CourseLayout>
  );
}