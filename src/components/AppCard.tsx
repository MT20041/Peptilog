import { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { colors, spacing } from '@/constants/theme';

interface AppCardProps extends PropsWithChildren {
  style?: ViewStyle;
}

export const AppCard = ({ children, style }: AppCardProps) => (
  <View style={[styles.card, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 24,
    padding: spacing.md,
    gap: spacing.md,
  },
});

