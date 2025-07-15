// src/components/exam-selection.tsx
'use client';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Stethoscope,
  Atom,
  GraduationCap,
  Languages,
  BookOpen,
  Calculator,
  Briefcase,
  Globe,
  Landmark,
  PenSquare,
  type LucideIcon,
} from 'lucide-react';

type Exam = {
  name: string;
  icon: LucideIcon;
};

const exams: Exam[] = [
  { name: 'NEET', icon: Stethoscope },
  { name: 'JEE', icon: Atom },
  { name: 'GATE', icon: GraduationCap },
  { name: 'CAT', icon: Briefcase },
  { name: 'SAT', icon: BookOpen },
  { name: 'ACT', icon: PenSquare },
  { name: 'IELTS', icon: Languages },
  { name: 'TOEFL', icon: Globe },
  { name: 'NEET PG', icon: Stethoscope },
  { name: 'UPSC', icon: Landmark },
  { name: 'KCET', icon: Calculator },
  { name: 'Other', icon: GraduationCap },
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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
