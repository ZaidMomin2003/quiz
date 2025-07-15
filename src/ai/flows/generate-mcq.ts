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
  prompt: `You are an expert question setter for competitive exams like NEET and JEE. Your task is to create highly challenging, 'hard' difficulty multiple-choice questions.

Topic: {{{topic}}}
Number of Questions: {{{questionCount}}}
Difficulty: {{{difficulty}}}

Instructions:
1.  Analyze the typical patterns and styles of questions asked in previous years for the given topic.
2.  Do NOT copy past questions. Instead, create new, original questions that are of a similar or slightly higher difficulty level.
3.  The questions should test deep conceptual understanding, application of formulas, and problem-solving skills, not just rote memorization.
4.  Each question must have 4 plausible options, with only one being correct. The incorrect options should be common mistakes or misconceptions.

Output the questions in the required JSON format.
`,
});

const generateMcqFlow = ai.defineFlow(
  {
    name: 'generateMcqFlow',
    inputSchema: GenerateMcqInputSchema,
    outputSchema: GenerateMcqOutputSchema,
    config: {
        safetySettings: [
            {
                category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                threshold: 'BLOCK_NONE',
            }
        ]
    }
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
