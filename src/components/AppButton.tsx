import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

import { colors, spacing } from '@/constants/theme';

interface AppButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export const AppButton = ({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: AppButtonProps) => (
  <Pressable
    accessibilityRole="button"
    disabled={disabled || loading}
    onPress={onPress}
    style={({ pressed }) => [
      styles.base,
      variantStyles[variant],
      disabled && styles.disabled,
      pressed && !disabled && !loading && styles.pressed,
      style,
    ]}
  >
    {loading ? (
      <ActivityIndicator color={variant === 'secondary' || variant === 'ghost' ? colors.text : colors.bg} />
    ) : (
      <Text style={[styles.label, labelStyles[variant]]}>{label}</Text>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.82,
  },
  disabled: {
    opacity: 0.45,
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.accent,
  },
  secondary: {
    backgroundColor: colors.panelAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: 'rgba(255, 125, 125, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255, 125, 125, 0.3)',
  },
});

const labelStyles = StyleSheet.create({
  primary: {
    color: colors.bg,
  },
  secondary: {
    color: colors.text,
  },
  ghost: {
    color: colors.textMuted,
  },
  danger: {
    color: colors.danger,
  },
});

