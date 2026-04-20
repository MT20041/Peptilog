import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/constants/theme';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Not found</Text>
      <Text style={styles.description}>This page does not exist in the current build.</Text>
      <Link href="/" style={styles.link}>
        Return home
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.bg,
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    color: colors.textMuted,
  },
  link: {
    color: colors.accentStrong,
    fontWeight: '700',
  },
});

