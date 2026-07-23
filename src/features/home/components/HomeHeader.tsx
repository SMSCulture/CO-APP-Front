import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { SearchBarPill } from '../../../components/discovery/SearchBarPill';
import { SideDrawer } from '../../../components/layout/SideDrawer';
import { IconButton, Text } from '../../../components/ui';
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <View style={{ marginBottom: spacing['2xl'] }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: spacing.lg }}>
        <View style={{ flex: 1 }}>
          <SearchBarPill
            mode="link"
            placeholder="Concerts, museums, theatre…"
            onPress={() => router.push('/(tabs)/search')}
            onFilterPress={onFilterPress}
          />
        </View>
        {/* No circle background, tucked into the corner (negative right
            margin so it sits flush with the screen edge instead of leaving
            a gap) so the search bar reads as the dominant element and has
            more room to be wider. Nudged up slightly to sit centered with
            the search bar's own visual center rather than the row's full height. */}
        <View style={{ marginTop: -2, marginRight: -spacing.xs }}>
          <IconButton accessibilityLabel="Open explore menu" onPress={() => setDrawerOpen(true)} transparent size={40}>
            <Text style={{ fontSize: 24 }}>☰</Text>
          </IconButton>
        </View>
      </View>

      <SideDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </View>
  );
}
