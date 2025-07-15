'use client';
import { QuizGenerator } from "@/components/quiz-generator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { LoginForm } from "@/components/login-form";

export default function QuizPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto py-12 flex justify-center">
        <div className="w-full max-w-md">
           <Card>
            <CardHeader>
              <CardTitle>Please Sign In</CardTitle>
              <CardDescription>You need to be logged in to create a quiz.</CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <Card className="max-w-2xl mx-auto">
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
