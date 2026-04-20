import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/constants/theme';

interface ChipSelectProps<T extends string> {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}

export const ChipSelect = <T extends string>({ value, options, onChange }: ChipSelectProps<T>) => (
  <View style={styles.wrapper}>
    {options.map((option) => {
      const active = option === value;

      return (
        <Pressable
          key={option}
          onPress={() => onChange(option)}
          style={[styles.chip, active && styles.activeChip]}
        >
          <Text style={[styles.chipLabel, active && styles.activeChipLabel]}>{option}</Text>
        </Pressable>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: colors.chip,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    minHeight: 42,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  activeChip: {
    backgroundColor: 'rgba(89, 208, 255, 0.12)',
    borderColor: colors.accent,
  },
  chipLabel: {
    color: colors.textMuted,
    fontWeight: '700',
  },
  activeChipLabel: {
    color: colors.accentStrong,
  },
});

