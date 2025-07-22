'use server';
import { generateBreachAdvice, type GenerateBreachAdviceInput } from '@/ai/flows/generate-breach-advice';

export async function getBreachAdvice(input: GenerateBreachAdviceInput) {
  if (!input.incidentDescription || input.incidentDescription.trim().length < 20) {
    return { error: 'Please enter a description of at least 20 characters.' };
  }

  try {
    const result = await generateBreachAdvice(input);
    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred while generating advice.' };
  }
}
