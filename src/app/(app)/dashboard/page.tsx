// src/app/(app)/dashboard/page.tsx
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
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
        </div>
    );
}
