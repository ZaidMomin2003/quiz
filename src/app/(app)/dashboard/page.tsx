
// src/app/(app)/dashboard/page.tsx
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

export default function DashboardPage() {
    const [topic, setTopic] = useState('');

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
            <Card>
                <CardHeader>
                    <CardTitle>Start a New Quiz</CardTitle>
                    <CardDescription>What topic do you want to practice today?</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Input 
                            placeholder="e.g., The Renaissance" 
                            className="flex-grow"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                        <Button asChild>
                            <Link href={`/practice-quiz?topic=${encodeURIComponent(topic)}`}>
                                Generate Quiz
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
