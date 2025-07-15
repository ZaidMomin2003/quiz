// src/app/(app)/onboarding/[step]/page.tsx
'use client';
import { useRouter, useParams } from 'next/navigation';
import { useOnboarding } from '@/hooks/use-onboarding';
import { WelcomeStep } from '@/components/onboarding/welcome-step';
import { GoalStep } from '@/components/onboarding/goal-step';
import { YearStep } from '@/components/onboarding/year-step';
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
    isStepCompleted,
  } = useOnboarding();

 useEffect(() => {
    // This effect ensures that we only render the step component after verifying access rights.
    // It prevents navigation calls during the render phase.
    if (step === 'goal' && !isStepCompleted('welcome')) {
      router.replace('/onboarding/welcome');
    } else if (step === 'year' && !isStepCompleted('goal')) {
        router.replace('/onboarding/goal');
    } else if (step === 'exams' && !isStepCompleted('year')) {
      router.replace('/onboarding/year');
    } else if (step === 'finish' && !isStepCompleted('exams')) {
      router.replace('/onboarding/exams');
    } else if (step && !['welcome', 'goal', 'year', 'exams', 'finish'].includes(step)) {
      router.replace('/onboarding/welcome');
    } else {
        setIsReady(true);
    }
  }, [step, isStepCompleted, router, onboardingData]);


  const handleNext = (data: any) => {
    // Only update the data. The hook will handle navigation.
    updateOnboardingData(data);
  };
  
  const handleWelcomeNext = () => {
    updateOnboardingData({}); // Mark welcome as complete
  }

  const renderStep = () => {
    if (!isReady) {
        return null; // Render nothing while we verify the step access
    }

    switch (step) {
      case 'welcome':
        return <WelcomeStep onNext={handleWelcomeNext} />;
      case 'goal':
        return (
          <GoalStep
            onNext={(data) => handleNext({ goal: data })}
            initialValue={onboardingData.goal}
          />
        );
       case 'year':
        return (
            <YearStep
                onNext={(data) => handleNext({ year: data })}
                initialValue={onboardingData.year}
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
        // Let the useEffect handle redirection for invalid steps
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
        {renderStep()}
    </div>
  );
}
