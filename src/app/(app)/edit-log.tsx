import { useMemo } from 'react';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';

import { LogEntryForm, logToDraft } from '@/components/LogEntryForm';
import { ScreenShell } from '@/components/ScreenShell';
import { useAuthStore } from '@/stores/authStore';
import { useLogsStore } from '@/stores/logsStore';
import { usePeptidesStore } from '@/stores/peptidesStore';

export default function EditLogScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const user = useAuthStore((state) => state.user);
  const logs = useLogsStore((state) => state.items);
  const updateLog = useLogsStore((state) => state.update);
  const peptides = usePeptidesStore((state) => state.items);

  const log = useMemo(() => logs.find((item) => item.id === id), [id, logs]);

  if (!id || !log) {
    return <Redirect href="/(app)/history" />;
  }

  const handleSubmit = async (draft: ReturnType<typeof logToDraft>) => {
    if (!user) {
      return;
    }

    const peptide = peptides.find((item) => item.id === draft.peptideId);

    if (!peptide) {
      throw new Error('Choose a peptide before saving.');
    }

    await updateLog(
      user.uid,
      log.id,
      {
        ...draft,
        dose: Number(draft.dose),
        siteId: draft.siteId,
      },
      peptide,
    );

    router.replace('/(app)/history');
  };

  return (
    <ScreenShell subtitle="Adjust a single log entry and save the updated details." title="Edit log">
      <LogEntryForm
        initialValue={logToDraft(log)}
        peptides={peptides}
        recentLogs={logs.filter((entry) => entry.id !== log.id)}
        submitLabel="Save changes"
        onSubmit={handleSubmit}
      />
    </ScreenShell>
  );
}

