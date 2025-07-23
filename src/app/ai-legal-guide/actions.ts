
'use server';
import { generateLegalAdvice } from '@/ai/flows/generate-legal-advice';

export async function getLegalAdvice(query: string) {
  if (!query || query.trim().length < 10) {
    return { error: 'Please enter a query of at least 10 characters.' };
  }

  try {
    const result = await generateLegalAdvice({ query });
    return { data: result.advice };
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred while generating advice.' };
  }
}
