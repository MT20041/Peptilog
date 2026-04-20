import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppCard } from '@/components/AppCard';
import { colors, spacing } from '@/constants/theme';
import { LogEntry } from '@/models/types';
import { formatTimestamp } from '@/utils/date';

interface TimelineItemProps {
  log: LogEntry;
  onEdit: () => void;
  onDelete: () => void;
}

export const TimelineItem = ({ log, onEdit, onDelete }: TimelineItemProps) => (
  <AppCard>
    <View style={styles.header}>
      <View style={styles.copy}>
        <Text style={styles.title}>{log.peptideName}</Text>
        <Text style={styles.subtitle}>{formatTimestamp(log.timestamp)}</Text>
      </View>
      <View style={styles.metrics}>
        <Text style={styles.metricValue}>
          {log.dose} {log.unit}
        </Text>
        <Text style={styles.metricLabel}>{log.route}</Text>
      </View>
    </View>

    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>Site</Text>
      <Text style={styles.detailValue}>{log.siteLabel}</Text>
    </View>

    {(log.mood || log.energy || log.focus) && (
      <View style={styles.scoreRow}>
        {typeof log.mood === 'number' ? <Text style={styles.score}>Mood {log.mood}</Text> : null}
        {typeof log.energy === 'number' ? <Text style={styles.score}>Energy {log.energy}</Text> : null}
        {typeof log.focus === 'number' ? <Text style={styles.score}>Focus {log.focus}</Text> : null}
      </View>
    )}

    {log.notes ? <Text style={styles.notes}>{log.notes}</Text> : null}

    <View style={styles.actions}>
      <Pressable onPress={onEdit}>
        <Text style={styles.link}>Edit</Text>
      </Pressable>
      <Pressable onPress={onDelete}>
        <Text style={[styles.link, styles.delete]}>Delete</Text>
      </Pressable>
    </View>
  </AppCard>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  copy: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textMuted,
  },
  metrics: {
    alignItems: 'flex-end',
    gap: 2,
  },
  metricValue: {
    color: colors.accentStrong,
    fontSize: 18,
    fontWeight: '700',
  },
  metricLabel: {
    color: colors.textSoft,
    textTransform: 'capitalize',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  detailLabel: {
    color: colors.textSoft,
  },
  detailValue: {
    color: colors.text,
    fontWeight: '600',
  },
  scoreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  score: {
    color: colors.textMuted,
    backgroundColor: colors.panel,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  notes: {
    color: colors.textMuted,
    lineHeight: 21,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  link: {
    color: colors.accentStrong,
    fontWeight: '700',
  },
  delete: {
    color: colors.danger,
  },
});

