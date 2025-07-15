// src/app/(app)/generator/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { syllabusData } from '@/lib/syllabus';
import { generateQuestionSetAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Download, FileJson, FlaskConical, Loader2, Play } from 'lucide-react';
import type { Mcq } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Syllabus = typeof syllabusData.jee;
type Subject = Syllabus['subjects'][0];
type Chapter = Subject['chapters'][0];

const GENERATION_STATE_KEY = 'generationState';
const GENERATED_QUESTIONS_KEY = 'generatedQuestions';

export default function GeneratorPage() {
    const { toast } = useToast();
    const [generatedTopics, setGeneratedTopics] = useState<Set<string>>(new Set());
    const [generatedQuestions, setGeneratedQuestions] = useState<Mcq[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentStatus, setCurrentStatus] = useState('');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const savedState = localStorage.getItem(GENERATION_STATE_KEY);
        if (savedState) {
            setGeneratedTopics(new Set(JSON.parse(savedState)));
        }
        const savedQuestions = localStorage.getItem(GENERATED_QUESTIONS_KEY);
        if (savedQuestions) {
            setGeneratedQuestions(JSON.parse(savedQuestions));
        }
    }, []);

    const updateAndSaveGeneratedTopics = (newTopic: string) => {
        setGeneratedTopics(prev => {
            const newSet = new Set(prev);
            newSet.add(newTopic);
            localStorage.setItem(GENERATION_STATE_KEY, JSON.stringify(Array.from(newSet)));
            return newSet;
        });
    };

    const updateAndSaveGeneratedQuestions = (newQuestions: Mcq[]) => {
        setGeneratedQuestions(prev => {
            const updatedQuestions = [...prev, ...newQuestions];
            localStorage.setItem(GENERATED_QUESTIONS_KEY, JSON.stringify(updatedQuestions));
            return updatedQuestions;
        });
    }

    const generateForTopics = async (topicsToGenerate: { name: string; id: string }[]) => {
        setIsGenerating(true);
        setProgress(0);
        let count = 0;

        for (const topic of topicsToGenerate) {
            if (generatedTopics.has(topic.id)) {
                count++;
                setProgress((count / topicsToGenerate.length) * 100);
                continue; // Skip already generated topics
            }

            setCurrentStatus(`Generating for: ${topic.name}...`);
            const result = await generateQuestionSetAction({ topic: topic.name });

            if (result.mcqs) {
                toast({ title: `Success`, description: `Generated ${result.mcqs.length} questions for ${topic.name}.` });
                updateAndSaveGeneratedTopics(topic.id);
                updateAndSaveGeneratedQuestions(result.mcqs);
            } else {
                toast({ variant: 'destructive', title: `Error`, description: `Failed to generate for ${topic.name}: ${result.error}` });
            }
            count++;
            setProgress((count / topicsToGenerate.length) * 100);
        }

        setCurrentStatus('Generation complete!');
        setIsGenerating(false);
    };

    const getTopicsForScope = (scope: 'jee' | 'neet' | string): { name: string; id: string }[] => {
        let syllabus: Syllabus | undefined;
        if (scope === 'jee') syllabus = syllabusData.jee;
        if (scope === 'neet') syllabus = syllabusData.neet;
        
        let subjects: Subject[] = [];
        if (syllabus) {
            subjects = syllabus.subjects;
        } else {
            // Handle subject-specific generation (e.g., 'jee-Physics')
            const [exam, subjectName] = scope.split('-');
            if (exam === 'jee') syllabus = syllabusData.jee;
            if (exam === 'neet') syllabus = syllabusData.neet;
            
            const subject = syllabus?.subjects.find(s => s.name === subjectName);
            if (subject) subjects = [subject];
        }

        return subjects.flatMap(s => s.chapters.flatMap(c => c.topics.map(t => ({ name: t, id: `${scope}-${t}` }))));
    };

    const handleGenerate = (scope: 'jee' | 'neet' | string) => {
        const topics = getTopicsForScope(scope);
        generateForTopics(topics);
    };

    const downloadJson = () => {
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(generatedQuestions, null, 2)
        )}`;
        const link = document.createElement('a');
        link.href = jsonString;
        link.download = 'database.json';
        link.click();
    };

    const renderSyllabus = (exam: 'jee' | 'neet', examData: Syllabus) => {
        return (
            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl">{exam.toUpperCase()} Syllabus</CardTitle>
                        <CardDescription>Generate question sets for subjects or chapters.</CardDescription>
                    </div>
                     <Button onClick={() => handleGenerate(exam)} disabled={isGenerating}>
                        {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                        Generate All {exam.toUpperCase()}
                    </Button>
                </CardHeader>
                <CardContent>
                    <Accordion type="multiple" className="w-full">
                        {examData.subjects.map(subject => (
                            <AccordionItem key={subject.name} value={subject.name}>
                                <AccordionTrigger className="text-lg font-semibold">{subject.name}</AccordionTrigger>
                                <AccordionContent className="pl-4">
                                     <Button variant="secondary" size="sm" className="mb-4" onClick={() => handleGenerate(`${exam}-${subject.name}`)} disabled={isGenerating}>
                                         {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
                                         Generate for {subject.name}
                                     </Button>
                                    <Accordion type="multiple" className="w-full">
                                        {subject.chapters.map(chapter => (
                                            <AccordionItem key={chapter.name} value={chapter.name}>
                                                <AccordionTrigger>{chapter.name}</AccordionTrigger>
                                                <AccordionContent className="pl-4">
                                                    <ul className="space-y-2">
                                                        {chapter.topics.map(topic => {
                                                            const topicId = `${exam}-${topic}`;
                                                            const isDone = generatedTopics.has(topicId);
                                                            return (
                                                                <li key={topic} className="flex items-center justify-between">
                                                                    <span>{topic}</span>
                                                                    {isDone && <CheckCircle className="h-5 w-5 text-green-500" />}
                                                                </li>
                                                            )
                                                        })}
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
            </Card>
        )
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Question Set Generator</h1>
            <Alert>
                <FlaskConical className="h-4 w-4" />
                <AlertTitle>This is a powerful tool!</AlertTitle>
                <AlertDescription>
                   Use this page to generate a large database of questions. This process can take a long time and will consume a significant amount of your API quota. Once generated, you can download the JSON file to use as an external database.
                </AlertDescription>
            </Alert>
            
            <Card>
                <CardHeader>
                    <CardTitle>Generation Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isGenerating ? (
                        <>
                           <Progress value={progress} />
                           <p className="text-sm text-muted-foreground">{currentStatus}</p>
                        </>
                    ) : (
                        <p className="text-sm text-muted-foreground">Generator is idle. Select a scope to begin.</p>
                    )}
                </CardContent>
                <CardFooter>
                     <Button onClick={downloadJson} disabled={generatedQuestions.length === 0}>
                        <Download className="mr-2 h-4 w-4" />
                        Download database.json ({generatedQuestions.length} questions)
                    </Button>
                </CardFooter>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {renderSyllabus('jee', syllabusData.jee)}
                {renderSyllabus('neet', syllabusData.neet)}
            </div>
        </div>
    );
}
