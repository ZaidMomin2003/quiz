// src/app/quiz/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Mcq, QuizHistoryItem, BookmarkItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { analyzeQuizAction } from '../actions';
import { CheckCircle, XCircle, BrainCircuit, Target, Loader2, Lightbulb, Clock, Bookmark as BookmarkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';


type QuizData = {
    topic: string;
    difficulty: 'easy' | 'medium' | 'hard';
    mcqs: Mcq[];
    totalTime?: number;
};

type Explanation = {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
}

type Analysis = {
    strongConcepts: string[];
    weakConcepts: string[];
    detailedExplanations: Explanation[];
};

export default function QuizPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [quizState, setQuizState] = useState<'instructions' | 'in-progress' | 'submitted'>('instructions');
    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [bookmarkedTimestamps, setBookmarkedTimestamps] = useState<Set<number>>(new Set());


    const submitQuiz = useCallback(async (finalAnswers: Record<number, string>) => {
        if (!quizData || quizState === 'submitted') return;

        setQuizState('submitted');
        setIsAnalyzing(true);
        
        const score = quizData.mcqs.reduce((score, mcq, index) => {
            return finalAnswers[index] === mcq.correctAnswer ? score + 1 : score;
        }, 0);

        const result = await analyzeQuizAction({
            questions: quizData!.mcqs.map(mcq => ({
                question: mcq.question,
                options: mcq.options,
                correctAnswer: mcq.correctAnswer,
            })),
            userAnswers: finalAnswers
        });
        
        if (result.analysis) {
            setAnalysis(result.analysis);
            saveQuizToHistory(score, result.analysis, finalAnswers);
        } else {
            saveQuizToHistory(score, null, finalAnswers);
        }
        setIsAnalyzing(false);

    }, [quizData, quizState]);


    useEffect(() => {
        const storedData = sessionStorage.getItem('currentQuiz');
        if (storedData) {
            try {
                const parsedData: QuizData = JSON.parse(storedData);
                if (!parsedData.difficulty) {
                    parsedData.difficulty = 'medium';
                }
                setQuizData(parsedData);
                if (parsedData.totalTime) {
                    setTimeLeft(parsedData.totalTime);
                }
            } catch (error) {
                console.error("Failed to parse quiz data from session storage", error);
                router.push('/dashboard');
            }
        } else {
            router.push('/dashboard');
        }
    }, [router]);
    
    useEffect(() => {
        if (quizState !== 'in-progress' || timeLeft === null || timeLeft <= 0) {
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime !== null && prevTime > 1) {
                    return prevTime - 1;
                } else {
                    clearInterval(timer);
                    submitQuiz(userAnswers);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [quizState, timeLeft, userAnswers, submitQuiz]);


    const saveQuizToHistory = (score: number, analysisResult: Analysis | null, finalAnswers: Record<number, string>) => {
        if (!quizData) return;

        const newHistoryItem: QuizHistoryItem = {
            topic: quizData.topic,
            difficulty: quizData.difficulty,
            mcqs: quizData.mcqs,
            userAnswers: finalAnswers,
            score,
            totalQuestions: quizData.mcqs.length,
            timestamp: Date.now(),
        };

        const existingHistory = localStorage.getItem('quizHistory');
        const history = existingHistory ? JSON.parse(existingHistory) : [];
        history.push(newHistoryItem);
        localStorage.setItem('quizHistory', JSON.stringify(history));

        // Save weak concepts
        if (analysisResult?.weakConcepts && analysisResult.weakConcepts.length > 0) {
            const existingWeakConcepts = localStorage.getItem('weakConcepts');
            const weakConceptsSet = existingWeakConcepts ? new Set(JSON.parse(existingWeakConcepts)) : new Set();
            analysisResult.weakConcepts.forEach(concept => weakConceptsSet.add(concept));
            localStorage.setItem('weakConcepts', JSON.stringify(Array.from(weakConceptsSet)));
        }
    };

    const handleNextQuestion = async () => {
        if (selectedAnswer) {
            const newAnswers = { ...userAnswers, [currentQuestionIndex]: selectedAnswer };
            setUserAnswers(newAnswers);
            setSelectedAnswer(null);

            if (currentQuestionIndex < quizData!.mcqs.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                await submitQuiz(newAnswers);
            }
        }
    };
    
    const calculateScore = (answers: Record<number, string> = userAnswers) => {
        if (!quizData) return 0;
        return quizData.mcqs.reduce((score, mcq, index) => {
            return answers[index] === mcq.correctAnswer ? score + 1 : score;
        }, 0);
    };

    const formatTime = (seconds: number | null) => {
        if (seconds === null) return '...';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleBookmark = (index: number, explanation: Explanation) => {
        if (!quizData) return;

        const newBookmark: BookmarkItem = {
            topic: quizData.topic,
            question: explanation.question,
            correctAnswer: explanation.correctAnswer,
            explanation: explanation.explanation,
            timestamp: Date.now() + index, // ensure uniqueness
        };

        const existingBookmarks: BookmarkItem[] = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        
        const alreadyExists = existingBookmarks.some(b => b.question === newBookmark.question);
        
        if (!alreadyExists) {
            const updatedBookmarks = [...existingBookmarks, newBookmark];
            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            setBookmarkedTimestamps(prev => new Set(prev).add(index));
             // Dispatch a custom event to notify other components (like the layout) of the change
            window.dispatchEvent(new CustomEvent('bookmarksUpdated'));
            toast({
              title: "Bookmarked!",
              description: "The explanation has been saved to your bookmarks.",
            });
        } else {
             toast({
                variant: 'destructive',
                title: "Already Bookmarked",
                description: "You've already saved this explanation.",
            });
        }
    };


    if (!quizData) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    if (quizState === 'instructions') {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-4">
                <Card className="max-w-2xl w-full">
                    <CardHeader>
                        <CardTitle className="text-3xl">Quiz on {quizData.topic}</CardTitle>
                        <CardDescription>You are about to start a quiz with {quizData.mcqs.length} questions.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>Read each question carefully and select the best answer for each one.</p>
                        {quizData.totalTime && (
                             <p>You will have <span className="font-bold">{formatTime(quizData.totalTime)}</span> to complete the quiz.</p>
                        )}
                        <p className="font-bold">Good luck!</p>
                    </CardContent>
                    <CardFooter>
                        <Button size="lg" className="w-full" onClick={() => setQuizState('in-progress')}>Start Quiz</Button>
                    </CardFooter>
                </Card>
            </motion.div>
        );
    }
    
    if (quizState === 'submitted') {
        const score = calculateScore();
        return (
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto space-y-8 my-8 p-4">
                <Card className="text-center">
                     <CardHeader>
                        <CardTitle className="text-4xl">Quiz Complete!</CardTitle>
                        <CardDescription>Here's how you did on the "{quizData.topic}" quiz.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-6xl font-bold">{score} / {quizData.mcqs.length}</p>
                        <p className="text-2xl text-muted-foreground mt-2">Your Score</p>
                    </CardContent>
                </Card>

                {isAnalyzing && (
                    <Card className="flex flex-col items-center justify-center p-8 space-y-4">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground">Analyzing your results...</p>
                    </Card>
                )}

                {analysis && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-3">
                                <Target className="h-6 w-6 text-green-500" />
                                <CardTitle>Strong Concepts</CardTitle>
                            </CardHeader>
                             <CardContent className="space-y-2 pl-9">
                                {analysis.strongConcepts.length > 0 ? analysis.strongConcepts.map((concept, i) => (
                                    <p key={i} className="text-muted-foreground">- {concept}</p>
                                )) : <p className="text-muted-foreground">No specific strong concepts identified.</p>}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-3">
                                 <BrainCircuit className="h-6 w-6 text-orange-500" />
                                <CardTitle>Areas for Improvement</CardTitle>
                            </CardHeader>
                             <CardContent className="space-y-2 pl-9">
                                {analysis.weakConcepts.length > 0 ? analysis.weakConcepts.map((concept, i) => (
                                    <p key={i} className="text-muted-foreground">- {concept}</p>
                                )) : <p className="text-muted-foreground">No specific areas for improvement identified. Great job!</p>}
                            </CardContent>
                        </Card>
                    </div>
                )}
                
                <Card>
                    <CardHeader>
                        <CardTitle>Question Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Accordion type="multiple" className="w-full">
                        {quizData.mcqs.map((mcq, index) => {
                            const userAnswer = userAnswers[index];
                            const isCorrect = userAnswer === mcq.correctAnswer;
                            const explanationData = analysis?.detailedExplanations.find(ex => ex.question === mcq.question);
                            const isBookmarked = bookmarkedTimestamps.has(index);

                            return (
                                <AccordionItem key={index} value={`item-${index}`} className="border-b-0 mb-2 last:mb-0">
                                    <div className="p-4 border rounded-lg">
                                        <div className="flex items-center justify-between">
                                             <p className="font-semibold">{index + 1}. {mcq.question}</p>
                                             {isCorrect ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
                                        </div>
                                        <div className="mt-2 text-sm space-y-1">
                                            <p className={isCorrect ? 'text-green-500' : 'text-red-500'}>
                                                Your answer: {userAnswer || 'Not answered'}
                                            </p>
                                            {!isCorrect && (
                                                <p className="text-muted-foreground">Correct answer: {mcq.correctAnswer}</p>
                                            )}
                                        </div>
                                        {explanationData && (
                                            <div className="flex items-center justify-start mt-2">
                                                <AccordionTrigger className="text-sm text-muted-foreground hover:no-underline p-0">
                                                    <div className="flex items-center gap-2">
                                                        <Lightbulb className="h-4 w-4" /> 
                                                        Show Explanation
                                                    </div>
                                                </AccordionTrigger>
                                            </div>
                                        )}
                                    </div>
                                    <AccordionContent>
                                        {explanationData && (
                                             <div className="p-4 bg-accent/50 rounded-b-lg mt-[-8px] border border-t-0">
                                                <div className="flex justify-end mb-2">
                                                     <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleBookmark(index, explanationData)}
                                                        disabled={isBookmarked}
                                                    >
                                                        <BookmarkIcon className={cn("mr-2 h-4 w-4", isBookmarked && "fill-current")}/>
                                                        {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                                                    </Button>
                                                </div>
                                                <p className="text-sm text-foreground">{explanationData.explanation}</p>
                                             </div>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })}
                        </Accordion>
                    </CardContent>
                </Card>

                <div className="text-center">
                    <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
                </div>
            </motion.div>
        );
    }
    
    const currentMcq = quizData.mcqs[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizData.mcqs.length) * 100;
    
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-4">
            <div className="w-full max-w-2xl space-y-6">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                   <p>Question {currentQuestionIndex + 1} of {quizData.mcqs.length}</p>
                   {timeLeft !== null && (
                        <div className="flex items-center gap-2 font-mono text-base font-semibold bg-secondary text-secondary-foreground px-3 py-1 rounded-full border">
                            <Clock className="h-4 w-4" />
                            <span>{formatTime(timeLeft)}</span>
                        </div>
                   )}
                   <div />
                </div>
                <Progress value={progress} />
                
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">{currentMcq.question}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup
                                    onValueChange={(value) => setSelectedAnswer(value)}
                                    value={selectedAnswer ?? ''}
                                    className="space-y-4"
                                >
                                    {currentMcq.options.map((option, i) => (
                                        <Label key={i} htmlFor={`q${currentQuestionIndex}-o${i}`} className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors hover:bg-accent has-[:checked]:bg-primary/20 has-[:checked]:border-primary">
                                            <RadioGroupItem value={option} id={`q${currentQuestionIndex}-o${i}`} />
                                            <span>{option}</span>
                                        </Label>
                                    ))}
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-end">
                    <Button size="lg" onClick={handleNextQuestion} disabled={!selectedAnswer}>
                        {currentQuestionIndex < quizData.mcqs.length - 1 ? 'Next Question' : 'Submit Quiz'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
