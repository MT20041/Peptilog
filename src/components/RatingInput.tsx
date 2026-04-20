import { Pressable, StyleSheet, Text, View } from 'react-native';

import { DEFAULT_MOOD_SCALE } from '@/constants/app';
import { colors, spacing } from '@/constants/theme';

interface RatingInputProps {
  label: string;
  value?: number;
  onChange: (value?: number) => void;
}

export const RatingInput = ({ label, value, onChange }: RatingInputProps) => (
  <View style={styles.wrapper}>
    <View style={styles.header}>
      <Text style={styles.label}>{label}</Text>
      <Pressable onPress={() => onChange(undefined)}>
        <Text style={styles.clear}>Clear</Text>
      </Pressable>
    </View>
    <View style={styles.row}>
      {DEFAULT_MOOD_SCALE.map((item) => {
        const active = value === item;
        return (
          <Pressable
            key={item}
            onPress={() => onChange(item)}
            style={[styles.pill, active && styles.pillActive]}
          >
            <Text style={[styles.pillText, active && styles.pillTextActive]}>{item}</Text>
          </Pressable>
        );
      })}
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  clear: {
    color: colors.textSoft,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  pill: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillActive: {
    backgroundColor: 'rgba(89, 208, 255, 0.12)',
    borderColor: colors.accent,
  },
  pillText: {
    color: colors.textMuted,
    fontWeight: '700',
  },
  pillTextActive: {
    color: colors.accentStrong,
  },
});

