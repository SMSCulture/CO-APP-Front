import { View } from 'react-native';

import { spacing } from '../../design/tokens';
import { Chip } from '../ui';

const POPULAR_SEARCHES = ['Concerts', 'This Weekend', 'Free Events', 'Live Music', 'Museums', 'Family Friendly'];

interface PopularSearchesRowProps {
  onSelect: (term: string) => void;
}

/** Static outline pill chips — tapping one runs that term as a search immediately. */
export function PopularSearchesRow({ onSelect }: PopularSearchesRowProps) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
      {POPULAR_SEARCHES.map((term) => (
        <Chip key={term} label={term} onPress={() => onSelect(term)} />
      ))}
    </View>
  );
}
