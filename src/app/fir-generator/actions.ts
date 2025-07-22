
'use server';
import { generateFirDraft } from '@/ai/flows/generate-fir-draft';
import type { GenerateFirDraftInput } from '@/ai/flows/generate-fir-draft';


export async function getFirDraft(input: GenerateFirDraftInput) {
  try {
    const result = await generateFirDraft(input);
    return { data: result.firDraft };
  } catch (e) {
    console.error(e);
    if(e instanceof Error) return { error: e.message };
    return { error: 'An unexpected error occurred while generating the FIR draft.' };
  }
}
