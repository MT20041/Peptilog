import { create } from 'zustand';

import { PeptideInput, peptideSchema } from '@/models/schemas';
import { Peptide } from '@/models/types';
import { peptideService } from '@/services/peptideService';

interface PeptidesStore {
  items: Peptide[];
  loading: boolean;
  error: string | null;
  load: (userId: string) => Promise<void>;
  add: (userId: string, input: PeptideInput) => Promise<void>;
  remove: (userId: string, id: string) => Promise<void>;
  reset: () => void;
}

export const usePeptidesStore = create<PeptidesStore>((set, get) => ({
  items: [],
  loading: false,
  error: null,
  load: async (userId) => {
    set({ loading: true, error: null });

    try {
      const items = await peptideService.list(userId);
      set({ items, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unable to load peptides.', loading: false });
    }
  },
  add: async (userId, input) => {
    const parsed = peptideSchema.parse(input);
    await peptideService.create(userId, parsed);
    await get().load(userId);
  },
  remove: async (userId, id) => {
    await peptideService.remove(userId, id);
    await get().load(userId);
  },
  reset: () => set({ items: [], loading: false, error: null }),
}));

