import { config } from 'dotenv';
config();

import '@/ai/flows/generate-legal-advice.ts';
import '@/ai/flows/generate-ebrief.ts';
import '@/ai/flows/generate-breach-advice.ts';
import '@/ai/flows/generate-fir-draft.ts';
