
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function submitCase(formData: any, userId: string | null) {
  if (!userId) {
    return { success: false, error: 'You must be logged in to submit a case.' };
  }

  try {
    const docRef = await addDoc(collection(db, 'cases'), {
      ...formData,
      userId: userId,
      submittedAt: serverTimestamp(),
      status: 'new'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    if (error instanceof Error) {
        return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred.' };
  }
}
