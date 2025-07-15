// src/components/onboarding/finish-step.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, PartyPopper } from 'lucide-react';

export function FinishStep() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      localStorage.setItem(`onboarding_complete_${user.email}`, 'true');
    }
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 2000); 

    return () => clearTimeout(timer);
  }, [user, router]);

  return (
    <Card className="w-full max-w-md border-0 shadow-none text-center">
      <CardHeader>
        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4 text-primary">
            <PartyPopper className="h-10 w-10" />
        </div>
        <CardTitle className="text-3xl">You're All Set!</CardTitle>
        <CardDescription>
          We've personalized your experience. Get ready to start learning.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Redirecting to your dashboard...</p>
      </CardContent>
    </Card>
  );
}
