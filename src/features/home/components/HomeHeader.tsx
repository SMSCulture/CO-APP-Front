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
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingTop: spacing.lg }}>
        <View style={{ flex: 1 }}>
          <SearchBarPill
            mode="link"
            placeholder="Concerts, museums, theatre…"
            onPress={() => router.push('/(tabs)/search')}
            onFilterPress={onFilterPress}
          />
        </View>
        {/* Same height as the search bar pill (42) so the two read as one
            congruent row, tucked flush into the corner (negative right
            margin cancels the button's own hit-slop-driven visual inset). */}
        <View style={{ marginRight: -spacing.xs }}>
          <IconButton accessibilityLabel="Open explore menu" onPress={() => setDrawerOpen(true)} transparent size={42}>
            <Text style={{ fontSize: 26 }}>☰</Text>
          </IconButton>
        </View>
      </View>

      <SideDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </View>
  );
}
