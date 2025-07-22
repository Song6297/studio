
'use server';

/**
 * @fileOverview An AI agent to generate a draft for a First Information Report (FIR) for cybercrimes.
 *
 * - generateFirDraft - A function that handles the FIR draft generation.
 * - GenerateFirDraftInput - The input type for the generateFirDraft function.
 * - GenerateFirDraftOutput - The return type for the generateFirDraft function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenerateFirDraftInputSchema = z.object({
  complainantName: z.string().describe("The full name of the person filing the complaint."),
  complainantAddress: z.string().describe("The full address of the complainant."),
  complainantContact: z.string().describe("The contact number of the complainant."),
  crimeType: z.enum(['upi_fraud', 'social_media_harassment', 'online_shopping_fraud', 'other']).describe("The type of cybercrime."),
  incidentDate: z.string().describe("The date and approximate time when the incident occurred."),
  accusedDetails: z.string().describe("Any known details about the accused person or entity (name, username, phone number, website, etc.). 'Unknown' if not available."),
  incidentDescription: z.string().describe("A detailed chronological description of the events that occurred."),
  financialLoss: z.string().optional().describe("The amount of financial loss, if any. e.g., '₹50,000'"),
  transactionDetails: z.string().optional().describe("For financial fraud, include transaction IDs, bank account numbers (of complainant and accused if known), and payment gateway details."),
  evidenceDetails: z.string().describe("A list of digital evidence available (e.g., screenshots, call recordings, emails, URLs)."),
});
export type GenerateFirDraftInput = z.infer<typeof GenerateFirDraftInputSchema>;

export const GenerateFirDraftOutputSchema = z.object({
  firDraft: z.string().describe("The complete, ready-to-use FIR draft in a formal letter format."),
});
export type GenerateFirDraftOutput = z.infer<typeof GenerateFirDraftOutputSchema>;

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
