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
import { CheckCircle, Download, FileJson, FlaskConical, Loader2, Play, Save, Settings } from 'lucide-react';
import type { Mcq } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Syllabus = typeof syllabusData.jee;
type Subject = Syllabus['subjects'][0];
type Chapter = Subject['chapters'][0];

const GENERATION_STATE_KEY = 'generationState';

type GenerationConfig = {
    easy: number;
    moderate: number;
    difficult: number;
    extreme: number;
}

export default function GeneratorPage() {
    const { toast } = useToast();
    const [generatedTopics, setGeneratedTopics] = useState<Set<string>>(new Set());
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentStatus, setCurrentStatus] = useState('');
    const [progress, setProgress] = useState(0);
    const [config, setConfig] = useState<GenerationConfig>({ easy: 30, moderate: 30, difficult: 20, extreme: 20 });
    
    const totalQuestions = config.easy + config.moderate + config.difficult + config.extreme;

    useEffect(() => {
        const savedState = localStorage.getItem(GENERATION_STATE_KEY);
        if (savedState) {
            setGeneratedTopics(new Set(JSON.parse(savedState)));
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
            const result = await generateQuestionSetAction({ topic: topic.name, ...config });

            if (result.mcqs) {
                toast({ title: `Success`, description: `Generated ${result.mcqs.length} questions for ${topic.name}.` });
                updateAndSaveGeneratedTopics(topic.id);
                // Here you would save 'result.mcqs' to your database
                console.log(`Generated ${result.mcqs.length} questions for ${topic.name}`);
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
        if (totalQuestions <= 0) {
            toast({ variant: 'destructive', title: 'Invalid Configuration', description: 'Total questions must be greater than zero.'});
            return;
        }
        const topics = getTopicsForScope(scope);
        generateForTopics(topics);
    };

    const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: Math.max(0, parseInt(value, 10) || 0)
        }))
    }

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
                   Use this page to generate a large database of questions. This process can take a long time and will consume a significant amount of your API quota.
                </AlertDescription>
            </Alert>
            
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Settings className="h-5 w-5" />
                        <CardTitle>Generation Configuration</CardTitle>
                    </div>
                    <CardDescription>Specify how many questions of each difficulty to generate per topic.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="easy-count">Easy</Label>
                        <Input id="easy-count" name="easy" type="number" value={config.easy} onChange={handleConfigChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="moderate-count">Moderate</Label>
                        <Input id="moderate-count" name="moderate" type="number" value={config.moderate} onChange={handleConfigChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="difficult-count">Difficult</Label>
                        <Input id="difficult-count" name="difficult" type="number" value={config.difficult} onChange={handleConfigChange} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="extreme-count">Extreme</Label>
                        <Input id="extreme-count" name="extreme" type="number" value={config.extreme} onChange={handleConfigChange} />
                    </div>
                    <div className="space-y-2 col-span-2 md:col-span-1">
                        <Label>Total</Label>
                        <div className="flex items-center justify-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            {totalQuestions}
                        </div>
                    </div>
                </CardContent>
            </Card>


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
                     <Button onClick={() => {}} disabled={true}>
                        <Save className="mr-2 h-4 w-4" />
                        Save to Database (Requires DB Integration)
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
