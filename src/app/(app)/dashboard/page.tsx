// src/app/(app)/dashboard/page.tsx
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateMcqAction, generateFromConceptsAction } from "@/app/actions";
import { Loader2, BrainCircuit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import type { QuizHistoryItem } from '@/lib/types';

type DashboardStats = {
    quizzesTaken: number;
    correctRatio: number;
    averageScore: string;
    totalQuestionsAttempted: number;
};

export default function DashboardPage() {
    const [topic, setTopic] = useState('');
    const [questionCount, setQuestionCount] = useState(5);
    const [timePerQuestion, setTimePerQuestion] = useState(1);
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
    const [isLoading, setIsLoading] = useState(false);
    const [isWeaknessLoading, setIsWeaknessLoading] = useState(false);
    const [weakConcepts, setWeakConcepts] = useState<string[]>([]);
    const [stats, setStats] = useState<DashboardStats>({
        quizzesTaken: 0,
        correctRatio: 0,
        averageScore: '0/0',
        totalQuestionsAttempted: 0,
    });
    
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        const storedHistory = localStorage.getItem('quizHistory');
        if (storedHistory) {
            const parsedHistory: QuizHistoryItem[] = JSON.parse(storedHistory);
            calculateStats(parsedHistory);
        }
        
        const storedWeakConcepts = localStorage.getItem('weakConcepts');
        if (storedWeakConcepts) {
            setWeakConcepts(JSON.parse(storedWeakConcepts));
        }

    }, []);

    const calculateStats = (historyItems: QuizHistoryItem[]) => {
        if (historyItems.length === 0) {
            setStats({ quizzesTaken: 0, correctRatio: 0, averageScore: '0/0', totalQuestionsAttempted: 0});
            return;
        }

        const totalQuizzes = historyItems.length;
        const totalCorrect = historyItems.reduce((acc, item) => acc + item.score, 0);
        const totalQuestionsInHistory = historyItems.reduce((acc, item) => acc + item.totalQuestions, 0);

        const correctRatio = totalQuestionsInHistory > 0 ? Math.round((totalCorrect / totalQuestionsInHistory) * 100) : 0;
        
        const avgScore = totalCorrect / totalQuizzes;
        const avgTotal = totalQuestionsInHistory / totalQuizzes;
        const averageScore = `${avgScore.toFixed(1)}/${avgTotal.toFixed(1)}`;
        
        const uniqueQuestions = new Set<string>();
        historyItems.forEach(item => {
            item.mcqs.forEach(mcq => uniqueQuestions.add(mcq.question));
        });

        setStats({
            quizzesTaken: totalQuizzes,
            correctRatio,
            averageScore,
            totalQuestionsAttempted: uniqueQuestions.size,
        });
    };

    const canGenerate = topic.trim().length > 1 && !isLoading && !isWeaknessLoading;

    async function handleGenerateQuiz() {
        if (!canGenerate) return;
        setIsLoading(true);

        const result = await generateMcqAction({ topic, questionCount, difficulty });
        setIsLoading(false);

        if (result.error) {
            toast({ variant: "destructive", title: "Error", description: result.error });
        } else if (result.mcqs) {
            const totalTimeInSeconds = questionCount * timePerQuestion * 60;
            const quizData = { 
                topic, 
                difficulty, 
                mcqs: result.mcqs,
                totalTime: totalTimeInSeconds,
            };
            sessionStorage.setItem('currentQuiz', JSON.stringify(quizData));
            router.push('/quiz');
        }
    }

    async function handlePracticeWeaknesses() {
        if (weakConcepts.length === 0 || isWeaknessLoading) return;
        setIsWeaknessLoading(true);

        const result = await generateFromConceptsAction({
            concepts: weakConcepts,
            questionCount: 5, // Or make this configurable
        });

        setIsWeaknessLoading(false);
        if (result.error) {
             toast({ variant: "destructive", title: "Error", description: result.error });
        } else if (result.mcqs) {
            const quizData = {
                topic: "Practice Your Weaknesses",
                difficulty: 'medium' as 'easy' | 'medium' | 'hard',
                mcqs: result.mcqs,
                totalTime: 5 * 1 * 60 // 5 questions, 1 minute each
            };
            sessionStorage.setItem('currentQuiz', JSON.stringify(quizData));
            router.push('/quiz');
        }
    }
    
    return (
        <div className="flex flex-col gap-8 w-full">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Quizzes Taken</CardTitle>
                        <CardDescription>Total quizzes you've completed.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{stats.quizzesTaken}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Questions</CardTitle>
                        <CardDescription>Unique questions you've attempted.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{stats.totalQuestionsAttempted}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Correct Answers</CardTitle>
                        <CardDescription>Overall percentage of correct answers.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{stats.correctRatio}%</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Average Score</CardTitle>
                        <CardDescription>Your average score across all quizzes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{stats.averageScore}</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                    <CardTitle>Create Your Next Challenge</CardTitle>
                    <CardDescription className="text-primary-foreground/80">Fine-tune the details and generate the perfect quiz for your needs.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div className="space-y-2">
                        <Label htmlFor="topic-input">What topic do you want to practice today?</Label>
                        <Input 
                            id="topic-input"
                            placeholder="e.g., The Renaissance, JavaScript Promises, or Quantum Physics" 
                            className="flex-grow"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="question-count">Number of Questions</Label>
                             <Input 
                                id="question-count"
                                type="number"
                                value={questionCount}
                                onChange={(e) => setQuestionCount(Math.min(10, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                                min={1}
                                max={10}
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="time-per-question">Time per question (mins)</Label>
                             <Input 
                                id="time-per-question"
                                type="number"
                                value={timePerQuestion}
                                onChange={(e) => setTimePerQuestion(Math.min(5, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                                min={1}
                                max={5}
                            />
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="difficulty">Difficulty</Label>
                             <Select value={difficulty} onValueChange={(value) => setDifficulty(value as 'easy' | 'medium' | 'hard')}>
                                <SelectTrigger id="difficulty">
                                    <SelectValue placeholder="Select difficulty" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="easy">Easy</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="hard">Hard</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <Button size="lg" className="w-full" disabled={!canGenerate} onClick={handleGenerateQuiz}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLoading ? 'Generating...' : 'Generate Quiz'}
                    </Button>
                </CardContent>
            </Card>
            
            {weakConcepts.length > 0 && (
                 <Card className="bg-amber-500/10 border-amber-500/30">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                             <BrainCircuit className="h-8 w-8 text-amber-400" />
                            <div>
                                <CardTitle>Practice Your Weaknesses</CardTitle>
                                <CardDescription className="text-foreground/80">We've identified some areas you can work on. Take a custom quiz to improve!</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Button 
                            className="w-full bg-amber-500 hover:bg-amber-500/90 text-background" 
                            onClick={handlePracticeWeaknesses} 
                            disabled={isWeaknessLoading || isLoading}
                        >
                             {isWeaknessLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                             {isWeaknessLoading ? 'Building Your Quiz...' : 'Generate Practice Quiz'}
                        </Button>
                    </CardContent>
                </Card>
            )}

        </div>
    );
}
