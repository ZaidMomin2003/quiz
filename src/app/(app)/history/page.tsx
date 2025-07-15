
// src/app/(app)/history/page.tsx
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import type { QuizHistoryItem } from '@/lib/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function HistoryPage() {
    const [history, setHistory] = useState<QuizHistoryItem[]>([]);
    const router = useRouter();

    useEffect(() => {
        const storedHistory = localStorage.getItem('quizHistory');
        if (storedHistory) {
            const parsedHistory: QuizHistoryItem[] = JSON.parse(storedHistory);
            setHistory(parsedHistory.sort((a, b) => b.timestamp - a.timestamp)); // Most recent first
        }
    }, []);

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
        <div className="flex flex-col gap-8 w-full">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Quiz History</h1>
            
            <Card>
                <CardHeader>
                    <CardTitle>Your Past Quizzes</CardTitle>
                    <CardDescription>Review your past quizzes and retake them to improve.</CardDescription>
                </CardHeader>
                <CardContent>
                    {history.length > 0 ? (
                        <div className="w-full overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Topic</TableHead>
                                        <TableHead className="hidden md:table-cell">Difficulty</TableHead>
                                        <TableHead>Score</TableHead>
                                        <TableHead className="hidden md:table-cell">Date</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {history.map((item) => (
                                        <TableRow key={item.timestamp}>
                                            <TableCell className="font-medium">{item.topic}</TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <Badge variant={
                                                    item.difficulty === 'easy' ? 'secondary' : 
                                                    item.difficulty === 'medium' ? 'outline' : 'destructive'
                                                } className="capitalize">{item.difficulty}</Badge>
                                            </TableCell>
                                            <TableCell>{item.score} / {item.totalQuestions}</TableCell>
                                            <TableCell className="hidden md:table-cell">{new Date(item.timestamp).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="hidden md:block">
                                                    <Button variant="ghost" size="sm" onClick={() => handleRetakeQuiz(item)}>
                                                        <RefreshCw className="mr-2 h-4 w-4" />
                                                        Retake
                                                    </Button>
                                                </div>
                                                <div className="md:hidden">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">More</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Details</DropdownMenuLabel>
                                                            <DropdownMenuItem>
                                                                <span className="font-semibold mr-2">Difficulty:</span>
                                                                <Badge variant={
                                                                    item.difficulty === 'easy' ? 'secondary' : 
                                                                    item.difficulty === 'medium' ? 'outline' : 'destructive'
                                                                } className="capitalize">{item.difficulty}</Badge>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <span className="font-semibold mr-2">Date:</span>
                                                                {new Date(item.timestamp).toLocaleDateString()}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem onClick={() => handleRetakeQuiz(item)}>
                                                                <RefreshCw className="mr-2 h-4 w-4" />
                                                                Retake
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground py-8">You haven't taken any quizzes yet. Your history will appear here.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
