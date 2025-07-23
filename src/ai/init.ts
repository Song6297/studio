'use server';

/**
 * @fileoverview This file initializes the Genkit AI object and registers all flows.
 * It is meant to be imported by server-side processes only.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});

// Import flows to register them with Genkit
import './flows/generate-legal-advice';
import './flows/generate-ebrief';
import './flows/generate-breach-advice';
