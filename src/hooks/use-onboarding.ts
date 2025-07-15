// src/hooks/use-onboarding.ts
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './use-auth';

const ONBOARDING_STEPS = ['welcome', 'goal', 'exams', 'finish'];

type OnboardingData = {
  goal?: string;
  exams?: string[];
  completedSteps?: string[];
};

export function useOnboarding() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});

  const currentStep = pathname.split('/').pop() || 'welcome';
  const currentStepIndex = ONBOARDING_STEPS.indexOf(currentStep);

  useEffect(() => {
    if (user) {
      const storedData = localStorage.getItem(`onboarding_data_${user.email}`);
      if (storedData) {
        setOnboardingData(JSON.parse(storedData));
      } else {
         setOnboardingData({ completedSteps: [] });
      }
    }
  }, [user]);

  const updateOnboardingData = (newData: Partial<OnboardingData>) => {
    // Ensure completedSteps is an array and add the current step
    const completed = Array.isArray(onboardingData.completedSteps) ? onboardingData.completedSteps : [];
    const newCompletedSteps = completed.includes(currentStep) ? completed : [...completed, currentStep];

    const updatedData = { 
        ...onboardingData, 
        ...newData,
        completedSteps: newCompletedSteps,
    };
    
    setOnboardingData(updatedData);
    if (user) {
      localStorage.setItem(`onboarding_data_${user.email}`, JSON.stringify(updatedData));
    }
  };
  
  const goToNextStep = () => {
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex < ONBOARDING_STEPS.length) {
      router.push(`/onboarding/${ONBOARDING_STEPS[nextStepIndex]}`);
    }
  };

  const isStepCompleted = (step: string) => {
    return onboardingData.completedSteps?.includes(step) ?? false;
  };

  const progress = (currentStepIndex / (ONBOARDING_STEPS.length - 1)) * 100;

  return {
    onboardingData,
    updateOnboardingData,
    goToNextStep,
    isStepCompleted,
    currentStep,
    progress,
  };
}
