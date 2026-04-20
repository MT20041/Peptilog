import { useEffect } from 'react';

import { useAuthStore } from '@/stores/authStore';
import { useLogsStore } from '@/stores/logsStore';
import { usePeptidesStore } from '@/stores/peptidesStore';

export const useBootstrapData = () => {
  const user = useAuthStore((state) => state.user);
  const initialize = useAuthStore((state) => state.initialize);
  const loadPeptides = usePeptidesStore((state) => state.load);
  const resetPeptides = usePeptidesStore((state) => state.reset);
  const loadLogs = useLogsStore((state) => state.load);
  const resetLogs = useLogsStore((state) => state.reset);

  useEffect(() => initialize(), [initialize]);

  useEffect(() => {
    if (!user) {
      resetPeptides();
      resetLogs();
      return;
    }

    loadPeptides(user.uid);
    loadLogs(user.uid);
  }, [loadLogs, loadPeptides, resetLogs, resetPeptides, user]);
};

