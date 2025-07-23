
'use server';

/**
 * @fileOverview An AI agent to generate a case eBrief.
 *
 * - generateEbrief - A function that handles the eBrief generation process.
 * - GenerateEbriefInput - The input type for the generateEbrief function.
 * - GenerateEbriefOutput - The return type for the generateEbrief function.
 */

import {ai} from '@/ai/init';
import {z} from 'genkit';

const GenerateEbriefInputSchema = z.object({
  caseId: z.string().describe('The unique ID of the case.'),
  caseCategory: z.string().describe('The category of the case (e.g., Property Law, Criminal Law).'),
  description: z.string().describe('The detailed description of the case provided by the citizen.'),
  fullName: z.string().describe('The full name of the citizen who submitted the case.'),
});
export type GenerateEbriefInput = z.infer<typeof GenerateEbriefInputSchema>;

const GenerateEbriefOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the case facts.'),
  legalIssues: z.array(z.string()).describe('A list of potential legal issues identified from the case description.'),
  applicableLaws: z.string().describe('A brief overview of potentially applicable Indian laws or legal principles.'),
  suggestedNextSteps: z.string().describe('A list of suggested next steps for the user or their legal counsel.'),
});
export type GenerateEbriefOutput = z.infer<typeof GenerateEbriefOutputSchema>;

export async function generateEbrief(input: GenerateEbriefInput): Promise<GenerateEbriefOutput> {
  return generateEbriefFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEbriefPrompt',
  input: {schema: GenerateEbriefInputSchema},
  output: {schema: GenerateEbriefOutputSchema},
  prompt: `You are an expert paralegal in the Indian legal system. Your task is to generate a professional eBrief for the following case.

Case Details:
- Case ID: {{{caseId}}}
- Client Name: {{{fullName}}}
- Case Category: {{{caseCategory}}}
- Case Description: {{{description}}}

Based on the information provided, generate a structured eBrief.
- The summary should be a neutral, factual overview of the situation.
- Identify the core legal questions or conflicts as a list of legal issues.
- Briefly mention the primary area of Indian law that might apply (e.g., "This case may fall under the Indian Contract Act, 1872" or "This appears to be a matter of Consumer Protection Law"). Do not cite specific sections unless they are obvious and critical.
- Provide a clear, actionable list of suggested next steps for the citizen or their lawyer. Examples: "Gather all relevant documentation," "Consult with a lawyer specializing in [Category]," "Consider sending a legal notice."
`,
});

const generateEbriefFlow = ai.defineFlow(
  {
    name: 'generateEbriefFlow',
    inputSchema: GenerateEbriefInputSchema,
    outputSchema: GenerateEbriefOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
