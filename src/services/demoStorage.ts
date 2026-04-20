import { LogEntry, Peptide } from '@/models/types';
import { toIsoNow } from '@/utils/date';

type DemoState = {
  peptides: Peptide[];
  logs: LogEntry[];
};

const STORAGE_KEY = 'peptilog-demo-state-v1';
const defaultTimestamp = toIsoNow();

const defaultState: DemoState = {
  peptides: [
    {
      id: 'demo-peptide-1',
      name: 'Demo Peptide A',
      nickname: 'AM',
      createdAt: defaultTimestamp,
    },
    {
      id: 'demo-peptide-2',
      name: 'Demo Peptide B',
      nickname: 'PM',
      createdAt: defaultTimestamp,
    },
  ],
  logs: [
    {
      id: 'demo-log-1',
      peptideId: 'demo-peptide-1',
      peptideName: 'Demo Peptide A',
      dose: 250,
      unit: 'mcg',
      route: 'subcutaneous',
      siteId: 'left-abdomen',
      siteLabel: 'Left abdomen',
      timestamp: defaultTimestamp,
      notes: 'Demo entry for the GitHub Pages build.',
      mood: 3,
      energy: 4,
      focus: 3,
      createdAt: defaultTimestamp,
      updatedAt: defaultTimestamp,
    },
  ],
};

function canUseStorage() {
  return typeof localStorage !== 'undefined';
}

function cloneDefaultState(): DemoState {
  return {
    peptides: [...defaultState.peptides],
    logs: [...defaultState.logs],
  };
}

export function readDemoState(): DemoState {
  if (!canUseStorage()) {
    return cloneDefaultState();
  }

  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    const initial = cloneDefaultState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  try {
    const parsed = JSON.parse(raw) as DemoState;
    return {
      peptides: parsed.peptides ?? [],
      logs: parsed.logs ?? [],
    };
  } catch {
    const initial = cloneDefaultState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
}

export function writeDemoState(state: DemoState) {
  if (!canUseStorage()) {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
