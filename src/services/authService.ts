import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { auth, hasConfig } from '@/lib/firebase';

const requireAuth = () => {
  if (!hasConfig || !auth) {
    throw new Error('Firebase Auth is not configured yet.');
  }

  return auth;
};

export const authService = {
  subscribe: (callback: (user: User | null) => void) => {
    if (!hasConfig || !auth) {
      callback(null);
      return () => undefined;
    }

    return onAuthStateChanged(auth, callback);
  },
  signIn: (email: string, password: string) => signInWithEmailAndPassword(requireAuth(), email, password),
  signUp: (email: string, password: string) => createUserWithEmailAndPassword(requireAuth(), email, password),
  signOut: () => signOut(requireAuth()),
};
