// src/app/(app)/learn/page.tsx
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateLearnQuizAction } from '@/app/actions';

const formSchema = z.object({
  topic: z.string().min(3, {
    message: "Topic must be at least 3 characters.",
  }),
});

type LearnFormValues = z.infer<typeof formSchema>;

export default function LearnPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LearnFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
    },
  });

  async function onSubmit(values: LearnFormValues) {
    setIsLoading(true);

    const result = await generateLearnQuizAction(values);

    setIsLoading(false);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error Generating Quiz",
        description: result.error,
      });
    } else if (result.mcqs) {
      const learnQuizData = { topic: values.topic, mcqs: result.mcqs };
      sessionStorage.setItem('learnQuiz', JSON.stringify(learnQuizData));
      router.push('/learn-quiz');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl">Start a Learning Session</CardTitle>
          <CardDescription>
            Enter a topic you want to master. We'll create a guided quiz to help you learn, one question at a time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Topic</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Photosynthesis, The Cold War, or React Hooks" 
                        className="text-center text-base"
                        {...field} />
                    </FormControl>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Your Lesson...
                  </>
                ) : (
                  'Start Learning'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
