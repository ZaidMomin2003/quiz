'use server';

import { generateMcq, type GenerateMcqInput, type GenerateMcqOutput } from '@/ai/flows/generate-mcq';

export async function generateMcqAction(
  input: GenerateMcqInput
): Promise<{ mcqs?: GenerateMcqOutput['mcqs']; error?: string }> {
  try {
    const result = await generateMcq(input);
    if (!result || !result.mcqs || result.mcqs.length === 0) {
      return { error: 'No questions were generated. Try a different topic or adjust the parameters.' };
    }
    return { mcqs: result.mcqs };
  } catch (error) {
    console.error('Error generating MCQs:', error);
    return { error: 'An unexpected error occurred while generating questions. Please try again later.' };
  }
}
