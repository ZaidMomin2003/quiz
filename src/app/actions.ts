'use server';

import { generateMcq } from '@/ai/flows/generate-mcq';
import { analyzeQuiz } from '@/ai/flows/analyze-quiz-flow';
import { generateFromConcepts } from '@/ai/flows/generate-from-concepts-flow';
import type { GenerateMcqInput, GenerateMcqOutput, AnalyzeQuizInput, AnalyzeQuizOutput, GenerateFromConceptsInput, GenerateFromConceptsOutput } from '@/lib/types';


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

export async function generateFromConceptsAction(
  input: GenerateFromConceptsInput
): Promise<{ mcqs?: GenerateFromConceptsOutput['mcqs']; error?: string }> {
    try {
        const result = await generateFromConcepts(input);
        if (!result || !result.mcqs || result.mcqs.length === 0) {
            return { error: 'Could not generate questions for these concepts. Please try again.' };
        }
        return { mcqs: result.mcqs };
    } catch (error) {
        console.error('Error generating from concepts:', error);
        return { error: 'An unexpected error occurred while generating your practice quiz.' };
    }
}


export async function analyzeQuizAction(
  input: AnalyzeQuizInput
): Promise<{ analysis?: AnalyzeQuizOutput; error?: string }> {
  try {
    const result = await analyzeQuiz(input);
    if (!result) {
      return { error: 'Could not analyze quiz results.' };
    }
    return { analysis: result };
  } catch (error) {
    console.error('Error analyzing quiz:', error);
    return { error: 'An unexpected error occurred during analysis.' };
  }
}
