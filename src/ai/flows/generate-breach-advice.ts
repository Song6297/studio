'use server';

/**
 * @fileOverview An AI agent to provide advice on data breaches under Indian law.
 *
 * - generateBreachAdvice - A function that handles the data breach advice generation process.
 * - GenerateBreachAdviceInput - The input type for the generateBreachAdvice function.
 * - GenerateBreachAdviceOutput - The return type for the generateBreachAdvice function.
 */

import {ai} from '@/ai/init';
import {z} from 'genkit';

const GenerateBreachAdviceInputSchema = z.object({
  incidentDescription: z.string().describe('A detailed description of the security incident or data breach.'),
  isBusiness: z.boolean().describe('Whether the user is a business/organization or an individual.'),
  isPersonalDataInvolved: z.boolean().describe('Whether personal data of Indian citizens was compromised.'),
  dataTypes: z.string().describe('The types of data involved (e.g., financial, contact, health).'),
});
export type GenerateBreachAdviceInput = z.infer<typeof GenerateBreachAdviceInputSchema>;

const GenerateBreachAdviceOutputSchema = z.object({
  legalDuties: z.string().describe("An explanation of the user's legal duties under Indian law, specifically the Digital Personal Data Protection (DPDP) Act and CERT-In reporting requirements."),
  notificationDraft: z.string().describe("A ready-to-use draft for notifying affected individuals about the breach."),
  mitigationChecklist: z.array(z.string()).describe("A checklist of immediate technical and procedural steps to contain the breach."),
  evidencePreservation: z.string().describe("Guidance on how to properly preserve digital evidence for potential legal action."),
});
export type GenerateBreachAdviceOutput = z.infer<typeof GenerateBreachAdviceOutputSchema>;

export async function generateBreachAdvice(input: GenerateBreachAdviceInput): Promise<GenerateBreachAdviceOutput> {
  return generateBreachAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBreachAdvicePrompt',
  input: {schema: GenerateBreachAdviceInputSchema},
  output: {schema: GenerateBreachAdviceOutputSchema},
  prompt: `You are an AI-powered Data Breach Advisor specializing in the Indian legal framework.
A user has experienced a security incident and needs a clear, actionable plan.

User's Situation:
- User is a: {{{isBusiness ? 'Business/Organization' : 'Private Individual'}}}
- Personal data of Indian citizens involved: {{{isPersonalDataInvolved}}}
- Types of data compromised: {{{dataTypes}}}
- Incident Description: {{{incidentDescription}}}

Based on this, generate a 4-part action plan.

1.  **Legal Duties**:
    - If personal data was involved, explain the reporting obligations under India's Digital Personal Data Protection (DPDP) Act, 2023. Mention the need to notify the Data Protection Board of India and affected individuals.
    - Explain the requirement to report cybersecurity incidents to the Indian Computer Emergency Response Team (CERT-In) within 6 hours of noticing the incident, as per the CERT-In directions.
    - If the user is an individual, explain that while they may not have direct reporting duties unless they are a business, they should report the matter to the National Cyber Crime Reporting Portal (www.cybercrime.gov.in).

2.  **Notification Draft**:
    - Provide a clear, empathetic, and professional template for a notification email/message to affected individuals.
    - The draft should include: what happened, what information was involved, what actions are being taken, and what steps individuals can take to protect themselves. It should be a template that the user can adapt. Use placeholders like [Your Company Name] and [Date of Incident].

3.  **Mitigation Checklist**:
    - Provide a checklist of immediate, actionable steps.
    - For businesses, include: Isolate affected systems, Change all compromised credentials (passwords, API keys), Scan systems for malware, Review access logs, and Consult with a cybersecurity expert.
    - For individuals, include: Change passwords for all affected accounts immediately, Enable Two-Factor Authentication (2FA), Monitor bank/credit card statements, and Be wary of phishing emails related to the breach.

4.  **Evidence Preservation**:
    - Provide clear guidance on preserving evidence.
    - Advise the user not to turn off or wipe affected devices.
    - Instruct them to take screenshots of any relevant messages, emails, or logs.
    - Recommend making a timeline of events: when they first noticed the incident, what they saw, and what actions they took.
    - Emphasize that this evidence is critical for police complaints and legal action.

The tone should be professional, reassuring, and directive. The advice is for informational purposes and is not a substitute for professional legal or cybersecurity counsel.
`,
});

const generateBreachAdviceFlow = ai.defineFlow(
  {
    name: 'generateBreachAdviceFlow',
    inputSchema: GenerateBreachAdviceInputSchema,
    outputSchema: GenerateBreachAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
