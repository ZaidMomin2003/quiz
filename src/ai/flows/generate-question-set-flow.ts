// src/ai/flows/generate-question-set-flow.ts
'use server';
/**
 * @fileOverview Flow for generating a large set of multiple-choice questions (MCQs) with a specific difficulty distribution.
 *
 * - generateQuestionSet - A function that generates MCQs for a given topic with a dynamic difficulty mix.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import type { GenerateQuestionSetInput, GenerateQuestionSetOutput } from '@/lib/types';


const GenerateQuestionSetInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate the question set.'),
  easy: z.number().int().min(0).describe('The number of easy questions to generate.'),
  moderate: z.number().int().min(0).describe('The number of moderate questions to generate.'),
  difficult: z.number().int().min(0).describe('The number of difficult questions to generate.'),
  extreme: z.number().int().min(0).describe('The number of extreme questions to generate.'),
});

const McqSchema = z.object({
  question: z.string().describe('The multiple choice question.'),
  options: z.array(z.string()).describe('The possible answers to the question. There should be 4 options.'),
  correctAnswer: z.string().describe('The correct answer to the question.'),
  difficulty: z.enum(['easy', 'moderate', 'difficult', 'extreme']).describe('The difficulty level of the question.'),
});

const GenerateQuestionSetOutputSchema = z.object({
  mcqs: z.array(McqSchema)
    .describe('An array of multiple choice questions with specified difficulties.')
});


export async function generateQuestionSet(input: GenerateQuestionSetInput): Promise<GenerateQuestionSetOutput> {
  return generateQuestionSetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuestionSetPrompt',
  input: {schema: GenerateQuestionSetInputSchema},
  output: {schema: GenerateQuestionSetOutputSchema},
  prompt: `You are an expert question setter for competitive exams like NEET and JEE. Your task is to create a comprehensive question bank for a given topic.

Topic: {{{topic}}}

The question set must have a precise difficulty distribution. You must generate:
- {{{easy}}} 'easy' questions: These should test basic concepts and recall.
- {{{moderate}}} 'moderate' questions: These should require some application of concepts.
- {{{difficult}}} 'difficult' questions: These should be challenging, requiring deep understanding and multi-step problem-solving.
- {{{extreme}}} 'extreme' questions: These should be exceptionally hard, similar to the toughest questions seen in advanced competitive exams, potentially combining multiple concepts.

For each question, you must provide:
1.  A clear and well-formed question.
2.  Exactly 4 plausible answer options.
3.  The single correct answer.
4.  The assigned difficulty level ('easy', 'moderate', 'difficult', or 'extreme').

It is critical that you output the exact number of questions for each difficulty level as specified.

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
    if (input.easy + input.moderate + input.difficult + input.extreme <= 0) {
        return { mcqs: [] };
    }
    const {output} = await prompt(input);
    return output!;
  }
);
