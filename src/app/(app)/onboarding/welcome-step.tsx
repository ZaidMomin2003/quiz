// src/components/onboarding/welcome-step.tsx
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

type WelcomeStepProps = {
  onNext: () => void;
};

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  const { user } = useAuth();
  return (
    <Card className="w-full max-w-lg border-0 shadow-none text-center">
      <CardHeader>
        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4 text-primary">
            <Bot className="h-10 w-10" />
        </div>
        <CardTitle className="text-3xl">Welcome to QuizForge, {user?.name || 'there'}!</CardTitle>
        <CardDescription>
          Let's quickly set up your account to personalize your experience.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button size="lg" onClick={onNext}>
            Let's Go!
        </Button>
      </CardContent>
    </Card>
  );
}
