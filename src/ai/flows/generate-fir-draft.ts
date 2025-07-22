
'use server';

/**
 * @fileOverview An AI agent to generate a draft for a First Information Report (FIR) for cybercrimes.
 *
 * - generateFirDraft - A function that handles the FIR draft generation.
 */

import {ai} from '@/ai/genkit';
import { GenerateFirDraftInputSchema, GenerateFirDraftOutputSchema, type GenerateFirDraftInput, type GenerateFirDraftOutput } from '@/ai/schemas/fir-schema';


export async function generateFirDraft(input: GenerateFirDraftInput): Promise<GenerateFirDraftOutput> {
  return generateFirDraftFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFirDraftPrompt',
  input: {schema: GenerateFirDraftInputSchema},
  output: {schema: GenerateFirDraftOutputSchema},
  prompt: `You are an expert legal assistant specializing in drafting First Information Reports (FIRs) for cybercrime cases in India.
Generate a formal, well-structured FIR draft based on the user's input. The tone should be formal and clear.

The FIR should be addressed "To, The Station House Officer, Cyber Crime Police Station".

The draft must include the following sections clearly labeled:
1.  **Subject**: A concise subject line stating the nature of the complaint.
2.  **Complainant's Details**: Name, Address, and Contact Number.
3.  **Details of the Incident**: A chronological and detailed account of the events.
4.  **Details of the Accused**: Information provided by the user about the accused.
5.  **Type of Offense**: Identify the nature of the cybercrime.
6.  **Evidence Attached**: List the evidence the complainant has.
7.  **Prayer**: A formal request to register the FIR and take necessary legal action.

Based on the crime type and description, suggest potentially applicable sections of the Indian Penal Code (IPC) and the Information Technology (IT) Act, 2000. For example:
- For UPI fraud: Mention Sections 420 (Cheating), 406 (Criminal Breach of Trust) of IPC, and Section 66D of the IT Act.
- For Social Media Harassment: Mention Sections 509 (Insulting the modesty of a woman), 507 (Criminal intimidation by anonymous communication) of IPC, and Section 67 of the IT Act.

User's Information:
- Complainant Name: {{{complainantName}}}
- Complainant Address: {{{complainantAddress}}}
- Complainant Contact: {{{complainantContact}}}
- Crime Type: {{{crimeType}}}
- Date of Incident: {{{incidentDate}}}
- Accused Details: {{{accusedDetails}}}
- Incident Description: {{{incidentDescription}}}
{{#if financialLoss}}
- Financial Loss: {{{financialLoss}}}
{{/if}}
{{#if transactionDetails}}
- Transaction Details: {{{transactionDetails}}}
{{/if}}
- Evidence: {{{evidenceDetails}}}

Generate the complete FIR draft now.
`,
});

const generateFirDraftFlow = ai.defineFlow(
  {
    name: 'generateFirDraftFlow',
    inputSchema: GenerateFirDraftInputSchema,
    outputSchema: GenerateFirDraftOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
