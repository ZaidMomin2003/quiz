// src/ai/flows/generate-learn-quiz.ts
'use server';
/**
 * @fileOverview Flow for generating a "learning" quiz with progressive difficulty and built-in explanations.
 *
 * - generateLearnQuiz - A function that generates a learning quiz.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import type { GenerateLearnQuizInput, GenerateLearnQuizOutput } from '@/lib/types';


const GenerateLearnQuizInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate the learning quiz.'),
});

const LearnMcqSchema = z.object({
  question: z.string().describe('The multiple choice question.'),
  options: z.array(z.string()).describe('The possible answers to the question. There should be 4 options.'),
  correctAnswer: z.string().describe('The correct answer to the question.'),
  explanation: z
    .string()
    .describe(
      'A detailed explanation of why the correct answer is right. This should be educational and clear.'
    ),
  difficulty: z.enum(['easy', 'medium', 'hard']).describe('The difficulty level of the question.'),
});


const GenerateLearnQuizOutputSchema = z.object({
  mcqs: z.array(LearnMcqSchema)
    .describe('An array of 10 multiple choice questions with explanations, ordered by difficulty (3 easy, 4 medium, 3 hard).')
});


export async function generateLearnQuiz(input: GenerateLearnQuizInput): Promise<GenerateLearnQuizOutput> {
  return generateLearnQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLearnQuizPrompt',
  input: {schema: GenerateLearnQuizInputSchema},
  output: {schema: GenerateLearnQuizOutputSchema},
  prompt: `You are an expert educator and quiz creator. Your task is to generate a comprehensive learning quiz on a given topic. The quiz must consist of exactly 10 multiple-choice questions designed to create a learning curve for the user.

Topic: {{{topic}}}

The structure of the quiz must be as follows:
- 3 questions of 'easy' difficulty.
- 4 questions of 'medium' difficulty.
- 3 questions of 'hard' difficulty.

The final array of questions in your response MUST be ordered by difficulty: all 'easy' questions first, then 'medium', then 'hard'.

For each question, you must provide:
1.  A clear and concise question.
2.  Exactly 4 answer options.
3.  The single correct answer.
4.  A detailed but easy-to-understand explanation for why the correct answer is correct. This is the most important part, as it's for learning.
5.  The difficulty level ('easy', 'medium', or 'hard').

Output the entire quiz in the required JSON format.
`,
});

const generateLearnQuizFlow = ai.defineFlow(
  {
    name: 'generateLearnQuizFlow',
    inputSchema: GenerateLearnQuizInputSchema,
    outputSchema: GenerateLearnQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);

    // Ensure the output is correctly sorted as a fallback, though the prompt is explicit.
    if (output?.mcqs) {
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        output.mcqs.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
    }
    
    return output!;
  }
);
