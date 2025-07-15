// src/app/(app)/dashboard/page.tsx
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateMcqAction } from "@/app/actions";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const [topic, setTopic] = useState('');
    const [questionCount, setQuestionCount] = useState(5);
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const canGenerate = topic.trim().length > 1 && !isLoading;

    async function handleGenerateQuiz() {
        if (!canGenerate) return;

        setIsLoading(true);

        const result = await generateMcqAction({
            topic,
            questionCount,
            difficulty,
        });

        setIsLoading(false);

        if (result.error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.error,
            });
        } else if (result.mcqs) {
            // Store quiz data in session storage to pass to the quiz page
            const quizData = {
                topic,
                mcqs: result.mcqs,
            };
            sessionStorage.setItem('currentQuiz', JSON.stringify(quizData));
            router.push('/quiz');
        }
    }
    
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
            
            {/* Analytics Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Quizzes Generated</CardTitle>
                        <CardDescription>Total quizzes you've created.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">12</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Correct Answers</CardTitle>
                        <CardDescription>Ratio of correct to incorrect answers.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">78%</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Average Score</CardTitle>
                        <CardDescription>Your average score across all quizzes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">8/10</p>
                    </CardContent>
                </Card>
            </div>

            {/* Start Quiz Section */}
            <Card className="relative shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow duration-300">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur-sm opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                <CardHeader className="relative">
                    <CardTitle>Create Your Next Challenge</CardTitle>
                    <CardDescription>Fine-tune the details and generate the perfect quiz for your needs.</CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-6">
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
                     <Button size="lg" className="w-full" disabled={!canGenerate} onClick={handleGenerateQuiz}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLoading ? 'Generating...' : 'Generate Quiz'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}