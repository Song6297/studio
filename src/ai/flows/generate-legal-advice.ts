
'use server';

/**
 * @fileOverview A legal advice AI agent based on the Indian legal system.
 *
 * - generateLegalAdvice - A function that handles the legal advice generation process.
 * - GenerateLegalAdviceInput - The input type for the generateLegalAdvice function.
 * - GenerateLegalAdviceOutput - The return type for the generateLegalAdvice function.
 */

import {ai} from '@/ai/init';
import {z} from 'genkit';

const GenerateLegalAdviceInputSchema = z.object({
  query: z.string().describe('The legal question from the citizen.'),
});
export type GenerateLegalAdviceInput = z.infer<typeof GenerateLegalAdviceInputSchema>;

const GenerateLegalAdviceOutputSchema = z.object({
  advice: z.string().describe('The generated legal advice based on the Indian legal system.'),
});
export type GenerateLegalAdviceOutput = z.infer<typeof GenerateLegalAdviceOutputSchema>;

export async function generateLegalAdvice(input: GenerateLegalAdviceInput): Promise<GenerateLegalAdviceOutput> {
  return generateLegalAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLegalAdvicePrompt',
  input: {schema: GenerateLegalAdviceInputSchema},
  output: {schema: GenerateLegalAdviceOutputSchema},
  prompt: `You are an AI Legal Guide, providing preliminary legal advice based on the Indian legal system. This advice is not a substitute for an attorney and should not be considered as such.\n\nUser Question: {{{query}}}\n\nPreliminary Legal Advice:`,
});

const generateLegalAdviceFlow = ai.defineFlow(
  {
    name: 'generateLegalAdviceFlow',
    inputSchema: GenerateLegalAdviceInputSchema,
    outputSchema: GenerateLegalAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
