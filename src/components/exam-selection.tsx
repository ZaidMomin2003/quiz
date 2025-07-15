// src/components/exam-selection.tsx
'use client';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Atom,
  GraduationCap,
  FlaskConical,
  type LucideIcon,
} from 'lucide-react';

type Exam = {
  name: string;
  icon: LucideIcon;
};

const exams: Exam[] = [
  { name: 'NEET', icon: FlaskConical },
  { name: 'JEE Mains', icon: Atom },
  { name: 'JEE Mains + Advanced', icon: GraduationCap },
];

type ExamSelectionProps = {
  selectedExams: string[];
  onSelectionChange: (exams: string[]) => void;
};

export function ExamSelection({ selectedExams, onSelectionChange }: ExamSelectionProps) {
  const handleSelectExam = (examName: string) => {
    const isSelected = selectedExams.includes(examName);
    if (isSelected) {
      onSelectionChange(selectedExams.filter((e) => e !== examName));
    } else {
      onSelectionChange([...selectedExams, examName]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {exams.map((exam) => {
        const isSelected = selectedExams.includes(exam.name);
        return (
          <Card
            key={exam.name}
            onClick={() => handleSelectExam(exam.name)}
            className={cn(
              'cursor-pointer transition-all hover:shadow-lg hover:border-primary',
              isSelected && 'border-primary ring-2 ring-primary bg-primary/10'
            )}
          >
            <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
              <exam.icon className="h-8 w-8 text-primary" />
              <p className="font-semibold text-center text-sm">{exam.name}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
