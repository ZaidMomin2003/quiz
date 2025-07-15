// src/app/quiz/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Mcq } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { analyzeQuizAction } from '../actions';
import { CheckCircle, XCircle, BrainCircuit, Target, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type QuizData = {
    topic: string;
    mcqs: Mcq[];
};

type Analysis = {
    strongConcepts: string[];
    weakConcepts: string[];
};

export default function QuizPage() {
    const router = useRouter();
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [quizState, setQuizState] = useState<'instructions' | 'in-progress' | 'submitted'>('instructions');
    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);


    useEffect(() => {
        const storedData = sessionStorage.getItem('currentQuiz');
        if (storedData) {
            try {
                setQuizData(JSON.parse(storedData));
            } catch (error) {
                console.error("Failed to parse quiz data from session storage", error);
                router.push('/dashboard');
            }
        } else {
            // If no quiz data is found, redirect to dashboard
            router.push('/dashboard');
        }
    }, [router]);

    const handleNextQuestion = async () => {
        if (selectedAnswer) {
            const newAnswers = { ...userAnswers, [currentQuestionIndex]: selectedAnswer };
            setUserAnswers(newAnswers);
            setSelectedAnswer(null);

            if (currentQuestionIndex < quizData!.mcqs.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                setQuizState('submitted');
                setIsAnalyzing(true);
                const result = await analyzeQuizAction({
                    questions: quizData!.mcqs.map(mcq => ({
                        question: mcq.question,
                        options: mcq.options,
                        correctAnswer: mcq.correctAnswer,
                    })),
                    userAnswers: newAnswers
                });
                if (result.analysis) {
                    setAnalysis(result.analysis);
                }
                setIsAnalyzing(false);
            }
        }
    };
    
    const calculateScore = () => {
        if (!quizData) return 0;
        return quizData.mcqs.reduce((score, mcq, index) => {
            return userAnswers[index] === mcq.correctAnswer ? score + 1 : score;
        }, 0);
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
                        <p>Your results and a personalized concept analysis will be provided at the end.</p>
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
                    <CardContent className="space-y-6">
                        {quizData.mcqs.map((mcq, index) => (
                            <div key={index} className="p-4 border rounded-lg">
                                <p className="font-semibold">{index + 1}. {mcq.question}</p>
                                <div className="mt-2 text-sm space-y-1">
                                    <p className={userAnswers[index] === mcq.correctAnswer ? 'text-green-500' : 'text-red-500'}>
                                        Your answer: {userAnswers[index]} {userAnswers[index] === mcq.correctAnswer ? <CheckCircle className="inline h-4 w-4 ml-1" /> : <XCircle className="inline h-4 w-4 ml-1" />}
                                    </p>
                                    {userAnswers[index] !== mcq.correctAnswer && (
                                        <p className="text-muted-foreground">Correct answer: {mcq.correctAnswer}</p>
                                    )}
                                </div>
                            </div>
                        ))}
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
                <div>
                   <p className="text-center text-muted-foreground text-sm mb-2">Question {currentQuestionIndex + 1} of {quizData.mcqs.length}</p>
                   <Progress value={progress} />
                </div>
                
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
