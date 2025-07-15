export type Mcq = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export type GenerateMcqInput = {
  topic: string;
  questionCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
};

export type GenerateMcqOutput = {
  mcqs: Mcq[];
};

export type QuizHistoryItem = {
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  mcqs: Mcq[];
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
    mcqs: Mcq[];
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
