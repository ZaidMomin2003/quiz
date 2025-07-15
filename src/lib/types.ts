export type Mcq = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export type GenerateMcqOutput = {
  mcqs: Mcq[];
};
