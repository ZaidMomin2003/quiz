'use server';

import { generateMcq, type GenerateMcqInput, type GenerateMcqOutput } from '@/ai/flows/generate-mcq';
import { analyzeQuiz, type AnalyzeQuizInput, type AnalyzeQuizOutput } from '@/ai/flows/analyze-quiz-flow';


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