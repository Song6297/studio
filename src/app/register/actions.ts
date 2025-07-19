
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

async function saveData(collectionName: string, data: any) {
  try {
    // For simplicity, we are not handling password hashing.
    // In a real application, NEVER store plain text passwords.
    const { password, ...formData } = data;
    
    await addDoc(collection(db, collectionName), {
      ...formData,
      status: 'pending',
      registeredAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error(`Error adding document to ${collectionName}: `, error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: `An unknown error occurred while registering.` };
  }
}


export async function registerAdvocate(formData: any) {
  return saveData('advocates', formData);
}

export async function registerNgo(formData: any) {
  return saveData('ngos', formData);
}

export async function registerVolunteer(formData: any) {
    return saveData('volunteers', formData);
}

    