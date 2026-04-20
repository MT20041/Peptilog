import { useState } from 'react';
import { Redirect } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppCard } from '@/components/AppCard';
import { FormField } from '@/components/FormField';
import { ScreenShell } from '@/components/ScreenShell';
import { DISCLAIMER } from '@/constants/app';
import { colors, spacing } from '@/constants/theme';
import { hasConfig, isDemoMode } from '@/lib/firebase';
import { useAuthStore } from '@/stores/authStore';

export default function SignInScreen() {
  const user = useAuthStore((state) => state.user);
  const signIn = useAuthStore((state) => state.signIn);
  const signUp = useAuthStore((state) => state.signUp);
  const authError = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [busy, setBusy] = useState(false);

  if (user) {
    return <Redirect href="/(app)" />;
  }

  if (isDemoMode) {
    return <Redirect href="/(app)" />;
  }

  const handleSubmit = async () => {
    clearError();
    setBusy(true);

    try {
      if (mode === 'signIn') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScreenShell
      scroll={false}
      subtitle="Private logging with per-user Firebase Auth and Firestore storage."
      title="PeptiLog"
    >
      <View style={styles.container}>
        <AppCard style={styles.heroCard}>
          <Text style={styles.eyebrow}>Personal record-keeping</Text>
          <Text style={styles.heroTitle}>Fast private tracking for repeat entries.</Text>
          <Text style={styles.heroCopy}>
            {DISCLAIMER}
          </Text>
        </AppCard>

        <AppCard>
          <View style={styles.modeRow}>
            <AppButton
              label="Sign in"
              onPress={() => setMode('signIn')}
              style={styles.modeButton}
              variant={mode === 'signIn' ? 'primary' : 'secondary'}
            />
            <AppButton
              label="Create account"
              onPress={() => setMode('signUp')}
              style={styles.modeButton}
              variant={mode === 'signUp' ? 'primary' : 'secondary'}
            />
          </View>

          <FormField
            autoCapitalize="none"
            keyboardType="email-address"
            label="Email"
            onChangeText={setEmail}
            placeholder="name@example.com"
            value={email}
          />
          <FormField
            label="Password"
            onChangeText={setPassword}
            placeholder="At least 6 characters"
            secureTextEntry
            value={password}
          />

          {!hasConfig ? (
            <Text style={styles.warning}>
              Firebase env vars are missing. Add the values from `.env.example` before signing in.
            </Text>
          ) : null}

          {authError ? <Text style={styles.warning}>{authError}</Text> : null}

          <AppButton
            disabled={!email || password.length < 6 || !hasConfig}
            label={mode === 'signIn' ? 'Sign in' : 'Create account'}
            loading={busy}
            onPress={handleSubmit}
          />
        </AppCard>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.md,
  },
  heroCard: {
    backgroundColor: colors.bgElevated,
  },
  eyebrow: {
    color: colors.accentStrong,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
  },
  heroTitle: {
    color: colors.text,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
  },
  heroCopy: {
    color: colors.textMuted,
    lineHeight: 22,
  },
  modeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  modeButton: {
    flex: 1,
  },
  warning: {
    color: colors.warning,
    lineHeight: 20,
  },
});
