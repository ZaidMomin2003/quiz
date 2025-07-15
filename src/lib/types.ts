export type Mcq = {
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'easy' | 'moderate' | 'difficult' | 'extreme';
};

export type GenerateMcqInput = {
  topic: string;
  questionCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
};

export type GenerateMcqOutput = {
  mcqs: Omit<Mcq, 'difficulty'>[];
};

export type QuizHistoryItem = {
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  mcqs: Omit<Mcq, 'difficulty'>[];
  userAnswers: Record<number, string>;
  score: number;
  totalQuestions: number;
  timestamp: number;
};

export type AnalyzeQuizInput = {
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
  userAnswers: Record<string, string>;
};

export type DetailedExplanation = {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
};

export type AnalyzeQuizOutput = {
  strongConcepts: string[];
  weakConcepts: string[];
  detailedExplanations: DetailedExplanation[];
};

export type GenerateFromConceptsInput = {
    concepts: string[];
    questionCount: number;
};

export type GenerateFromConceptsOutput = {
    mcqs: Omit<Mcq, 'difficulty'>[];
};

// Types for the new Learn Quiz feature
export type LearnMcq = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export type GenerateLearnQuizInput = {
  topic: string;
};

export type GenerateLearnQuizOutput = {
  mcqs: LearnMcq[];
};

export type BookmarkItem = {
  topic: string;
  question: string;
  correctAnswer: string;
  explanation: string;
  timestamp: number;
};

export type QuizData = {
    topic: string;
    difficulty: 'easy' | 'medium' | 'hard';
    mcqs: Omit<Mcq, 'difficulty'>[];
    totalTime?: number;
};

// For Question Set Generation
export type GenerateQuestionSetInput = {
  topic: string;
  easy: number;
  moderate: number;
  difficult: number;
  extreme: number;
};

export type GenerateQuestionSetOutput = {
  mcqs: Mcq[];
};
