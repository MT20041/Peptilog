import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppCard } from '@/components/AppCard';
import { EmptyState } from '@/components/EmptyState';
import { FormField } from '@/components/FormField';
import { ScreenShell } from '@/components/ScreenShell';
import { colors, spacing } from '@/constants/theme';
import { useAuthStore } from '@/stores/authStore';
import { usePeptidesStore } from '@/stores/peptidesStore';
import { confirmAction } from '@/utils/confirm';

export default function PeptidesScreen() {
  const user = useAuthStore((state) => state.user);
  const items = usePeptidesStore((state) => state.items);
  const add = usePeptidesStore((state) => state.add);
  const remove = usePeptidesStore((state) => state.remove);

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async () => {
    if (!user) {
      return;
    }

    setBusy(true);
    setError(null);

    try {
      await add(user.uid, { name, nickname });
      setName('');
      setNickname('');
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Unable to add this peptide.');
    } finally {
      setBusy(false);
    }
  };

  const handleRemove = async (id: string) => {
    if (!user) {
      return;
    }

    const confirmed = await confirmAction('Delete peptide', 'Existing history will remain, but this peptide will disappear from quick selections.');

    if (!confirmed) {
      return;
    }

    await remove(user.uid, id);
  };

  return (
    <ScreenShell subtitle="Keep the active list short for faster repeat entries." title="Peptides">
      <AppCard>
        <Text style={styles.sectionTitle}>Add peptide</Text>
        <FormField label="Name" onChangeText={setName} placeholder="Example: BPC-157" value={name} />
        <FormField
          label="Short label"
          onChangeText={setNickname}
          placeholder="Optional quick label"
          value={nickname}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <AppButton disabled={!name.trim()} label="Add peptide" loading={busy} onPress={handleAdd} />
      </AppCard>

      {!items.length ? (
        <EmptyState
          description="Create one or more peptides to unlock fast logging."
          title="No saved peptides"
        />
      ) : (
        items.map((item) => (
          <AppCard key={item.id}>
            <View style={styles.row}>
              <View style={styles.copy}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                {item.nickname ? <Text style={styles.itemSubtitle}>{item.nickname}</Text> : null}
              </View>
              <AppButton label="Delete" onPress={() => handleRemove(item.id)} variant="danger" />
            </View>
          </AppCard>
        ))
      )}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  error: {
    color: colors.warning,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  copy: {
    flex: 1,
    gap: spacing.xs,
  },
  itemTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  itemSubtitle: {
    color: colors.textMuted,
  },
});

