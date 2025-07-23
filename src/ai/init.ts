
/**
 * @fileoverview This file initializes the Genkit AI object.
 * It is meant to be imported by server-side processes only.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// This is the primary AI configuration for the application.
// It is used by all AI flows.
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
