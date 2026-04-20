import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppCard } from '@/components/AppCard';
import { ScreenShell } from '@/components/ScreenShell';
import { DISCLAIMER } from '@/constants/app';
import { colors, spacing } from '@/constants/theme';
import { useAuthStore } from '@/stores/authStore';

export default function SettingsScreen() {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <ScreenShell subtitle="Account details, app framing, and guardrails for private use." title="Settings">
      <AppCard>
        <Text style={styles.sectionTitle}>Account</Text>
        <Text style={styles.copy}>{user?.email ?? 'Signed in'}</Text>
        <AppButton label="Sign out" onPress={() => signOut()} variant="secondary" />
      </AppCard>

      <AppCard>
        <Text style={styles.sectionTitle}>Disclaimer</Text>
        <Text style={styles.copy}>{DISCLAIMER}</Text>
      </AppCard>

      <AppCard>
        <Text style={styles.sectionTitle}>Usage notes</Text>
        <View style={styles.list}>
          <Text style={styles.copy}>Entries are private to the signed-in Firebase user.</Text>
          <Text style={styles.copy}>Body-map highlights surface recent locations for visibility only.</Text>
          <Text style={styles.copy}>The app records what you enter and does not generate guidance.</Text>
        </View>
      </AppCard>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  copy: {
    color: colors.textMuted,
    lineHeight: 22,
  },
  list: {
    gap: spacing.sm,
  },
});

