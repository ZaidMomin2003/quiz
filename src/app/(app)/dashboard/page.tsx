
// src/app/(app)/dashboard/page.tsx
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import type { ChartConfig } from '@/components/ui/chart';

const chartData = [
  { day: 'Mon', score: 88 },
  { day: 'Tue', score: 78 },
  { day: 'Wed', score: 92 },
  { day: 'Thu', score: 85 },
  { day: 'Fri', score: 90 },
  { day: 'Sat', score: 82 },
  { day: 'Sun', score: 95 },
];

const chartConfig = {
  score: {
    label: 'Score',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function DashboardPage() {
    return (
        <div className="space-y-6">
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

            {/* Progress Chart Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Weekly Progress</CardTitle>
                    <CardDescription>Your quiz scores over the last week.</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="w-full overflow-x-auto">
                        <div className="h-[350px]" style={{minWidth: '600px'}}>
                            <ChartContainer config={chartConfig} className="w-full h-full">
                                <AreaChart
                                    data={chartData}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06D6A0" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#06D6A0" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                                    <YAxis tickLine={false} axisLine={false} domain={[0, 100]} />
                                    <Tooltip
                                        cursor={{ stroke: '#06D6A0', strokeWidth: 2, strokeDasharray: '5 5' }}
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 px-3 backdrop-blur-sm bg-background/50">
                                                        <p className="text-sm font-bold">{`${payload[0].value}%`}</p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="score"
                                        strokeWidth={3}
                                        stroke="#06D6A0"
                                        fillOpacity={1}
                                        fill="url(#colorScore)"
                                        dot={{
                                          r: 6,
                                          stroke: '#06D6A0',
                                          fill: 'hsl(var(--background))',
                                          strokeWidth: 2,
                                        }}
                                        activeDot={{
                                          r: 8,
                                          stroke: 'hsl(var(--background))',
                                          fill: '#06D6A0',
                                          strokeWidth: 2,
                                          style: {
                                            filter: 'drop-shadow(0 0 5px #06D6A0)',
                                          }
                                        }}
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
