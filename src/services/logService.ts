import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

import { BODY_ZONE_MAP } from '@/models/bodyZones';
import { LogEntryInput } from '@/models/schemas';
import { LogEntry, Peptide } from '@/models/types';
import { db, hasConfig } from '@/lib/firebase';
import { logsPath } from '@/services/firestorePaths';
import { fromDateTimeLocal, toIsoNow } from '@/utils/date';

const requireDb = () => {
  if (!hasConfig || !db) {
    throw new Error('Firestore is not configured yet.');
  }

  return db;
};

const toLogEntry = (id: string, data: Record<string, unknown>): LogEntry => ({
  id,
  peptideId: String(data.peptideId ?? ''),
  peptideName: String(data.peptideName ?? ''),
  dose: Number(data.dose ?? 0),
  unit: String(data.unit ?? 'mg') as LogEntry['unit'],
  route: String(data.route ?? 'subcutaneous') as LogEntry['route'],
  siteId: String(data.siteId ?? '') as LogEntry['siteId'],
  siteLabel: String(data.siteLabel ?? ''),
  timestamp: String(data.timestamp ?? toIsoNow()),
  notes: data.notes ? String(data.notes) : undefined,
  mood: typeof data.mood === 'number' ? data.mood : undefined,
  energy: typeof data.energy === 'number' ? data.energy : undefined,
  focus: typeof data.focus === 'number' ? data.focus : undefined,
  createdAt: String(data.createdAt ?? toIsoNow()),
  updatedAt: String(data.updatedAt ?? toIsoNow()),
});

export const logService = {
  async list(userId: string) {
    const firestore = requireDb();
    const reference = collection(firestore, logsPath(userId));
    const snapshot = await getDocs(query(reference, orderBy('timestamp', 'desc')));
    return snapshot.docs.map((item) => toLogEntry(item.id, item.data()));
  },
  async create(userId: string, input: LogEntryInput, peptide: Peptide) {
    const timestamp = input.timestamp.includes('T') ? fromDateTimeLocal(input.timestamp) : input.timestamp;
    const now = toIsoNow();
    const zone = BODY_ZONE_MAP[input.siteId];
    const firestore = requireDb();

    await addDoc(collection(firestore, logsPath(userId)), {
      peptideId: input.peptideId,
      peptideName: peptide.name,
      dose: input.dose,
      unit: input.unit,
      route: input.route,
      siteId: input.siteId,
      siteLabel: zone?.label ?? input.siteId,
      timestamp,
      notes: input.notes?.trim() || null,
      mood: input.mood ?? null,
      energy: input.energy ?? null,
      focus: input.focus ?? null,
      createdAt: now,
      updatedAt: now,
      serverCreatedAt: serverTimestamp(),
      serverUpdatedAt: serverTimestamp(),
    });
  },
  async update(userId: string, logId: string, input: LogEntryInput, peptide: Peptide) {
    const timestamp = input.timestamp.includes('T') ? fromDateTimeLocal(input.timestamp) : input.timestamp;
    const zone = BODY_ZONE_MAP[input.siteId];
    const firestore = requireDb();

    await updateDoc(doc(firestore, logsPath(userId), logId), {
      peptideId: input.peptideId,
      peptideName: peptide.name,
      dose: input.dose,
      unit: input.unit,
      route: input.route,
      siteId: input.siteId,
      siteLabel: zone?.label ?? input.siteId,
      timestamp,
      notes: input.notes?.trim() || null,
      mood: input.mood ?? null,
      energy: input.energy ?? null,
      focus: input.focus ?? null,
      updatedAt: toIsoNow(),
      serverUpdatedAt: serverTimestamp(),
    });
  },
  async remove(userId: string, logId: string) {
    await deleteDoc(doc(requireDb(), logsPath(userId), logId));
  },
};
