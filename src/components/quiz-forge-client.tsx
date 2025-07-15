'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, Wand2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateMcqAction } from '@/app/actions';
import type { Mcq } from '@/lib/types';
import { McqCard } from './mcq-card';
import { Separator } from './ui/separator';

const formSchema = z.object({
  topic: z.string().min(2, {
    message: 'Topic must be at least 2 characters.',
  }).max(50, {
    message: 'Topic must not exceed 50 characters.'
  }),
  questionCount: z.number().min(1).max(10),
  difficulty: z.enum(['easy', 'medium', 'hard']),
});

export function QuizForgeClient() {
  const [mcqs, setMcqs] = useState<Mcq[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      questionCount: 3,
      difficulty: 'medium',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setMcqs(null);
    
    const result = await generateMcqAction(values);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: result.error,
      });
    } else if (result.mcqs) {
      setMcqs(result.mcqs);
       toast({
        title: 'Success!',
        description: 'Your quiz has been generated.',
      });
    }
    
    setIsLoading(false);
  }

  return (
    <div className="space-y-12">
      <Card className="max-w-3xl mx-auto border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight text-center font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
            Create Your Quiz
          </CardTitle>
          <CardDescription className="text-center">
            Define your topic and parameters, and let AI do the rest.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., The Solar System" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="questionCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Questions: {field.value}</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={10}
                        step={1}
                        value={[field.value]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <div className="flex justify-center">
                <Button type="submit" disabled={isLoading} size="lg" className="w-full max-w-xs">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                  )}
                  {isLoading ? 'Generating...' : 'Forge Quiz'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Generating your quiz, please wait...</p>
        </div>
      )}

      {mcqs && mcqs.length > 0 && (
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold font-headline">Your Forged Quiz</h2>
            <p className="text-muted-foreground">Test your knowledge!</p>
          </div>
          <Separator />
          <div className="space-y-6">
            {mcqs.map((mcq, index) => (
              <McqCard key={index} mcq={mcq} questionNumber={index + 1} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
