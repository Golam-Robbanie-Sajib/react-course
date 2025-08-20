// filepath: app/exam/page.tsx
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CourseLayout } from "@/components/course-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { finalExamQuestions } from "@/lib/exam-data"
import type { QuizQuestion } from "@/lib/course-data"
import { ArrowRight, CheckCircle, RefreshCw, Trophy, Clock } from "lucide-react"
import { useCountdown } from "@/hooks/use-countdown"

const EXAM_DURATION = 3600 * 1000; // 1 hour in milliseconds

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export default function FinalExamPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [examDeadline, setExamDeadline] = useState<number | null>(null);

  // Check for an ongoing exam on component mount
  useEffect(() => {
    const savedDeadline = localStorage.getItem('examDeadline');
    if (savedDeadline) {
      const deadline = parseInt(savedDeadline, 10);
      if (deadline > Date.now()) {
        setExamDeadline(deadline);
        setQuestions(finalExamQuestions); // Use non-shuffled for consistency on refresh
        setUserAnswers(JSON.parse(localStorage.getItem('userAnswers') || '[]'));
        setExamStarted(true);
      } else {
        // If deadline has passed, clear storage
        localStorage.removeItem('examDeadline');
        localStorage.removeItem('userAnswers');
      }
    }
  }, []);

  const handleFinishExam = () => {
    let finalScore = 0;
    const answers = JSON.parse(localStorage.getItem('userAnswers') || '[]') as number[];
    const savedQuestions = finalExamQuestions; // Use consistent question order for scoring

    for (let i = 0; i < savedQuestions.length; i++) {
      if (answers[i] === savedQuestions[i].correctAnswerIndex) {
        finalScore++;
      }
    }
    setScore(finalScore);
    setExamFinished(true);
    localStorage.removeItem('examDeadline');
    localStorage.removeItem('userAnswers');
  };

  const { minutes, seconds } = useCountdown(examDeadline, handleFinishExam);

  const handleStartExam = () => {
    const shuffledQuestions = shuffleArray(finalExamQuestions);
    const deadline = Date.now() + EXAM_DURATION;
    const initialAnswers = new Array(shuffledQuestions.length).fill(null);
    
    setQuestions(shuffledQuestions);
    setExamDeadline(deadline);
    setUserAnswers(initialAnswers);
    
    localStorage.setItem('examQuestions', JSON.stringify(shuffledQuestions)); // Save shuffled order
    localStorage.setItem('examDeadline', deadline.toString());
    localStorage.setItem('userAnswers', JSON.stringify(initialAnswers));

    setExamStarted(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
    localStorage.setItem('userAnswers', JSON.stringify(newAnswers));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleRestartExam = () => {
    localStorage.removeItem('examDeadline');
    localStorage.removeItem('userAnswers');
    localStorage.removeItem('examQuestions');
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
            You will have 1 hour to complete {finalExamQuestions.length} questions. Good luck!
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
      <div className="fixed top-16 left-1/2 -translate-x-1/2 z-20">
         <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border shadow-lg transition-colors ${parseInt(minutes) < 5 ? 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-200 dark:border-red-800' : 'bg-white/70 backdrop-blur-lg dark:bg-slate-900/70'}`}>
          <Clock className="h-5 w-5" />
          <span className="text-lg font-semibold tabular-nums">{minutes}:{seconds}</span>
        </div>
      </div>
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="pt-16"
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
            <div className="flex justify-between items-center pt-4">
              <span className="text-sm text-muted-foreground">
                Answered: {userAnswers.filter(a => a !== null).length}/{questions.length}
              </span>
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