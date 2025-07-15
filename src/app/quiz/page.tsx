import { QuizGenerator } from "@/components/quiz-generator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function QuizPage() {
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
