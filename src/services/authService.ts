import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { auth, hasConfig, isDemoMode } from '@/lib/firebase';

const demoUser = {
  uid: 'demo-user',
  email: 'demo@peptilog.local',
  isAnonymous: true,
} as User;

const requireAuth = () => {
  if (!hasConfig || !auth) {
    throw new Error('Firebase Auth is not configured yet.');
  }

  return auth;
};

export const authService = {
  subscribe: (callback: (user: User | null) => void) => {
    if (isDemoMode) {
      callback(demoUser);
      return () => undefined;
    }

    if (!hasConfig || !auth) {
      callback(null);
      return () => undefined;
    }

    return onAuthStateChanged(auth, callback);
  },
  signIn: (email: string, password: string) =>
    isDemoMode ? Promise.resolve() : signInWithEmailAndPassword(requireAuth(), email, password),
  signUp: (email: string, password: string) =>
    isDemoMode ? Promise.resolve() : createUserWithEmailAndPassword(requireAuth(), email, password),
  signOut: () => (isDemoMode ? Promise.resolve() : signOut(requireAuth())),
};
