// filepath: app/exam/page.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { CourseLayout } from "@/components/course-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { finalExamQuestions } from "@/lib/exam-data"
import type { QuizQuestion } from "@/lib/course-data"
import { ArrowRight, CheckCircle, RefreshCw, Trophy, Clock, X } from "lucide-react"
import { useCountdown } from "@/hooks/use-countdown"
import { useRouter } from "next/navigation"
import { useProgress } from "@/hooks/use-progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const EXAM_DURATION = 3600 * 1000; // 1 hour in milliseconds

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

type ExamState = "idle" | "active" | "finished";

export default function FinalExamPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [examState, setExamState] = useState<ExamState>("idle");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState(0);
  const [examDeadline, setExamDeadline] = useState<number | null>(null);
  
  const router = useRouter();
  const { highestScore, lastScore, updateExamScores } = useProgress();

  const clearExamState = () => {
    localStorage.removeItem('examDeadline');
    localStorage.removeItem('userAnswers');
    localStorage.removeItem('examQuestions');
  };

  const handleFinishExam = useCallback(() => {
    if (examState === 'finished') return;

    let finalScore = 0;
    const finalAnswers = JSON.parse(localStorage.getItem('userAnswers') || '[]') as (number | null)[];
    const savedQuestions = JSON.parse(localStorage.getItem('examQuestions') || '[]') as QuizQuestion[];

    if (savedQuestions.length === 0) return; // Avoid finishing an unstarted exam
    
    for (let i = 0; i < savedQuestions.length; i++) {
      if (finalAnswers[i] === savedQuestions[i].correctAnswerIndex) {
        finalScore++;
      }
    }
    setScore(finalScore);
    updateExamScores({ newScore: finalScore, totalQuestions: savedQuestions.length });
    setExamState('finished');
    clearExamState();
  }, [examState, updateExamScores]);

  const { minutes, seconds } = useCountdown(examDeadline, handleFinishExam);

  useEffect(() => {
    const savedDeadline = localStorage.getItem('examDeadline');
    if (savedDeadline) {
      const deadline = parseInt(savedDeadline, 10);
      if (deadline > Date.now()) {
        setExamDeadline(deadline);
        setQuestions(JSON.parse(localStorage.getItem('examQuestions') || '[]'));
        setUserAnswers(JSON.parse(localStorage.getItem('userAnswers') || '[]'));
        setExamState('active');
      } else {
        handleFinishExam();
      }
    }
  }, [handleFinishExam]);

  const handleStartExam = () => {
    clearExamState();
    const shuffledQuestions = shuffleArray(finalExamQuestions);
    const deadline = Date.now() + EXAM_DURATION;
    const initialAnswers = new Array(shuffledQuestions.length).fill(null);
    
    setQuestions(shuffledQuestions);
    setExamDeadline(deadline);
    setUserAnswers(initialAnswers);
    setCurrentQuestionIndex(0);
    setScore(0);
    
    localStorage.setItem('examQuestions', JSON.stringify(shuffledQuestions));
    localStorage.setItem('examDeadline', deadline.toString());
    localStorage.setItem('userAnswers', JSON.stringify(initialAnswers));

    setExamState('active');
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

  const handleCancelExam = () => {
    clearExamState();
    router.push('/');
  };

  if (examState === 'idle') {
    return (
      <CourseLayout>
        <div className="flex flex-col items-center justify-center text-center p-8">
          <Trophy className="h-16 w-16 text-yellow-500 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Final Exam</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            You will have 1 hour to complete {finalExamQuestions.length} questions. Good luck!
          </p>
          
          {(highestScore !== null || lastScore !== null) && (
            <Card className="mb-8 p-6 text-left">
              <CardTitle className="mb-4">Your Previous Scores</CardTitle>
              <div className="flex space-x-8">
                {highestScore !== null && <div><p className="text-sm text-muted-foreground">Highest Score</p><p className="text-2xl font-bold">{highestScore}%</p></div>}
                {lastScore !== null && <div><p className="text-sm text-muted-foreground">Last Score</p><p className="text-2xl font-bold">{lastScore}%</p></div>}
              </div>
            </Card>
          )}

          <Button size="lg" onClick={handleStartExam}>
            Start Exam <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CourseLayout>
    );
  }

  if (examState === 'finished') {
    const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    return (
      <CourseLayout>
        <div className="flex flex-col items-center justify-center text-center p-8">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Exam Complete!</h1>
          <p className="text-muted-foreground mb-6">Your score has been saved to your profile.</p>
          <Card className="p-8">
            <p className="text-lg">Your Score</p>
            <p className="text-5xl font-bold my-2">{percentage}%</p>
            <p className="text-muted-foreground">You answered {score} out of {questions.length} questions correctly.</p>
          </Card>
          <Button size="lg" onClick={() => setExamState('idle')} className="mt-8">
            <RefreshCw className="h-4 w-4 mr-2" />
            Go Back to Exam Page
          </Button>
        </div>
      </CourseLayout>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestionIndex];

  return (
    <CourseLayout>
      <div className="fixed top-16 w-full px-4 z-20">
         <div className="max-w-3xl mx-auto flex justify-between items-center">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border shadow-lg transition-colors ${parseInt(minutes) < 5 ? 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-200 dark:border-red-800' : 'bg-white/70 backdrop-blur-lg dark:bg-slate-900/70'}`}>
              <Clock className="h-5 w-5" />
              <span className="text-lg font-semibold tabular-nums">{minutes}:{seconds}</span>
            </div>
            <div className="flex space-x-2">
              <AlertDialog>
                <AlertDialogTrigger asChild><Button variant="outline" size="sm"><X className="h-4 w-4 mr-2" />Cancel</Button></AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader><AlertDialogTitle>Cancel Exam?</AlertDialogTitle><AlertDialogDescription>Your progress will be lost.</AlertDialogDescription></AlertDialogHeader>
                  <AlertDialogFooter><AlertDialogCancel>Continue Exam</AlertDialogCancel><AlertDialogAction onClick={handleCancelExam}>Yes, Cancel</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger asChild><Button variant="destructive" size="sm"><RefreshCw className="h-4 w-4 mr-2" />Restart</Button></AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader><AlertDialogTitle>Restart Exam?</AlertDialogTitle><AlertDialogDescription>Your progress will be lost.</AlertDialogDescription></AlertDialogHeader>
                  <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => setExamState('idle')}>Yes, Restart</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
         </div>
      </div>
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="pt-32"
      >
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Question {currentQuestionIndex + 1}/{questions.length}</CardTitle>
            <CardDescription className="pt-4 text-lg text-foreground">{currentQuestion?.question}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {currentQuestion?.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={`
                      w-full justify-start h-auto py-3 text-left whitespace-normal 
                      transition-all duration-150 ease-in-out
                      ${isSelected 
                        ? 'border-foreground bg-foreground text-background' // Selected: Black border, black bg, white text
                        : 'hover:border-foreground/50' // Hover: Slightly darker border
                      }
                    `}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    {option}
                  </Button>
                )
              })}
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="text-sm text-muted-foreground">Answered: {userAnswers.filter(a => a !== null).length}/{questions.length}</span>
              {currentQuestionIndex < questions.length - 1 ? (
                <Button onClick={handleNextQuestion} disabled={selectedAnswer === null}>Next Question <ArrowRight className="h-4 w-4 ml-2" /></Button>
              ) : (
                <Button onClick={handleFinishExam} disabled={selectedAnswer === null} className="bg-green-600 hover:bg-green-700">Finish Exam <Trophy className="h-4 w-4 ml-2" /></Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </CourseLayout>
  );
}