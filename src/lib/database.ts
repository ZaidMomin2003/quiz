// src/lib/database.ts
import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, limit, getCountFromServer, writeBatch, documentId } from 'firebase/firestore';
import type { Mcq } from './types';

const QUESTIONS_COLLECTION = 'questions';

/**
 * Adds an array of questions to the Firestore database using a batch write for efficiency.
 * @param topic The topic of the questions.
 * @param difficulty The difficulty of the questions.
 * @param questions An array of Mcq objects (without the 'difficulty' property).
 */
export async function addQuestionsToDb(topic: string, difficulty: 'easy' | 'medium' | 'hard', questions: Omit<Mcq, 'difficulty'>[]): Promise<void> {
  if (!questions.length) return;
  console.log(`Adding ${questions.length} new questions for topic "${topic}" and difficulty "${difficulty}" to the database.`);
  
  try {
    const batch = writeBatch(db);
    const questionsCollection = collection(db, QUESTIONS_COLLECTION);
    
    questions.forEach((question) => {
      const docRef = document(questionsCollection); // Auto-generate a new document ID
      batch.set(docRef, { ...question, topic, difficulty });
    });

    await batch.commit();
    console.log(`Successfully added ${questions.length} questions to the database.`);
  } catch (e) {
    console.error("Error adding documents in batch: ", e);
  }
}

/**
 * Fetches a specified number of questions for a given topic and difficulty from the database.
 * This function will attempt to fetch random documents, which is complex in Firestore.
 * A simple limit is used here, but for true randomness, more advanced techniques are needed in a production environment.
 * @param topic The topic to fetch questions for.
 * @param difficulty The difficulty of the questions.
 * @param count The number of questions to fetch.
 * @returns A promise that resolves to an array of Mcq objects.
 */
export async function getQuestionsFromDb(topic: string, difficulty: 'easy' | 'medium' | 'hard', count: number): Promise<Omit<Mcq, 'difficulty'>[]> {
   console.log(`Fetching ${count} questions for topic "${topic}" and difficulty "${difficulty}" from the database.`);
   try {
    const q = query(
      collection(db, QUESTIONS_COLLECTION),
      where("topic", "==", topic),
      where("difficulty", "==", difficulty),
      limit(count)
    );

    const querySnapshot = await getDocs(q);
    const questions = querySnapshot.docs.map(doc => {
        const data = doc.data();
        // Ensure we don't include the 'difficulty' property in the return type as specified
        const { difficulty, ...rest } = data;
        return rest as Omit<Mcq, 'difficulty'>;
    });
    console.log(`Found ${questions.length} questions in the database.`);
    return questions;
  } catch (e) {
      console.error("Error getting documents: ", e);
      return [];
  }
}

/**
 * Gets the total count of questions available for a given topic and difficulty in the database.
 * @param topic The topic to count questions for.
 * @param difficulty The difficulty of the questions.
 * @returns A promise that resolves to the number of questions.
 */
export async function getQuestionCountForTopic(topic: string, difficulty: 'easy' | 'medium' | 'hard'): Promise<number> {
  console.log(`Getting question count for topic "${topic}" and difficulty "${difficulty}" from the database.`);
  try {
    const q = query(
        collection(db, QUESTIONS_COLLECTION), 
        where("topic", "==", topic),
        where("difficulty", "==", difficulty)
    );
    const snapshot = await getCountFromServer(q);
    const count = snapshot.data().count;
    console.log(`Topic "${topic}" with difficulty "${difficulty}" has ${count} questions in the database.`);
    return count;
  } catch(e) {
    console.error("Error getting document count: ", e);
    return 0;
  }
}