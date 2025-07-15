// src/ai/flows/generate-from-concepts-flow.ts
'use server';
/**
 * @fileOverview Flow for generating multiple-choice questions (MCQs) based on a list of weak concepts.
 *
 * - generateFromConcepts - A function that generates MCQs.
 * - GenerateFromConceptsInput - The input type for the generateFromConcepts function.
 * - GenerateFromConceptsOutput - The return type for the generateFromConcepts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { GenerateMcqOutputSchema } from './generate-mcq';

const GenerateFromConceptsInputSchema = z.object({
  concepts: z.array(z.string()).describe('The list of weak concepts to generate questions about.'),
  questionCount: z.number().int().min(1).describe('The number of MCQs to generate.'),
});
export type GenerateFromConceptsInput = z.infer<typeof GenerateFromConceptsInputSchema>;

export type GenerateFromConceptsOutput = z.infer<typeof GenerateMcqOutputSchema>;

export async function generateFromConcepts(input: GenerateFromConceptsInput): Promise<GenerateFromConceptsOutput> {
  return generateFromConceptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFromConceptsPrompt',
  input: {schema: GenerateFromConceptsInputSchema},
  output: {schema: GenerateMcqOutputSchema},
  prompt: `You are an expert quiz generator. A user has identified the following as weak areas in their knowledge. Generate multiple-choice questions that will help them practice these specific concepts.

Concepts to cover:
{{#each concepts}}
- {{{this}}}
{{/each}}

Number of Questions to Generate: {{{questionCount}}}

Each question should have 4 possible answers, with one correct answer. The questions should be of 'medium' difficulty.

Output the questions in a JSON format.
`,
});

const generateFromConceptsFlow = ai.defineFlow(
  {
    name: 'generateFromConceptsFlow',
    inputSchema: GenerateFromConceptsInputSchema,
    outputSchema: GenerateMcqOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
