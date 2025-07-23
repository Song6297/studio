
'use server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { generateEbrief } from '@/ai/flows/generate-ebrief';
import type { GenerateEbriefOutput } from '@/ai/flows/generate-ebrief';

interface CaseData {
  id: string;
  fullName: string;
  caseCategory: string;
  description: string;
  [key: string]: any;
}


export async function getEbriefForCase(caseId: string): Promise<{ data?: GenerateEbriefOutput; error?: string }> {
  if (!caseId) {
    return { error: 'Case ID is required.' };
  }

  try {
    const caseDocRef = doc(db, 'cases', caseId);
    const docSnap = await getDoc(caseDocRef);

    if (!docSnap.exists()) {
      return { error: 'Case not found.' };
    }

    const caseData = { id: docSnap.id, ...docSnap.data() } as CaseData;

    const result = await generateEbrief({
      caseId: caseData.id,
      fullName: caseData.fullName,
      caseCategory: caseData.caseCategory,
      description: caseData.description,
    });
    
    return { data: result };
  } catch (e) {
    console.error('Error generating eBrief:', e);
    if (e instanceof Error) {
        return { error: e.message };
    }
    return { error: 'An unexpected error occurred while generating the eBrief.' };
  }
}
