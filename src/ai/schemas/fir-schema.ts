
import {z} from 'genkit';

export const GenerateFirDraftInputSchema = z.object({
  complainantName: z.string().min(1, "Complainant name is required.").describe("The full name of the person filing the complaint."),
  complainantAddress: z.string().min(1, "Complainant address is required.").describe("The full address of the complainant."),
  complainantContact: z.string().min(1, "Complainant contact is required.").describe("The contact number of the complainant."),
  crimeType: z.enum(['upi_fraud', 'social_media_harassment', 'online_shopping_fraud', 'other']).describe("The type of cybercrime."),
  incidentDate: z.string().min(1, "Incident date is required.").describe("The date and approximate time when the incident occurred."),
  accusedDetails: z.string().min(1, "Accused details are required.").describe("Any known details about the accused person or entity (name, username, phone number, website, etc.). 'Unknown' if not available."),
  incidentDescription: z.string().min(20, "A detailed description of at least 20 characters is required.").describe("A detailed chronological description of the events that occurred."),
  financialLoss: z.string().optional().describe("The amount of financial loss, if any. e.g., '₹50,000'"),
  transactionDetails: z.string().optional().describe("For financial fraud, include transaction IDs, bank account numbers (of complainant and accused if known), and payment gateway details."),
  evidenceDetails: z.string().min(1, "Evidence details are required.").describe("A list of digital evidence available (e.g., screenshots, call recordings, emails, URLs)."),
});
export type GenerateFirDraftInput = z.infer<typeof GenerateFirDraftInputSchema>;

export const GenerateFirDraftOutputSchema = z.object({
  firDraft: z.string().describe("The complete, ready-to-use FIR draft in a formal letter format."),
});
export type GenerateFirDraftOutput = z.infer<typeof GenerateFirDraftOutputSchema>;
