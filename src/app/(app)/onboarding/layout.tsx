// src/app/(app)/onboarding/layout.tsx
'use client';
import { Bot } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { useOnboarding } from "@/hooks/use-onboarding";

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    const { progress } = useOnboarding();

    return (
        <div className="flex flex-col min-h-screen">
             <header className="h-20 flex items-center px-4 md:px-6 border-b">
                <Link className="flex items-center gap-2 font-semibold" href="/">
                    <Bot className="h-6 w-6 text-primary" />
                    <span className="font-bold text-xl">QuizForge</span>
                </Link>
             </header>
             <main className="flex-1 flex flex-col items-center justify-center p-4 relative">
                 <div className="absolute top-0 left-0 right-0 h-1.5">
                    <Progress value={progress} className="h-full" />
                 </div>
                {children}
             </main>
        </div>
    )
}
