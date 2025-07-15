// src/app/(app)/syllabus/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { syllabusData } from '@/lib/syllabus';
import { AlertTriangle, ClipboardCheck, FilePlus2, Loader2, Atom, FlaskConical, Dna, Sigma } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { generateMcqAction, generateQuestionSetAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { LucideIcon } from 'lucide-react';


type Syllabus = {
  subjects: {
    name: string;
    chapters: {
      name: string;
      topics: string[];
    }[];
  }[];
};

const subjectIcons: Record<string, LucideIcon> = {
    'Physics': Atom,
    'Chemistry': FlaskConical,
    'Biology': Dna,
    'Mathematics': Sigma,
}

export default function SyllabusPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [loadingTopic, setLoadingTopic] = useState<string | null>(null);
  const [generatingSetTopic, setGeneratingSetTopic] = useState<string | null>(null);


  useEffect(() => {
    if (user) {
      const storedOnboardingData = localStorage.getItem(`onboarding_data_${user.email}`);
      if (storedOnboardingData) {
        const parsedData = JSON.parse(storedOnboardingData);
        setSelectedExams(parsedData.exams || []);
      }
    }
    setHydrated(true);
  }, [user]);

  const getSyllabusForExam = (examName: string): Syllabus | undefined => {
    const key = examName.toLowerCase().replace(/ /g, '');
    if (key.includes('jee')) return syllabusData.jee;
    if (key.includes('neet')) return syllabusData.neet;
    return undefined;
  };

  const handlePracticeQuiz = async (topic: string) => {
    setLoadingTopic(topic);
    const difficulty = 'hard';

    const result = await generateMcqAction({ 
        topic: topic, 
        questionCount: 20, 
        difficulty: difficulty 
    });
    
    setLoadingTopic(null);

    if (result.error) {
        toast({ variant: "destructive", title: "Error", description: result.error });
    } else if (result.mcqs) {
        const quizData = { 
            topic: topic, 
            difficulty: difficulty,
            mcqs: result.mcqs,
            totalTime: 20 * 1 * 60, // 20 questions, 1 min each
        };
        sessionStorage.setItem('currentQuiz', JSON.stringify(quizData));
        router.push('/quiz');
    }
  }

  const handleGenerateSet = async (topic: string) => {
    setGeneratingSetTopic(topic);
    const result = await generateQuestionSetAction({ topic });
    setGeneratingSetTopic(null);

    if (result.error) {
      toast({ variant: 'destructive', title: 'Generation Failed', description: result.error });
    } else if (result.mcqs) {
      // In a real app, you'd save these to your database.
      // For now, we'll just confirm it worked.
      console.log(`Generated ${result.mcqs.length} questions for ${topic}:`, result.mcqs);
      toast({
        title: 'Question Set Generated!',
        description: `A question set of ${result.mcqs.length} MCQs has been created for ${topic}.`,
      });
    }
  };

  if (!hydrated) {
    return null; // or a loading skeleton
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Syllabus</h1>
      
      {selectedExams.length > 0 ? (
        <div className="space-y-8">
          {selectedExams.map((examName) => {
            const syllabus = getSyllabusForExam(examName);
            if (!syllabus) return null;

            return (
              <Card key={examName}>
                <CardHeader>
                    <CardTitle className="text-2xl">{examName} Syllabus</CardTitle>
                    <CardDescription>Browse subjects, chapters, and topics to generate questions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {syllabus.subjects.map((subject) => {
                            const Icon = subjectIcons[subject.name] || Atom;
                            return (
                                <Card key={subject.name} className="flex flex-col">
                                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                                        <div className="p-3 bg-primary/10 rounded-full">
                                            <Icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle>{subject.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <Accordion type="multiple" className="w-full">
                                            {subject.chapters.map((chapter, chapterIndex) => (
                                                 <AccordionItem key={chapter.name} value={`chapter-${chapterIndex}`} className="border-b last:border-b-0">
                                                    <AccordionTrigger className="text-sm py-3 hover:no-underline rounded-md px-3 hover:bg-accent">
                                                        {chapter.name}
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        <div className="pt-2 grid grid-cols-1 gap-3">
                                                            {chapter.topics.map((topic) => (
                                                                <Card key={topic} className="bg-background/50">
                                                                    <CardHeader className="p-3">
                                                                        <CardTitle className="text-sm font-normal">{topic}</CardTitle>
                                                                    </CardHeader>
                                                                    <CardFooter className="p-3 pt-0 flex flex-col sm:flex-row gap-2">
                                                                        <Button 
                                                                            size="sm" 
                                                                            className="flex-1"
                                                                            onClick={() => handlePracticeQuiz(topic)}
                                                                            disabled={loadingTopic === topic || generatingSetTopic === topic}
                                                                        >
                                                                            {loadingTopic === topic ? (
                                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                            ) : (
                                                                                <ClipboardCheck className="mr-2 h-4 w-4" />
                                                                            )}
                                                                            Practice
                                                                        </Button>
                                                                        <Button 
                                                                          size="sm" 
                                                                          variant="secondary" 
                                                                          className="flex-1"
                                                                          onClick={() => handleGenerateSet(topic)}
                                                                          disabled={generatingSetTopic === topic || loadingTopic === topic}
                                                                        >
                                                                            {generatingSetTopic === topic ? (
                                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                            ) : (
                                                                                <FilePlus2 className="mr-2 h-4 w-4" />
                                                                            )}
                                                                            Generate Set
                                                                        </Button>
                                                                    </CardFooter>
                                                                </Card>
                                                            ))}
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
            <CardContent className="py-16 flex flex-col items-center justify-center text-center gap-4">
                 <AlertTriangle className="h-12 w-12 text-destructive" />
                <h3 className="text-xl font-semibold">No Exams Selected</h3>
                <p className="text-muted-foreground max-w-sm">
                    You haven't selected any exams you're preparing for. Please update your profile to view the relevant syllabus.
                </p>
                 <Link href="/profile">
                    <Button>
                        Go to Profile
                    </Button>
                </Link>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
