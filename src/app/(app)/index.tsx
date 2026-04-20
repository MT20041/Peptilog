import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { EmptyState } from '@/components/EmptyState';
import { LogEntryForm, createEmptyLogDraft } from '@/components/LogEntryForm';
import { ScreenShell } from '@/components/ScreenShell';
import { DISCLAIMER } from '@/constants/app';
import { colors, spacing } from '@/constants/theme';
import { useAuthStore } from '@/stores/authStore';
import { useLogsStore } from '@/stores/logsStore';
import { usePeptidesStore } from '@/stores/peptidesStore';

export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const peptides = usePeptidesStore((state) => state.items);
  const logs = useLogsStore((state) => state.items);
  const addLog = useLogsStore((state) => state.add);

  const handleSubmit = async (draft: ReturnType<typeof createEmptyLogDraft>) => {
    if (!user) {
      return;
    }

    const peptide = peptides.find((item) => item.id === draft.peptideId);

    if (!peptide) {
      throw new Error('Choose a peptide before saving.');
    }

    await addLog(
      user.uid,
      {
        ...draft,
        dose: Number(draft.dose),
        siteId: draft.siteId,
      },
      peptide,
    );
  };

  return (
    <ScreenShell
      subtitle="Sub-10-second repeat logging with visible site history and private notes."
      title="Quick log"
    >
      <View style={styles.banner}>
        <Text style={styles.bannerLabel}>Disclaimer</Text>
        <Text style={styles.bannerText}>{DISCLAIMER}</Text>
      </View>

      {!peptides.length ? (
        <EmptyState
          description="Add your first peptide to unlock the fast entry flow."
          title="No peptides yet"
        />
      ) : null}

      <LogEntryForm
        busy={false}
        initialValue={createEmptyLogDraft()}
        peptides={peptides}
        recentLogs={logs}
        submitLabel="Save log"
        onSubmit={handleSubmit}
      />

      <View style={styles.actions}>
        <AppButton label="Manage peptides" onPress={() => router.push('/(app)/peptides')} variant="secondary" />
        <AppButton label="Open history" onPress={() => router.push('/(app)/history')} variant="ghost" />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.bgElevated,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 22,
    padding: spacing.md,
    gap: spacing.xs,
  },
  bannerLabel: {
    color: colors.accentStrong,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bannerText: {
    color: colors.textMuted,
    lineHeight: 22,
  },
  actions: {
    gap: spacing.sm,
  },
});

