
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from 'next/navigation';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateMcqAction } from "@/app/actions";
import type { Mcq } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "./ui/badge";

const formSchema = z.object({
  topic: z.string().min(2, {
    message: "Topic must be at least 2 characters.",
  }),
  questionCount: z.coerce.number().min(1).max(10),
  difficulty: z.enum(["easy", "medium", "hard"]),
});

type QuizFormValues = z.infer<typeof formSchema>;

export function QuizGenerator() {
  const [mcqs, setMcqs] = useState<Mcq[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      questionCount: 3,
      difficulty: "easy",
    },
  });

  useEffect(() => {
    const topicFromUrl = searchParams.get('topic');
    if (topicFromUrl) {
      form.setValue('topic', decodeURIComponent(topicFromUrl));
    }
  }, [searchParams, form]);


  async function onSubmit(values: QuizFormValues) {
    setIsLoading(true);
    setMcqs([]);
    setUserAnswers({});
    setSubmitted(false);

    const result = await generateMcqAction(values);

    setIsLoading(false);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    } else if (result.mcqs) {
      setMcqs(result.mcqs);
    }
  }

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };
  
  const calculateScore = () => {
    let score = 0;
    mcqs.forEach((mcq, index) => {
      if (userAnswers[index] === mcq.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., The Roman Empire" {...field} />
                </FormControl>
                <FormDescription>
                  What subject do you want to be quizzed on?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="questionCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Questions</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Quiz
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="mt-8 flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Generating your quiz...</p>
        </div>
      )}

      {mcqs.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Quiz</h2>
          {mcqs.map((mcq, index) => (
            <Card key={index} className="mb-4">
              <CardHeader>
                <CardTitle>
                  Question {index + 1}: {mcq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  onValueChange={(value) => handleAnswerChange(index, value)}
                  disabled={submitted}
                >
                  {mcq.options.map((option, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`q${index}-o${i}`} />
                      <Label htmlFor={`q${index}-o${i}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
              {submitted && (
                <CardFooter className="flex flex-col items-start">
                   <p className="text-sm">
                    {userAnswers[index] === mcq.correctAnswer ? "✅ Correct" : "❌ Incorrect"}
                  </p>
                  <p className="text-sm text-muted-foreground">Correct Answer: {mcq.correctAnswer}</p>
                </CardFooter>
              )}
            </Card>
          ))}
          {!submitted ? (
            <Button onClick={() => setSubmitted(true)}>Submit Answers</Button>
          ) : (
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold">Quiz Complete!</h3>
              <p className="text-xl mt-2">Your Score: <Badge variant="secondary" className="text-lg">{score} / {mcqs.length}</Badge></p>
              <Button onClick={() => {
                  setMcqs([]);
                  setSubmitted(false);
                  setUserAnswers({});
                  form.reset();
              }} className="mt-4">
                Create a New Quiz
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
