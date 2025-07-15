// src/ai/flows/generate-question-set-flow.ts
'use server';
/**
 * @fileOverview Flow for generating a large set of multiple-choice questions (MCQs) with a specific difficulty distribution.
 *
 * - generateQuestionSet - A function that generates 100 MCQs for a given topic.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import type { GenerateQuestionSetInput, GenerateQuestionSetOutput } from '@/lib/types';


const GenerateQuestionSetInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate the question set.'),
});

const McqSchema = z.object({
  question: z.string().describe('The multiple choice question.'),
  options: z.array(z.string()).describe('The possible answers to the question. There should be 4 options.'),
  correctAnswer: z.string().describe('The correct answer to the question.'),
  difficulty: z.enum(['easy', 'moderate', 'difficult', 'extreme']).describe('The difficulty level of the question.'),
});

const GenerateQuestionSetOutputSchema = z.object({
  mcqs: z.array(McqSchema)
    .describe('An array of exactly 100 multiple choice questions with specified difficulties.')
});


export async function generateQuestionSet(input: GenerateQuestionSetInput): Promise<GenerateQuestionSetOutput> {
  return generateQuestionSetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuestionSetPrompt',
  input: {schema: GenerateQuestionSetInputSchema},
  output: {schema: GenerateQuestionSetOutputSchema},
  prompt: `You are an expert question setter for competitive exams like NEET and JEE. Your task is to create a comprehensive question bank of exactly 100 multiple-choice questions for a given topic.

Topic: {{{topic}}}

The question set must have a precise difficulty distribution. You must generate:
- 30 'easy' questions: These should test basic concepts and recall.
- 30 'moderate' questions: These should require some application of concepts.
- 20 'difficult' questions: These should be challenging, requiring deep understanding and multi-step problem-solving.
- 20 'extreme' questions: These should be exceptionally hard, similar to the toughest questions seen in advanced competitive exams, potentially combining multiple concepts.

For each question, you must provide:
1.  A clear and well-formed question.
2.  Exactly 4 plausible answer options.
3.  The single correct answer.
4.  The assigned difficulty level ('easy', 'moderate', 'difficult', or 'extreme').

It is critical that you output exactly 100 questions in total, adhering to the specified distribution.

Output the entire question set in the required JSON format.
`,
});

const generateQuestionSetFlow = ai.defineFlow(
  {
    name: 'generateQuestionSetFlow',
    inputSchema: GenerateQuestionSetInputSchema,
    outputSchema: GenerateQuestionSetOutputSchema,
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
