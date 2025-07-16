// src/hooks/use-onboarding.ts
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './use-auth';

const ONBOARDING_STEPS = ['welcome', 'goal', 'year', 'exams', 'finish'];

type OnboardingData = {
  goal?: string;
  year?: string;
  exams?: string[];
  completedSteps?: string[];
};

export function useOnboarding() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({ completedSteps: [] });
  const previousCompletedSteps = useRef<string[]>([]);

  const currentStep = pathname.split('/').pop() || 'welcome';
  const currentStepIndex = ONBOARDING_STEPS.indexOf(currentStep);

  useEffect(() => {
    if (user && user.email) {
      const storedData = localStorage.getItem(`onboarding_data_${user.email}`);
      if (storedData) {
        const data = JSON.parse(storedData);
        setOnboardingData(data);
        previousCompletedSteps.current = data.completedSteps || [];
      } else {
         setOnboardingData({ completedSteps: [] });
         previousCompletedSteps.current = [];
      }
    }
  }, [user]);
  
  // This effect handles navigation when a step is completed.
  useEffect(() => {
    const currentCompleted = onboardingData.completedSteps || [];
    const prevCompleted = previousCompletedSteps.current;

    // Check if a new step has been added
    if (currentCompleted.length > prevCompleted.length) {
      const lastCompletedStep = currentCompleted[currentCompleted.length - 1];

      if(lastCompletedStep) {
         const nextStepIndex = ONBOARDING_STEPS.indexOf(lastCompletedStep) + 1;
        if (nextStepIndex < ONBOARDING_STEPS.length) {
          router.push(`/onboarding/${ONBOARDING_STEPS[nextStepIndex]}`);
        }
      }
    }

    previousCompletedSteps.current = currentCompleted;

  }, [onboardingData.completedSteps, router]);

  const updateOnboardingData = (newData: Partial<OnboardingData>) => {
    if (!user || !user.email) return;

    const currentData = JSON.parse(localStorage.getItem(`onboarding_data_${user.email}`) || '{ "completedSteps": [] }');
    const completed = currentData.completedSteps || [];
    const newCompletedSteps = completed.includes(currentStep) ? completed : [...completed, currentStep];

    const updatedData = { 
        ...currentData, 
        ...newData,
        completedSteps: newCompletedSteps,
    };
    
    setOnboardingData(updatedData);
    localStorage.setItem(`onboarding_data_${user.email}`, JSON.stringify(updatedData));
  };
  
  const isStepCompleted = (step: string) => {
    return onboardingData.completedSteps?.includes(step) ?? false;
  };

  const progress = (currentStepIndex / (ONBOARDING_STEPS.length - 1)) * 100;

  return {
    onboardingData,
    updateOnboardingData,
    isStepCompleted,
    currentStep,
    progress,
  };
}
