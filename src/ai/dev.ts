import { config } from 'dotenv';
config();

import '@/ai/flows/generate-mcq.ts';
import '@/ai/flows/analyze-quiz-flow.ts';
import '@/ai/flows/generate-from-concepts-flow.ts';
