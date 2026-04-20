import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/constants/theme';

interface SegmentOption<T extends string> {
  label: string;
  value: T;
}

interface SegmentedControlProps<T extends string> {
  value: T;
  options: SegmentOption<T>[];
  onChange: (value: T) => void;
}

export const SegmentedControl = <T extends string>({ value, options, onChange }: SegmentedControlProps<T>) => (
  <View style={styles.row}>
    {options.map((option) => {
      const active = option.value === value;

      return (
        <Pressable
          key={option.value}
          onPress={() => onChange(option.value)}
          style={[styles.segment, active && styles.segmentActive]}
        >
          <Text style={[styles.label, active && styles.labelActive]}>{option.label}</Text>
        </Pressable>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: colors.panel,
    borderRadius: 18,
    padding: 4,
    gap: 6,
  },
  segment: {
    flex: 1,
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  segmentActive: {
    backgroundColor: colors.panelAlt,
  },
  label: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  labelActive: {
    color: colors.text,
  },
});

