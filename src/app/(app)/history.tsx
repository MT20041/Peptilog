import { useMemo, useState } from 'react';
import { useRouter } from 'expo-router';

import { EmptyState } from '@/components/EmptyState';
import { HistoryFilterBar } from '@/components/HistoryFilterBar';
import { ScreenShell } from '@/components/ScreenShell';
import { TimelineItem } from '@/components/TimelineItem';
import { useAuthStore } from '@/stores/authStore';
import { useLogsStore } from '@/stores/logsStore';
import { usePeptidesStore } from '@/stores/peptidesStore';
import { confirmAction } from '@/utils/confirm';
import { isWithinDateRange } from '@/utils/date';

export default function HistoryScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logs = useLogsStore((state) => state.items);
  const removeLog = useLogsStore((state) => state.remove);
  const peptides = usePeptidesStore((state) => state.items);

  const [selectedPeptideId, setSelectedPeptideId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredLogs = useMemo(
    () =>
      logs.filter((log) => {
        if (selectedPeptideId && log.peptideId !== selectedPeptideId) {
          return false;
        }

        return isWithinDateRange(log.timestamp, startDate || undefined, endDate || undefined);
      }),
    [endDate, logs, selectedPeptideId, startDate],
  );

  const handleDelete = async (logId: string) => {
    if (!user) {
      return;
    }

    const confirmed = await confirmAction('Delete log', 'This will remove the selected entry from your history.');

    if (!confirmed) {
      return;
    }

    await removeLog(user.uid, logId);
  };

  return (
    <ScreenShell subtitle="Review entries, narrow by peptide, and adjust individual records." title="History">
      <HistoryFilterBar
        endDate={endDate}
        onChangeEndDate={setEndDate}
        onChangePeptide={setSelectedPeptideId}
        onChangeStartDate={setStartDate}
        peptides={peptides}
        selectedPeptideId={selectedPeptideId}
        startDate={startDate}
      />

      {!filteredLogs.length ? (
        <EmptyState
          description="No entries match the current filter set."
          title="Nothing to show"
        />
      ) : (
        filteredLogs.map((log) => (
          <TimelineItem
            key={log.id}
            log={log}
            onDelete={() => handleDelete(log.id)}
            onEdit={() => router.push({ pathname: '/(app)/edit-log', params: { id: log.id } })}
          />
        ))
      )}
    </ScreenShell>
  );
}

