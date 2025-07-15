// src/app/(app)/syllabus/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { syllabusData } from '@/lib/syllabus';
import { BookMarked, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

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
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

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

  if (!hydrated) {
    return null; // or a loading skeleton
  }
  
  const getSyllabusForExam = (examName: string): Syllabus | undefined => {
    const key = examName.toLowerCase().replace(/ /g, '');
    if (key.includes('jee')) return syllabusData.jee;
    if (key.includes('neet')) return syllabusData.neet;
    return undefined;
  };

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
                                                            <ul className="list-disc pl-10 pt-2 text-sm text-muted-foreground space-y-1.5">
                                                                {chapter.topics.map((topic) => (
                                                                    <li key={topic}>{topic}</li>
                                                                ))}
                                                            </ul>
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
                    <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
                        Go to Profile
                    </button>
                </Link>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
