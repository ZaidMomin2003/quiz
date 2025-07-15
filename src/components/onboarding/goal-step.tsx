// src/components/onboarding/goal-step.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Rocket, Target, Star } from 'lucide-react';

type GoalStepProps = {
  onNext: (goal: string) => void;
  initialValue?: string;
};

const goals = [
  { id: 'ace-exams', title: 'Ace Exams', description: 'Prepare for specific tests and certifications.', icon: Target },
  { id: 'learn-skill', title: 'Learn a New Skill', description: 'Master new topics and expand your knowledge.', icon: Rocket },
  { id: 'just-for-fun', title: 'Just for Fun', description: 'Explore your curiosity and challenge yourself.', icon: Star },
];

export function GoalStep({ onNext, initialValue = '' }: GoalStepProps) {
  const [selectedGoal, setSelectedGoal] = useState(initialValue);

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">What's your primary goal?</CardTitle>
        <CardDescription>
          This will help us personalize your learning journey.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {goals.map((goal) => (
                <Card
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={cn(
                        'cursor-pointer transition-all hover:shadow-lg hover:border-primary',
                         selectedGoal === goal.id && 'border-primary ring-2 ring-primary bg-primary/10'
                    )}
                >
                    <CardContent className="flex flex-col items-center text-center p-6 gap-3">
                        <goal.icon className="h-8 w-8 text-primary" />
                        <h3 className="font-semibold">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
        <Button
          size="lg"
          className="w-full max-w-xs mx-auto flex"
          onClick={() => onNext(selectedGoal)}
          disabled={!selectedGoal}
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}
