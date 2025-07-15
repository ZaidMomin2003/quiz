// src/app/(app)/onboarding/[step]/page.tsx
'use client';
import { useRouter, useParams } from 'next/navigation';
import { useOnboarding } from '@/hooks/use-onboarding';
import { WelcomeStep } from '@/components/onboarding/welcome-step';
import { GoalStep } from '@/components/onboarding/goal-step';
import { ExamsStep } from '@/components/onboarding/exams-step';
import { FinishStep } from '@/components/onboarding/finish-step';
import { useEffect, useState } from 'react';

export default function OnboardingStepPage() {
  const router = useRouter();
  const params = useParams();
  const step = Array.isArray(params.step) ? params.step[0] : params.step;
  const [isReady, setIsReady] = useState(false);
  const {
    onboardingData,
    updateOnboardingData,
    goToNextStep,
    isStepCompleted,
  } = useOnboarding();

  useEffect(() => {
    // Check if user is trying to access a step prematurely
    if (step === 'exams' && !isStepCompleted('goal')) {
      router.replace('/onboarding/goal');
    } else if (step === 'finish' && !isStepCompleted('exams')) {
      router.replace('/onboarding/exams');
    } else {
        setIsReady(true);
    }
  }, [step, isStepCompleted, router]);


  const handleNext = (data: any) => {
    updateOnboardingData(data);
    goToNextStep();
  };

  const renderStep = () => {
    if (!isReady) {
        return null; // Render nothing while we verify the step access
    }

    switch (step) {
      case 'welcome':
        return <WelcomeStep onNext={() => goToNextStep()} />;
      case 'goal':
        return (
          <GoalStep
            onNext={(data) => handleNext({ goal: data })}
            initialValue={onboardingData.goal}
          />
        );
      case 'exams':
        return (
          <ExamsStep
            onNext={(data) => handleNext({ exams: data })}
            initialValue={onboardingData.exams}
          />
        );
      case 'finish':
        return <FinishStep />;
      default:
        // This handles invalid steps by redirecting to the start.
        // It's placed here to avoid a render-loop with useEffect.
        if (isReady) {
          router.replace('/onboarding/welcome');
        }
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
        {renderStep()}
    </div>
  );
}
