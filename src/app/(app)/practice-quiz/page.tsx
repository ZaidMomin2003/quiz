// src/app/(app)/practice-quiz/page.tsx
'use client';
import { QuizGenerator } from "@/components/quiz-generator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PracticeQuizPage() {
  return (
    <div>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>AI Quiz Generator</CardTitle>
          <CardDescription>
            Enter a topic, and the AI will generate a set of multiple-choice questions for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QuizGenerator />
        </CardContent>
      </Card>
    </div>
  );
}
