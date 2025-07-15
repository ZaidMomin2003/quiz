// src/app/(app)/dashboard/page.tsx
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

export default function DashboardPage() {
    const chartData = [
        { date: "Mon", solved: 5 },
        { date: "Tue", solved: 8 },
        { date: "Wed", solved: 3 },
        { date: "Thu", solved: 10 },
        { date: "Fri", solved: 6 },
        { date: "Sat", solved: 12 },
        { date: "Sun", solved: 7 },
    ];
    
    const chartConfig = {
      solved: {
        label: "Quizzes Solved",
        color: "hsl(var(--primary))",
      },
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
             <Card>
                <CardHeader>
                    <CardTitle>Weekly Progress</CardTitle>
                    <CardDescription>Number of quizzes solved per day.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <BarChart accessibilityLayer data={chartData}>
                           <CartesianGrid vertical={false} />
                           <XAxis
                             dataKey="date"
                             tickLine={false}
                             tickMargin={10}
                             axisLine={false}
                           />
                           <ChartTooltip
                             content={<ChartTooltipContent />}
                           />
                           <Bar dataKey="solved" fill="var(--color-solved)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}
