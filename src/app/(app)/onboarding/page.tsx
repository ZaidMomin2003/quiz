// src/app/(app)/onboarding/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExamSelection } from '@/components/exam-selection';
import { useAuth } from '@/hooks/use-auth';

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedExams, setSelectedExams] = useState<string[]>([]);

  const handleFinishOnboarding = () => {
    if (user) {
      // Save onboarding info to localStorage
      localStorage.setItem(`onboarding_complete_${user.email}`, 'true');
      localStorage.setItem(`user_exams_${user.email}`, JSON.stringify(selectedExams));
    }
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Welcome to QuizForge!</CardTitle>
          <CardDescription>
            Let's personalize your experience. What are you preparing for?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <ExamSelection
            selectedExams={selectedExams}
            onSelectionChange={setSelectedExams}
          />
          <Button
            size="lg"
            className="w-full"
            onClick={handleFinishOnboarding}
            disabled={selectedExams.length === 0}
          >
            Continue to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
