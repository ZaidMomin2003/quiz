import { config } from 'dotenv';
config();

import '@/ai/flows/generate-mcq.ts';
import '@/ai/flows/analyze-quiz-flow.ts';
import '@/ai/flows/generate-from-concepts-flow.ts';
import '@/ai/flows/generate-learn-quiz.ts';
import '@/ai/flows/generate-question-set-flow.ts';
