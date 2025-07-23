/**
 * @fileoverview This file initializes the Genkit AI object.
 * It is meant to be imported by server-side processes only.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
