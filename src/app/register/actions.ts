
'use server';

import { auth, db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, limit } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

async function createAuthUserAndFirestoreDoc(collectionName: string, data: any) {
  try {
    const { password, ...formData } = data;
    const email = collectionName === 'ngos' ? data.contactEmail : data.email;

    // Check if user already exists
     const userExistsQuery = query(collection(db, collectionName), where("email", "==", email), limit(1));
     const existingUserSnapshot = await getDocs(userExistsQuery);
     if (!existingUserSnapshot.empty) {
         return { success: false, error: 'An account with this email already exists in this category.' };
     }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await addDoc(collection(db, collectionName), {
      ...formData,
      userId: user.uid,
      status: 'pending',
      registeredAt: serverTimestamp(),
    });

    return { success: true, redirect: '/register?type=login' };
  } catch (error) {
    console.error(`Error in createAuthUserAndFirestoreDoc for ${collectionName}:`, error);
    if (error instanceof Error) {
      if (error.code === 'auth/email-already-in-use') {
        return { success: false, error: 'This email is already registered. Please log in or use a different email.' };
      }
      return { success: false, error: error.message };
    }
    return { success: false, error: `An unknown error occurred during registration.` };
  }
}

async function checkUserRole(userId: string): Promise<string> {
  const collections = ['advocates', 'ngos', 'volunteers', 'lawFirms'];
  for (const collectionName of collections) {
      const q = query(collection(db, collectionName), where("userId", "==", userId), limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
          if (collectionName === 'ngos') return '/ngo-dashboard';
          if (collectionName === 'lawFirms') return `/law-firm-dashboard/${querySnapshot.docs[0].id}`;
          return '/dashboard'; 
      }
  }
  return '/dashboard'; // Default for regular users (citizens)
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
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                errorMessage = 'Invalid email or password. Please try again.';
            } else {
                 console.error("Login Error:", error);
                errorMessage = "Failed to login. Please check console for details.";
            }
            return { success: false, error: errorMessage };
        }
        return { success: false, error: 'An unknown error occurred during login.' };
    }
}

export async function registerUser(data: any) {
  try {
    await createUserWithEmailAndPassword(auth, data.email, data.password);
    return { success: true, redirect: '/register?type=login' };
  } catch (error) {
    if (error instanceof Error) {
      if (error.code === 'auth/email-already-in-use') {
        return { success: false, error: 'This email is already registered. Please log in or use a different email.' };
      }
      return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred during registration.' };
  }
}

export async function registerAdvocate(formData: any) {
  return createAuthUserAndFirestoreDoc('advocates', formData);
}

export async function registerNgo(formData: any) {
  return createAuthUserAndFirestoreDoc('ngos', formData);
}

export async function registerVolunteer(formData: any) {
    return createAuthUserAndFirestoreDoc('volunteers', formData);
}

export async function registerLawFirm(formData: any) {
  return createAuthUserAndFirestoreDoc('lawFirms', formData);
}
