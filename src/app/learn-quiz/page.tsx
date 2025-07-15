// src/app/learn-quiz/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { LearnMcq } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Lightbulb, Loader2, PartyPopper } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type LearnQuizData = {
    topic: string;
    mcqs: LearnMcq[];
};

export default function LearnQuizPage() {
    const router = useRouter();
    const [quizData, setQuizData] = useState<LearnQuizData | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [quizState, setQuizState] = useState<'loading' | 'active' | 'finished'>('loading');

    useEffect(() => {
        const storedData = sessionStorage.getItem('learnQuiz');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                setQuizData(parsedData);
                setQuizState('active');
            } catch (error) {
                console.error("Failed to parse learn quiz data", error);
                router.push('/learn');
            }
        } else {
            router.push('/learn');
        }
    }, [router]);
    
    if (quizState === 'loading' || !quizData) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }
    
    const currentMcq = quizData.mcqs[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentMcq.correctAnswer;

    const handleAnswerSubmit = () => {
        if (!selectedAnswer) return;
        setIsAnswered(true);
        if (isCorrect) {
            setCorrectCount(correctCount + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.mcqs.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            setQuizState('finished');
        }
    };
    
    if (quizState === 'finished') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-4"
            >
                <Card className="max-w-md w-full">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4 text-primary">
                            <PartyPopper className="h-10 w-10" />
                        </div>
                        <CardTitle className="text-3xl">Lesson Complete!</CardTitle>
                        <CardDescription>You've finished the lesson on "{quizData.topic}".</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-5xl font-bold">{correctCount} / {quizData.mcqs.length}</p>
                        <p className="text-xl text-muted-foreground mt-2">Correct Answers</p>
                    </CardContent>
                    <CardFooter className="flex-col gap-4">
                        <Button size="lg" className="w-full" onClick={() => router.push('/learn')}>Learn a New Topic</Button>
                        <Button size="lg" variant="outline" className="w-full" onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
                    </CardFooter>
                </Card>
            </motion.div>
        );
    }

    const progress = ((currentQuestionIndex + 1) / quizData.mcqs.length) * 100;
    
    return (
        <div className="flex flex-col items-center justify-start min-h-[calc(100vh-10rem)] p-4 pt-8 md:pt-12">
            <div className="w-full max-w-3xl space-y-6">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-muted-foreground text-sm">Question {currentQuestionIndex + 1} of {quizData.mcqs.length}</p>
                        <Badge variant={
                            currentMcq.difficulty === 'easy' ? 'secondary' : 
                            currentMcq.difficulty === 'medium' ? 'outline' : 'destructive'
                        } className="capitalize">{currentMcq.difficulty}</Badge>
                    </div>
                   <Progress value={progress} />
                </div>
                
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl leading-snug">{currentMcq.question}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup
                                    onValueChange={(value) => setSelectedAnswer(value)}
                                    value={selectedAnswer ?? ''}
                                    disabled={isAnswered}
                                    className="space-y-4"
                                >
                                    {currentMcq.options.map((option, i) => {
                                        const isSelected = selectedAnswer === option;
                                        const isTheCorrectAnswer = currentMcq.correctAnswer === option;

                                        return (
                                        <Label key={i} htmlFor={`q-o-${i}`} className={cn(
                                            "flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all",
                                            !isAnswered && "hover:bg-accent",
                                            isAnswered && isTheCorrectAnswer && "border-green-500 bg-green-500/10",
                                            isAnswered && isSelected && !isTheCorrectAnswer && "border-red-500 bg-red-500/10",
                                            isAnswered && !isSelected && "opacity-60",
                                        )}>
                                            <RadioGroupItem value={option} id={`q-o-${i}`} className="hidden" />
                                            <span>{option}</span>
                                            {isAnswered && isTheCorrectAnswer && <CheckCircle className="ml-auto h-5 w-5 text-green-500" />}
                                            {isAnswered && isSelected && !isTheCorrectAnswer && <XCircle className="ml-auto h-5 w-5 text-red-500" />}
                                        </Label>
                                    )})}
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence>
                {isAnswered && (
                    <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className={cn("border-t-4", isCorrect ? "border-green-500" : "border-red-500")}>
                             <CardHeader className="flex-row items-center gap-4">
                                <div className={cn("p-2 rounded-full", isCorrect ? "bg-green-500/10" : "bg-red-500/10")}>
                                    <Lightbulb className={cn("h-6 w-6", isCorrect ? "text-green-500" : "text-red-500")} />
                                </div>
                                <CardTitle>{isCorrect ? "Correct!" : "Not Quite"}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{currentMcq.explanation}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
                </AnimatePresence>

                <div className="flex justify-end">
                    {!isAnswered ? (
                        <Button size="lg" onClick={handleAnswerSubmit} disabled={!selectedAnswer}>
                            Check Answer
                        </Button>
                    ) : (
                        <Button size="lg" onClick={handleNextQuestion}>
                            {currentQuestionIndex < quizData.mcqs.length - 1 ? 'Next Question' : 'Finish Lesson'}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
