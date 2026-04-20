import { User } from 'firebase/auth';
import { create } from 'zustand';

import { authService } from '@/services/authService';

type AuthStatus = 'loading' | 'authenticated' | 'signedOut';

interface AuthStore {
  user: User | null;
  status: AuthStatus;
  error: string | null;
  initialized: boolean;
  initialize: () => () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

let unsubscribe: (() => void) | null = null;

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  status: 'loading',
  error: null,
  initialized: false,
  initialize: () => {
    if (unsubscribe) {
      return unsubscribe;
    }

    unsubscribe = authService.subscribe((user) => {
      set({
        user,
        status: user ? 'authenticated' : 'signedOut',
        initialized: true,
      });
    });

    return () => {
      unsubscribe?.();
      unsubscribe = null;
    };
  },
  signIn: async (email, password) => {
    try {
      set({ error: null });
      await authService.signIn(email.trim(), password);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unable to sign in.' });
      throw error;
    }
  },
  signUp: async (email, password) => {
    try {
      set({ error: null });
      await authService.signUp(email.trim(), password);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unable to create an account.' });
      throw error;
    }
  },
  signOut: async () => {
    await authService.signOut();
  },
  clearError: () => set({ error: null }),
}));

