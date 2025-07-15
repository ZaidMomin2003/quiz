// src/components/onboarding/year-step.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar, Repeat, User } from 'lucide-react';

type YearStepProps = {
  onNext: (year: string) => void;
  initialValue?: string;
};

const years = [
  { id: 'first-year', title: 'First Year', description: 'Just starting my journey.', icon: User },
  { id: 'second-year', title: 'Second Year', description: 'Building on my knowledge.', icon: Calendar },
  { id: 'repeater', title: 'Repeater', description: 'Aiming for the top score.', icon: Repeat },
];

export function YearStep({ onNext, initialValue = '' }: YearStepProps) {
  const [selectedYear, setSelectedYear] = useState(initialValue);

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Which year are you in?</CardTitle>
        <CardDescription>
          This helps us understand your preparation stage.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {years.map((year) => (
                <Card
                    key={year.id}
                    onClick={() => setSelectedYear(year.id)}
                    className={cn(
                        'cursor-pointer transition-all hover:shadow-lg hover:border-primary',
                         selectedYear === year.id && 'border-primary ring-2 ring-primary bg-primary/10'
                    )}
                >
                    <CardContent className="flex flex-col items-center text-center p-6 gap-3">
                        <year.icon className="h-8 w-8 text-primary" />
                        <h3 className="font-semibold">{year.title}</h3>
                        <p className="text-sm text-muted-foreground">{year.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
        <Button
          size="lg"
          className="w-full max-w-xs mx-auto flex"
          onClick={() => onNext(selectedYear)}
          disabled={!selectedYear}
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}
