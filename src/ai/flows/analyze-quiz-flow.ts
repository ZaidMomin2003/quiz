// src/ai/flows/analyze-quiz-flow.ts
'use server';
/**
 * @fileOverview A flow for analyzing a user's quiz performance to identify strong and weak concepts and provide explanations.
 *
 * - analyzeQuiz - A function that analyzes quiz results.
 * - AnalyzeQuizInput - The input type for the analyzeQuiz function.
 * - AnalyzeQuizOutput - The return type for the analyzeQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuestionResultSchema = z.object({
  question: z.string(),
  userAnswer: z.string(),
  correctAnswer: z.string(),
  wasCorrect: z.boolean(),
});

const AnalyzeQuizInputSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()),
      correctAnswer: z.string(),
    })
  ),
  userAnswers: z.record(z.string()), // Maps question index to user's answer
});
export type AnalyzeQuizInput = z.infer<typeof AnalyzeQuizInputSchema>;

const AnalyzeQuizOutputSchema = z.object({
  strongConcepts: z
    .array(z.string())
    .describe(
      'A list of 2-3 concepts or topics the user seems to understand well, based on their correct answers.'
    ),
  weakConcepts: z
    .array(z.string())
    .describe(
      'A list of 2-3 concepts or topics the user should focus on improving, based on their incorrect answers.'
    ),
  detailedExplanations: z.array(
    z.object({
        question: z.string().describe("The original question that was answered incorrectly."),
        userAnswer: z.string().describe("The user's incorrect answer."),
        correctAnswer: z.string().describe("The correct answer to the question."),
        explanation: z.string().describe("A brief, clear explanation for why the correct answer is right and the user's answer was wrong."),
    })
  ).describe("An array of explanations for each question the user answered incorrectly.")
});
export type AnalyzeQuizOutput = z.infer<typeof AnalyzeQuizOutputSchema>;

export async function analyzeQuiz(input: AnalyzeQuizInput): Promise<AnalyzeQuizOutput> {
  return analyzeQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeQuizPrompt',
  input: {
    schema: z.object({
      results: z.array(QuestionResultSchema),
      topic: z.string(),
    }),
  },
  output: {schema: AnalyzeQuizOutputSchema},
  prompt: `You are an expert tutor analyzing a student's quiz results. The quiz was on the topic of: {{{topic}}}.

Based on the following list of questions and the student's answers, please do the following:
1.  Identify their conceptual strengths and weaknesses. Provide a list of 2-3 specific concepts or topics they seem to understand well (strongConcepts) and a list of 2-3 specific concepts they should review (weakConcepts).
2.  For each question that was answered **incorrectly**, provide a detailed explanation. The explanation should clearly state why the correct answer is correct.

Quiz Results:
{{#each results}}
- Question: "{{question}}"
- User's Answer: "{{userAnswer}}"
- Correct Answer: "{{correctAnswer}}"
- Result: {{#if wasCorrect}}Correct{{else}}Incorrect{{/if}}
{{/each}}
`,
});

const analyzeQuizFlow = ai.defineFlow(
  {
    name: 'analyzeQuizFlow',
    inputSchema: AnalyzeQuizInputSchema,
    outputSchema: AnalyzeQuizOutputSchema,
  },
  async (input) => {
    // We need to transform the input to match the prompt's expected format.
    const results = input.questions.map((q, index) => {
      const userAnswer = input.userAnswers[index] || 'No answer';
      return {
        question: q.question,
        userAnswer: userAnswer,
        correctAnswer: q.correctAnswer,
        wasCorrect: userAnswer === q.correctAnswer,
      };
    });

    const topicPrompt = `Based on these questions, what is the single, overall topic of this quiz? Give a short 2-5 word answer.

    Questions:
    ${input.questions.map(q => `- ${q.question}`).join('\n')}
    `;

    const topicResponse = await ai.generate({ prompt: topicPrompt });
    const topic = topicResponse.text;

    const {output} = await prompt({
      results,
      topic,
    });

    return output!;
  }
);
