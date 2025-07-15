// src/components/onboarding/exams-step.tsx
'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExamSelection } from '@/components/exam-selection';

type ExamsStepProps = {
  onNext: (data: string[]) => void;
  initialValue?: string[];
};

export function ExamsStep({ onNext, initialValue = [] }: ExamsStepProps) {
  const [selectedExams, setSelectedExams] = useState<string[]>(initialValue);

  return (
    <Card className="w-full border-0 shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">What are you preparing for?</CardTitle>
        <CardDescription>
          Select all that apply. This helps us tailor your experience.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <ExamSelection
          selectedExams={selectedExams}
          onSelectionChange={setSelectedExams}
        />
        <Button
          size="lg"
          className="w-full max-w-xs mx-auto flex"
          onClick={() => onNext(selectedExams)}
          disabled={selectedExams.length === 0}
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}
