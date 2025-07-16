// src/app/actions.ts
'use server';

import { generateMcq } from '@/ai/flows/generate-mcq';
import { analyzeQuiz } from '@/ai/flows/analyze-quiz-flow';
import { generateFromConcepts } from '@/ai/flows/generate-from-concepts-flow';
import { generateLearnQuiz } from '@/ai/flows/generate-learn-quiz';
import { generateQuestionSet } from '@/ai/flows/generate-question-set-flow';
import { addQuestionsToDb, getQuestionCountForTopic, getQuestionsFromDb } from '@/lib/database';


import type { 
    GenerateMcqInput, 
    GenerateMcqOutput, 
    AnalyzeQuizInput, 
    AnalyzeQuizOutput, 
    GenerateFromConceptsInput, 
    GenerateFromConceptsOutput,
    GenerateLearnQuizInput,
    GenerateLearnQuizOutput,
    GenerateQuestionSetInput,
    GenerateQuestionSetOutput
} from '@/lib/types';


export async function generateMcqAction(
  input: GenerateMcqInput
): Promise<{ mcqs?: GenerateMcqOutput['mcqs']; error?: string }> {
  try {
    // This is where the caching logic will live.
    // For now, it's simplified to show the structure.
    
    // 1. Check how many questions we have in the DB for this topic.
    const questionsInDb = await getQuestionCountForTopic(input.topic);
    
    // 2. Decide how many questions to fetch from DB vs. generate with AI.
    let questionsFromDb: GenerateMcqOutput['mcqs'] = [];
    let questionsToGenerate = input.questionCount;

    // A simple version of the caching logic:
    if (questionsInDb > 0) {
        const fetchCount = Math.min(questionsInDb, Math.ceil(input.questionCount * 0.3)); // Fetch up to 30% from DB
        questionsFromDb = await getQuestionsFromDb(input.topic, fetchCount);
        questionsToGenerate = input.questionCount - questionsFromDb.length;
    }

    let generatedMcqs: GenerateMcqOutput['mcqs'] = [];
    if (questionsToGenerate > 0) {
        // 3. Generate the remaining questions using the AI flow.
        const result = await generateMcq({ ...input, questionCount: questionsToGenerate });
        if (!result || !result.mcqs || result.mcqs.length === 0) {
          return { error: 'The AI failed to generate new questions. Please try again.' };
        }
        generatedMcqs = result.mcqs;

        // 4. Add the newly generated questions to our database for future use.
        await addQuestionsToDb(input.topic, generatedMcqs);
    }
    
    const finalMcqs = [...questionsFromDb, ...generatedMcqs];

    // Optional: Shuffle the final list so the user doesn't know which were cached.
    finalMcqs.sort(() => Math.random() - 0.5);

    return { mcqs: finalMcqs };

  } catch (error) {
    console.error('Error in generateMcqAction:', error);
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

export async function generateLearnQuizAction(
  input: GenerateLearnQuizInput
): Promise<{ mcqs?: GenerateLearnQuizOutput['mcqs']; error?: string }> {
    try {
        const result = await generateLearnQuiz(input);
        if (!result || !result.mcqs || result.mcqs.length === 0) {
            return { error: 'Could not generate a lesson for this topic. Please try again.' };
        }
        return { mcqs: result.mcqs };
    } catch (error) {
        console.error('Error generating learn quiz:', error);
        return { error: 'An unexpected error occurred while generating your lesson.' };
    }
}

export async function generateQuestionSetAction(
    input: GenerateQuestionSetInput
): Promise<{ mcqs?: GenerateQuestionSetOutput['mcqs']; error?: string }> {
    try {
        const result = await generateQuestionSet(input);
        if (!result || !result.mcqs || result.mcqs.length === 0) {
            const totalQuestions = input.easy + input.moderate + input.difficult + input.extreme;
            if (totalQuestions === 0) {
                 return { error: 'Total questions must be greater than zero.' };
            }
            return { error: 'Could not generate the question set for this topic.' };
        }
        return { mcqs: result.mcqs };
    } catch (error) {
        console.error('Error generating question set:', error);
        return { error: 'An unexpected error occurred while generating the question set.' };
    }
}

export async function verifyAdminPassword(password: string): Promise<{ success: boolean }> {
    // In a real app, use a secure, hashed password comparison from a secret store
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
    return { success: password === ADMIN_PASSWORD };
}

export async function checkApiKey(): Promise<{ isSet: boolean }> {
  return { isSet: !!process.env.GOOGLE_API_KEY };
}
