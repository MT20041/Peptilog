import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppCard } from '@/components/AppCard';
import { BodyMap } from '@/components/BodyMap';
import { ChipSelect } from '@/components/ChipSelect';
import { FormField } from '@/components/FormField';
import { RatingInput } from '@/components/RatingInput';
import { SegmentedControl } from '@/components/SegmentedControl';
import { ROUTE_OPTIONS, UNIT_OPTIONS } from '@/constants/app';
import { colors, spacing } from '@/constants/theme';
import { BODY_ZONE_MAP } from '@/models/bodyZones';
import { BodyMapView, BodyZoneId, LogEntry, Peptide, RouteType, UnitType } from '@/models/types';
import { toDateTimeLocal } from '@/utils/date';

export interface LogDraft {
  peptideId: string;
  dose: string;
  unit: UnitType;
  route: RouteType;
  siteId: BodyZoneId | '';
  timestamp: string;
  notes: string;
  mood?: number;
  energy?: number;
  focus?: number;
}

interface LogEntryFormProps {
  title?: string;
  peptides: Peptide[];
  recentLogs: LogEntry[];
  submitLabel: string;
  initialValue: LogDraft;
  onSubmit: (draft: LogDraft) => Promise<void>;
  busy?: boolean;
}

export const createEmptyLogDraft = (): LogDraft => ({
  peptideId: '',
  dose: '',
  unit: 'mg',
  route: 'subcutaneous',
  siteId: '',
  timestamp: toDateTimeLocal(new Date().toISOString()),
  notes: '',
});

export const logToDraft = (log: LogEntry): LogDraft => ({
  peptideId: log.peptideId,
  dose: String(log.dose),
  unit: log.unit,
  route: log.route,
  siteId: log.siteId,
  timestamp: toDateTimeLocal(log.timestamp),
  notes: log.notes ?? '',
  mood: log.mood,
  energy: log.energy,
  focus: log.focus,
});

export const LogEntryForm = ({
  title = 'Fast log',
  peptides,
  recentLogs,
  submitLabel,
  initialValue,
  onSubmit,
  busy = false,
}: LogEntryFormProps) => {
  const [draft, setDraft] = useState<LogDraft>(initialValue);
  const [bodyView, setBodyView] = useState<BodyMapView>('front');
  const [error, setError] = useState<string | null>(null);

  const recentSiteIds = useMemo(
    () => Array.from(new Set(recentLogs.slice(0, 5).map((log) => log.siteId))),
    [recentLogs],
  );

  const selectedSiteLabel = draft.siteId ? BODY_ZONE_MAP[draft.siteId]?.label : null;

  const handleSubmit = async () => {
    setError(null);

    try {
      await onSubmit(draft);
      setDraft(createEmptyLogDraft());
      setBodyView('front');
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Unable to save this entry.');
    }
  };

  return (
    <AppCard>
      <View style={styles.heading}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Designed for quick, private logging.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Peptide</Text>
        <View style={styles.peptideGrid}>
          {peptides.map((peptide) => {
            const active = peptide.id === draft.peptideId;
            return (
              <AppButton
                key={peptide.id}
                label={peptide.nickname || peptide.name}
                onPress={() => setDraft((current) => ({ ...current, peptideId: peptide.id }))}
                variant={active ? 'primary' : 'secondary'}
                style={styles.peptideButton}
              />
            );
          })}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.rowItem}>
          <FormField
            keyboardType="decimal-pad"
            label="Dose"
            onChangeText={(dose) => setDraft((current) => ({ ...current, dose }))}
            value={draft.dose}
          />
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Unit</Text>
          <ChipSelect value={draft.unit} options={UNIT_OPTIONS} onChange={(unit) => setDraft((current) => ({ ...current, unit }))} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Route</Text>
        <SegmentedControl
          value={draft.route}
          options={ROUTE_OPTIONS.map((option) => ({ ...option }))}
          onChange={(route) => setDraft((current) => ({ ...current, route }))}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Timestamp</Text>
        <FormField
          autoCapitalize="none"
          label="Local date and time"
          onChangeText={(timestamp) => setDraft((current) => ({ ...current, timestamp }))}
          placeholder="YYYY-MM-DDTHH:mm"
          value={draft.timestamp}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Site</Text>
        <BodyMap
          recentSiteIds={recentSiteIds}
          selectedSiteId={draft.siteId || undefined}
          view={bodyView}
          onChangeView={setBodyView}
          onSelectSite={(siteId) => setDraft((current) => ({ ...current, siteId }))}
        />
        {selectedSiteLabel ? <Text style={styles.siteText}>Selected: {selectedSiteLabel}</Text> : null}
      </View>

      <View style={styles.section}>
        <FormField
          label="Notes"
          multiline
          onChangeText={(notes) => setDraft((current) => ({ ...current, notes }))}
          placeholder="Optional private note"
          style={styles.notes}
          value={draft.notes}
        />
      </View>

      <View style={styles.section}>
        <RatingInput label="Mood" onChange={(mood) => setDraft((current) => ({ ...current, mood }))} value={draft.mood} />
        <RatingInput label="Energy" onChange={(energy) => setDraft((current) => ({ ...current, energy }))} value={draft.energy} />
        <RatingInput label="Focus" onChange={(focus) => setDraft((current) => ({ ...current, focus }))} value={draft.focus} />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <AppButton disabled={!peptides.length} label={submitLabel} loading={busy} onPress={handleSubmit} />
    </AppCard>
  );
};

const styles = StyleSheet.create({
  heading: {
    gap: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textMuted,
    lineHeight: 21,
  },
  section: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  rowItem: {
    flex: 1,
    gap: spacing.sm,
  },
  label: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  peptideGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  peptideButton: {
    minWidth: 120,
  },
  notes: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  siteText: {
    color: colors.textMuted,
  },
  error: {
    color: colors.warning,
    lineHeight: 20,
  },
});
