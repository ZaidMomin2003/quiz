
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
import { BookMarked, AlertTriangle, ClipboardCheck, Target, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { generateMcqAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';


type Syllabus = {
  subjects: {
    name: string;
    chapters: {
      name: string;
      topics: string[];
    }[];
  }[];
};

export default function SyllabusPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [loadingTopic, setLoadingTopic] = useState<string | null>(null);

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

  const handlePracticeQuiz = async (topic: string, examName: string) => {
    setLoadingTopic(topic);
    const difficulty = 'hard';

    const result = await generateMcqAction({ 
        topic: `${topic} (for ${examName})`, 
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

  if (!hydrated) {
    return null; // or a loading skeleton
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Syllabus</h1>
      
      {selectedExams.length > 0 ? (
        <Accordion type="multiple" className="w-full space-y-4">
          {selectedExams.map((examName) => {
            const syllabus = getSyllabusForExam(examName);
            if (!syllabus) return null;

            return (
              <AccordionItem key={examName} value={examName} className="border-0">
                 <Card>
                    <CardHeader>
                        <AccordionTrigger className="p-0 hover:no-underline">
                             <CardTitle>{examName} Syllabus</CardTitle>
                        </AccordionTrigger>
                    </CardHeader>
                    <AccordionContent>
                        <CardContent>
                            <Accordion type="multiple" className="w-full space-y-2">
                                {syllabus.subjects.map((subject, subjectIndex) => (
                                    <AccordionItem key={subject.name} value={`subject-${subjectIndex}`} className="border rounded-md px-4">
                                        <AccordionTrigger>{subject.name}</AccordionTrigger>
                                        <AccordionContent>
                                            <Accordion type="multiple" className="w-full space-y-1">
                                                {subject.chapters.map((chapter, chapterIndex) => (
                                                     <AccordionItem key={chapter.name} value={`chapter-${chapterIndex}`} className="border-b-0">
                                                        <AccordionTrigger className="text-sm py-3 hover:no-underline rounded-md px-3 hover:bg-accent">
                                                            {chapter.name}
                                                        </AccordionTrigger>
                                                        <AccordionContent>
                                                            <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                {chapter.topics.map((topic) => (
                                                                    <Card key={topic} className="bg-background/50">
                                                                        <CardHeader className="p-4">
                                                                            <CardTitle className="text-sm font-medium">{topic}</CardTitle>
                                                                        </CardHeader>
                                                                        <CardFooter className="p-4 pt-0 flex gap-2">
                                                                            <Button 
                                                                                size="sm" 
                                                                                className="flex-1"
                                                                                onClick={() => handlePracticeQuiz(topic, examName)}
                                                                                disabled={loadingTopic === topic}
                                                                            >
                                                                                {loadingTopic === topic ? (
                                                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                                ) : (
                                                                                    <ClipboardCheck className="mr-2 h-4 w-4" />
                                                                                )}
                                                                                Practice Quiz
                                                                            </Button>
                                                                            <Button size="sm" variant="secondary" className="flex-1" disabled>
                                                                                <Target className="mr-2 h-4 w-4" />
                                                                                Proficiency
                                                                            </Button>
                                                                        </CardFooter>
                                                                    </Card>
                                                                ))}
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                ))}
                                            </Accordion>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </AccordionContent>
                 </Card>
              </AccordionItem>
            );
          })}
        </Accordion>
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
