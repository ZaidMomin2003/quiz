export type Mcq = {
  question: string;
  options: string[];
  correctAnswer: string;
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
