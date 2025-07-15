// src/ai/flows/generate-mcq.ts
'use server';
/**
 * @fileOverview Flow for generating multiple-choice questions (MCQs) based on a given topic and difficulty level.
 *
 * - generateMcq - A function that generates MCQs.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { GenerateMcqInput, GenerateMcqOutput } from '@/lib/types';

const GenerateMcqInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate MCQs.'),
  questionCount: z.number().int().min(1).describe('The number of MCQs to generate.'),
  difficulty: z
    .enum(['easy', 'medium', 'hard'])
    .describe('The difficulty level of the MCQs.'),
});

const GenerateMcqOutputSchema = z.object({
  mcqs: z.array(
    z.object({
      question: z.string().describe('The multiple choice question.'),
      options: z.array(z.string()).describe('The possible answers to the question.'),
      correctAnswer: z.string().describe('The correct answer to the question.'),
    })
  ).
describe('An array of multiple choice questions.')
});

export async function generateMcq(input: GenerateMcqInput): Promise<GenerateMcqOutput> {
  return generateMcqFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMcqPrompt',
  input: {schema: GenerateMcqInputSchema},
  output: {schema: GenerateMcqOutputSchema},
  prompt: `You are an expert quiz generator. Generate multiple-choice questions based on the following criteria:

Topic: {{{topic}}}
Number of Questions: {{{questionCount}}}
Difficulty: {{{difficulty}}}

Each question should have 4 possible answers, with one correct answer.

Output the questions in a JSON format.
`,
});

const generateMcqFlow = ai.defineFlow(
  {
    name: 'generateMcqFlow',
    inputSchema: GenerateMcqInputSchema,
    outputSchema: GenerateMcqOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
