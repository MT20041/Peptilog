import { StyleSheet, View } from 'react-native';

import { FormField } from '@/components/FormField';
import { SegmentedControl } from '@/components/SegmentedControl';
import { Peptide } from '@/models/types';

interface HistoryFilterBarProps {
  peptides: Peptide[];
  selectedPeptideId: string;
  startDate: string;
  endDate: string;
  onChangePeptide: (value: string) => void;
  onChangeStartDate: (value: string) => void;
  onChangeEndDate: (value: string) => void;
}

export const HistoryFilterBar = ({
  peptides,
  selectedPeptideId,
  startDate,
  endDate,
  onChangePeptide,
  onChangeStartDate,
  onChangeEndDate,
}: HistoryFilterBarProps) => (
  <View style={styles.wrapper}>
    <SegmentedControl
      value={selectedPeptideId}
      onChange={onChangePeptide}
      options={[
        { label: 'All', value: '' },
        ...peptides.map((peptide) => ({
          label: peptide.nickname || peptide.name,
          value: peptide.id,
        })),
      ]}
    />
    <FormField
      autoCapitalize="none"
      label="Start date"
      onChangeText={onChangeStartDate}
      placeholder="YYYY-MM-DD"
      value={startDate}
    />
    <FormField
      autoCapitalize="none"
      label="End date"
      onChangeText={onChangeEndDate}
      placeholder="YYYY-MM-DD"
      value={endDate}
    />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
});

