import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';

import { db, hasConfig, isDemoMode } from '@/lib/firebase';
import { PeptideInput } from '@/models/schemas';
import { Peptide } from '@/models/types';
import { readDemoState, writeDemoState } from '@/services/demoStorage';
import { peptidesPath } from '@/services/firestorePaths';
import { toIsoNow } from '@/utils/date';

const requireDb = () => {
  if (!hasConfig || !db) {
    throw new Error('Firestore is not configured yet.');
  }

  return db;
};

const fromFirestore = (id: string, data: Record<string, unknown>): Peptide => ({
  id,
  name: String(data.name ?? ''),
  nickname: data.nickname ? String(data.nickname) : undefined,
  createdAt: String(data.createdAt ?? toIsoNow()),
});

export const peptideService = {
  async list(userId: string) {
    if (isDemoMode) {
      return readDemoState().peptides.sort((a, b) => a.name.localeCompare(b.name));
    }

    const firestore = requireDb();
    const snapshot = await getDocs(query(collection(firestore, peptidesPath(userId)), orderBy('name', 'asc')));
    return snapshot.docs.map((item) => fromFirestore(item.id, item.data()));
  },
  async create(userId: string, input: PeptideInput) {
    if (isDemoMode) {
      const state = readDemoState();
      state.peptides.push({
        id: `demo-peptide-${Date.now()}`,
        name: input.name.trim(),
        nickname: input.nickname?.trim() || undefined,
        createdAt: toIsoNow(),
      });
      writeDemoState(state);
      return;
    }

    const timestamp = toIsoNow();
    const firestore = requireDb();

    await addDoc(collection(firestore, peptidesPath(userId)), {
      name: input.name.trim(),
      nickname: input.nickname?.trim() || null,
      createdAt: timestamp,
      serverCreatedAt: serverTimestamp(),
    });
  },
  async remove(userId: string, id: string) {
    if (isDemoMode) {
      const state = readDemoState();
      state.peptides = state.peptides.filter((item) => item.id !== id);
      state.logs = state.logs.filter((item) => item.peptideId !== id);
      writeDemoState(state);
      return;
    }

    await deleteDoc(doc(requireDb(), peptidesPath(userId), id));
  },
};
