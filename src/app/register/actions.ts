
'use server';

import { auth, db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

async function saveData(collectionName: string, data: any, shouldCreateUser: boolean = true) {
  try {
    const { password, ...formData } = data;

    if (shouldCreateUser) {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, password);
      const user = userCredential.user;
      
      await addDoc(collection(db, collectionName), {
        ...formData,
        userId: user.uid,
        status: 'pending',
        registeredAt: serverTimestamp(),
      });
    } else {
        await addDoc(collection(db, collectionName), {
            ...formData,
            status: 'pending',
            registeredAt: serverTimestamp(),
        });
    }

    return { success: true };
  } catch (error) {
    console.error(`Error adding document to ${collectionName}: `, error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: `An unknown error occurred while registering.` };
  }
}

export async function login(data: any) {
    try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        return { success: true };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: 'An unknown error occurred during login.' };
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
