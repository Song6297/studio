
'use server';

import { auth, db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, limit } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

async function saveData(collectionName: string, data: any, shouldCreateUser: boolean = true) {
  try {
    const { password, ...formData } = data;
    let email = data.email;
    if (collectionName === 'ngos') {
      email = data.contactEmail;
    }


    if (shouldCreateUser) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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

async function checkUserRole(userId: string): Promise<string> {
    const collections = ['advocates', 'ngos', 'volunteers'];
    for (const collectionName of collections) {
        const q = query(collection(db, collectionName), where("userId", "==", userId), limit(1));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            if (collectionName === 'ngos') return '/ngo-dashboard';
            // Add other role-based redirects here if needed
            return '/dashboard'; 
        }
    }
    return '/dashboard'; // Default for regular users
}


export async function login(data: any) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
        const redirectPath = await checkUserRole(user.uid);
        return { success: true, redirect: redirectPath };
    } catch (error) {
        if (error instanceof Error) {
            let errorMessage = "An unexpected error occurred.";
            if (error.message.includes('auth/invalid-credential') || error.message.includes('auth/user-not-found') || error.message.includes('auth/wrong-password')) {
                errorMessage = 'Invalid email or password. Please try again.';
            }
            return { success: false, error: errorMessage };
        }
        return { success: false, error: 'An unknown error occurred during login.' };
    }
}


export async function registerAdvocate(formData: any) {
  return saveData('advocates', formData);
}

export async function registerNgo(formData: any) {
  // Use contactEmail for authentication
  const authData = { ...formData, email: formData.contactEmail };
  return saveData('ngos', authData);
}

export async function registerVolunteer(formData: any) {
    return saveData('volunteers', formData);
}
