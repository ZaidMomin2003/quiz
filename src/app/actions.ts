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
    const { topic, questionCount, difficulty } = input;
    
    // 1. Check how many questions we have in the DB for this topic.
    const questionsInDbCount = await getQuestionCountForTopic(topic, difficulty);
    
    // 2. Decide how many questions to fetch from DB vs. generate with AI.
    let questionsFromDb: GenerateMcqOutput['mcqs'] = [];
    let questionsToGenerate = questionCount;
    let fetchCount = 0;

    // This is the evolving caching logic
    if (questionsInDbCount >= 200) {
        // Mature State: We have a rich library. Use 70% from cache.
        fetchCount = Math.min(questionsInDbCount, Math.ceil(questionCount * 0.7));
    } else if (questionsInDbCount > 0) {
        // Initial State: We're building the library. Use 30% from cache.
        fetchCount = Math.min(questionsInDbCount, Math.ceil(questionCount * 0.3));
    }
    
    if (fetchCount > 0) {
        questionsFromDb = await getQuestionsFromDb(topic, difficulty, fetchCount);
    }
    
    questionsToGenerate = questionCount - questionsFromDb.length;
    
    let generatedMcqs: GenerateMcqOutput['mcqs'] = [];
    if (questionsToGenerate > 0) {
        // 3. Generate the remaining questions using the AI flow.
        console.log(`Generating ${questionsToGenerate} new questions for topic: ${topic}`);
        const result = await generateMcq({ ...input, questionCount: questionsToGenerate });
        
        if (!result || !result.mcqs || result.mcqs.length === 0) {
          // If AI fails but we have some from DB, return those. Otherwise, error.
          if (questionsFromDb.length > 0) {
              return { mcqs: questionsFromDb };
          }
          return { error: 'The AI failed to generate new questions. Please try again.' };
        }
        generatedMcqs = result.mcqs;

        // 4. Add the newly generated questions to our database for future use.
        await addQuestionsToDb(topic, difficulty, generatedMcqs);
    }
    
    const finalMcqs = [...questionsFromDb, ...generatedMcqs];

    // 5. Shuffle the final list so the user doesn't know which were cached.
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
