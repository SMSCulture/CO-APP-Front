import { View } from 'react-native';

import { spacing } from '../../design/tokens';
import { Chip } from '../ui';

/**
 * Recognizable searches spanning CultureOwl's genres. The visible wording is
 * broad and familiar; each submitted query is present in current inventory.
 */
const POPULAR_SEARCHES = [
  { label: 'Museums', query: 'Museum' },
  { label: 'Ballet', query: 'Ballet' },
  { label: 'Live Music', query: 'Jazz' },
  { label: 'Classes', query: 'Class' },
  { label: 'Festivals', query: 'Festival' },
  { label: 'Family Events', query: 'Family' },
] as const;

interface PopularSearchesRowProps {
  onSelect: (term: string) => void;
}

/** Curated CultureOwl chips with an inventory-backed query behind each one. */
export function PopularSearchesRow({ onSelect }: PopularSearchesRowProps) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
      {POPULAR_SEARCHES.map(({ label, query }) => (
        <Chip key={label} label={label} onPress={() => onSelect(query)} />
      ))}
    </View>
  );
}
