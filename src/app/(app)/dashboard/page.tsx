
// src/app/(app)/dashboard/page.tsx
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { generateMcqAction } from "@/app/actions";
import { Loader2, RefreshCw } from "lucide-react";
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
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<QuizHistoryItem[]>([]);
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
            setHistory(parsedHistory.sort((a, b) => b.timestamp - a.timestamp)); // Most recent first
            calculateStats(parsedHistory);
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

    const canGenerate = topic.trim().length > 1 && !isLoading;

    async function handleGenerateQuiz() {
        if (!canGenerate) return;
        setIsLoading(true);

        const result = await generateMcqAction({ topic, questionCount, difficulty });
        setIsLoading(false);

        if (result.error) {
            toast({ variant: "destructive", title: "Error", description: result.error });
        } else if (result.mcqs) {
            const quizData = { topic, difficulty, mcqs: result.mcqs };
            sessionStorage.setItem('currentQuiz', JSON.stringify(quizData));
            router.push('/quiz');
        }
    }

    function handleRetakeQuiz(quizToRetake: QuizHistoryItem) {
        const quizData = {
            topic: quizToRetake.topic,
            difficulty: quizToRetake.difficulty,
            mcqs: quizToRetake.mcqs,
        };
        sessionStorage.setItem('currentQuiz', JSON.stringify(quizData));
        router.push('/quiz');
    }
    
    return (
        <div className="flex flex-col gap-8">
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
                <CardHeader className="bg-[#8A2BE2] text-white rounded-t-lg">
                    <CardTitle>Create Your Next Challenge</CardTitle>
                    <CardDescription className="text-white/80">Fine-tune the details and generate the perfect quiz for your needs.</CardDescription>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                     <Button size="lg" className="w-full" style={{ backgroundColor: '#8A2BE2' }} disabled={!canGenerate} onClick={handleGenerateQuiz}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLoading ? 'Generating...' : 'Generate Quiz'}
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Quiz History</CardTitle>
                    <CardDescription>Review your past quizzes and retake them to improve.</CardDescription>
                </CardHeader>
                <CardContent>
                    {history.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Topic</TableHead>
                                    <TableHead>Difficulty</TableHead>
                                    <TableHead>Score</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {history.map((item) => (
                                    <TableRow key={item.timestamp}>
                                        <TableCell className="font-medium">{item.topic}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                item.difficulty === 'easy' ? 'secondary' : 
                                                item.difficulty === 'medium' ? 'outline' : 'destructive'
                                            } className="capitalize">{item.difficulty}</Badge>
                                        </TableCell>
                                        <TableCell>{item.score} / {item.totalQuestions}</TableCell>
                                        <TableCell>{new Date(item.timestamp).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" onClick={() => handleRetakeQuiz(item)}>
                                                <RefreshCw className="mr-2 h-4 w-4" />
                                                Retake
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-center text-muted-foreground py-8">You haven't taken any quizzes yet. Generate one above to get started!</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
