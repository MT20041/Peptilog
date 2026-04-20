import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/constants/theme';

interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <View style={styles.wrapper}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 22,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    color: colors.textMuted,
    lineHeight: 22,
  },
});

