// src/app/(app)/onboarding/[step]/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/hooks/use-onboarding';
import { WelcomeStep } from '@/components/onboarding/welcome-step';
import { GoalStep } from '@/components/onboarding/goal-step';
import { ExamsStep } from '@/components/onboarding/exams-step';
import { FinishStep } from '@/components/onboarding/finish-step';

export default function OnboardingStepPage({ params }: { params: { step: string } }) {
  const router = useRouter();
  const { step } = params;
  const {
    onboardingData,
    updateOnboardingData,
    goToNextStep,
    isStepCompleted,
  } = useOnboarding();

  const handleNext = (data: any) => {
    updateOnboardingData(data);
    goToNextStep();
  };

  const renderStep = () => {
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
        if (!isStepCompleted('goal')) {
            router.replace('/onboarding/goal');
            return null;
        }
        return (
          <ExamsStep
            onNext={(data) => handleNext({ exams: data })}
            initialValue={onboardingData.exams}
          />
        );
      case 'finish':
         if (!isStepCompleted('exams')) {
            router.replace('/onboarding/exams');
            return null;
        }
        return <FinishStep />;
      default:
        router.replace('/onboarding/welcome');
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
        {renderStep()}
    </div>
  );
}
