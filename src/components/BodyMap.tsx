import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';

import { colors, spacing } from '@/constants/theme';
import { BODY_ZONES } from '@/models/bodyZones';
import { BodyMapView, BodyZoneId } from '@/models/types';
import { SegmentedControl } from '@/components/SegmentedControl';

interface BodyMapProps {
  view: BodyMapView;
  onChangeView: (view: BodyMapView) => void;
  selectedSiteId?: BodyZoneId;
  recentSiteIds: BodyZoneId[];
  onSelectSite: (siteId: BodyZoneId) => void;
}

export const BodyMap = ({
  view,
  onChangeView,
  selectedSiteId,
  recentSiteIds,
  onSelectSite,
}: BodyMapProps) => {
  const zones = BODY_ZONES.filter((zone) => zone.view === view);
  const selectedZone = zones.find((zone) => zone.id === selectedSiteId);
  const recentSelected = selectedSiteId ? recentSiteIds.includes(selectedSiteId) : false;

  return (
    <View style={styles.wrapper}>
      <SegmentedControl
        value={view}
        onChange={onChangeView}
        options={[
          { label: 'Front', value: 'front' },
          { label: 'Back', value: 'back' },
        ]}
      />

      <View style={styles.mapCard}>
        <Svg height={360} width="100%" viewBox="0 0 100 100">
          <Rect x="38" y="7" width="24" height="18" rx="10" fill="#14263f" />
          <Rect x="28" y="24" width="44" height="31" rx="18" fill="#0f1d31" />
          <Rect x="31" y="54" width="14" height="34" rx="10" fill="#0f1d31" />
          <Rect x="55" y="54" width="14" height="34" rx="10" fill="#0f1d31" />
          <Rect x="18" y="24" width="12" height="30" rx="8" fill="#0f1d31" />
          <Rect x="70" y="24" width="12" height="30" rx="8" fill="#0f1d31" />
          <Circle cx="50" cy="18" r="11" fill="#10203a" />
          {zones.map((zone) => {
            const isSelected = selectedZone?.id === zone.id;
            const isRecent = recentSiteIds.includes(zone.id);

            return (
              <Rect
                key={zone.id}
                x={zone.x}
                y={zone.y}
                width={zone.width}
                height={zone.height}
                rx={6}
                fill={isSelected ? 'rgba(89, 208, 255, 0.8)' : isRecent ? 'rgba(244, 184, 96, 0.45)' : 'rgba(89, 208, 255, 0.18)'}
                stroke={isSelected ? '#86e4ff' : isRecent ? '#f4b860' : '#2a4767'}
                strokeWidth={1}
              />
            );
          })}
        </Svg>

        <View style={styles.hotspots}>
          {zones.map((zone) => (
            <Pressable
              key={zone.id}
              onPress={() => onSelectSite(zone.id)}
              style={[
                styles.hotspot,
                {
                  left: `${zone.x}%`,
                  top: `${zone.y}%`,
                  width: `${zone.width}%`,
                  height: `${zone.height}%`,
                },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.zoneList}>
        {zones.map((zone) => {
          const active = selectedSiteId === zone.id;
          const recent = recentSiteIds.includes(zone.id);
          return (
            <Pressable
              key={zone.id}
              onPress={() => onSelectSite(zone.id)}
              style={[styles.zoneChip, active && styles.zoneChipActive]}
            >
              <Text style={[styles.zoneChipText, active && styles.zoneChipTextActive]}>
                {zone.label}
                {recent ? ' • recent' : ''}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {selectedZone ? (
        <View style={styles.selectedCopy}>
          <Text style={styles.selectedTitle}>Selected site</Text>
          <Text style={styles.selectedText}>{selectedZone.label}</Text>
          {recentSelected ? (
            <Text style={styles.warning}>Recent activity was logged in this zone.</Text>
          ) : (
            <Text style={styles.supporting}>Recent sites are highlighted for visibility only.</Text>
          )}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.md,
  },
  mapCard: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 24,
    padding: spacing.md,
  },
  hotspots: {
    position: 'absolute',
    inset: spacing.md,
  },
  hotspot: {
    position: 'absolute',
  },
  zoneList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  zoneChip: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  zoneChipActive: {
    backgroundColor: 'rgba(89, 208, 255, 0.12)',
    borderColor: colors.accent,
  },
  zoneChipText: {
    color: colors.textMuted,
    fontWeight: '600',
  },
  zoneChipTextActive: {
    color: colors.accentStrong,
  },
  selectedCopy: {
    gap: spacing.xs,
  },
  selectedTitle: {
    color: colors.textSoft,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  selectedText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  supporting: {
    color: colors.textMuted,
    lineHeight: 20,
  },
  warning: {
    color: colors.warning,
    lineHeight: 20,
  },
});

