import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { colors, spacing } from '@/constants/theme';

interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export const FormField = ({ label, error, style, ...props }: FormFieldProps) => (
  <View style={styles.wrapper}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      placeholderTextColor={colors.textSoft}
      style={[styles.input, style]}
      {...props}
    />
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  label: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    color: colors.text,
    fontSize: 16,
    minHeight: 50,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  error: {
    color: colors.warning,
    fontSize: 12,
  },
});

