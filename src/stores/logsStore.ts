import { create } from 'zustand';

import { LogEntryInput, logEntrySchema } from '@/models/schemas';
import { LogEntry, Peptide } from '@/models/types';
import { logService } from '@/services/logService';

interface LogsStore {
  items: LogEntry[];
  loading: boolean;
  error: string | null;
  load: (userId: string) => Promise<void>;
  add: (userId: string, input: LogEntryInput, peptide: Peptide) => Promise<void>;
  update: (userId: string, logId: string, input: LogEntryInput, peptide: Peptide) => Promise<void>;
  remove: (userId: string, logId: string) => Promise<void>;
  reset: () => void;
}

export const useLogsStore = create<LogsStore>((set, get) => ({
  items: [],
  loading: false,
  error: null,
  load: async (userId) => {
    set({ loading: true, error: null });

    try {
      const items = await logService.list(userId);
      set({ items, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unable to load history.', loading: false });
    }
  },
  add: async (userId, input, peptide) => {
    const parsed = logEntrySchema.parse(input);
    await logService.create(userId, parsed, peptide);
    await get().load(userId);
  },
  update: async (userId, logId, input, peptide) => {
    const parsed = logEntrySchema.parse(input);
    await logService.update(userId, logId, parsed, peptide);
    await get().load(userId);
  },
  remove: async (userId, logId) => {
    await logService.remove(userId, logId);
    await get().load(userId);
  },
  reset: () => set({ items: [], loading: false, error: null }),
}));

