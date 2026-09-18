import { router } from 'expo-router';
import { View } from 'react-native';

import { SearchBarPill } from '../../../components/discovery/SearchBarPill';
import { spacing } from '../../../design/tokens';

interface HomeHeaderProps {
  onFilterPress: () => void;
}

/**
 * Home-specific header — distinct from the shared AppHeader used elsewhere.
 * Search bar + hamburger only; the location trigger now lives in its own
 * `LocationRow` component, rendered lower on the page (below Categories).
 */
export function HomeHeader({ onFilterPress }: HomeHeaderProps) {
  return (
    <View style={{ marginBottom: spacing['2xl'] }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingTop: spacing.lg }}>
        <View style={{ flex: 1 }}>
          <SearchBarPill
            mode="link"
            placeholder="Concerts, museums, theatre…"
            onPress={() => router.push('/(tabs)/search')}
            onFilterPress={onFilterPress}
          />
        </View>
      </View>

    </View>
  );
}
