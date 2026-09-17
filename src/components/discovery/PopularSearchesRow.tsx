import { View } from 'react-native';

import { spacing } from '../../design/tokens';
import { Chip } from '../ui';

/**
 * One inventory-backed niche per CultureOwl genre. Keep the submitted query
 * literal in sync with event inventory so browse never opens a dead end.
 */
const POPULAR_SEARCHES = [
  { label: 'Gallery Walks', query: 'Gallery' },
  { label: 'Ballet', query: 'Ballet' },
  { label: 'Jazz Nights', query: 'Jazz' },
  { label: 'Pottery Classes', query: 'Pottery' },
  { label: 'Arts Festivals', query: 'Festival' },
  { label: 'Family Discovery', query: 'Family' },
] as const;

interface PopularSearchesRowProps {
  onSelect: (term: string) => void;
}

/** Curated CultureOwl niche chips, each grounded in current event inventory. */
export function PopularSearchesRow({ onSelect }: PopularSearchesRowProps) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
      {POPULAR_SEARCHES.map(({ label, query }) => (
        <Chip key={label} label={label} onPress={() => onSelect(query)} />
      ))}
    </View>
  );
}
