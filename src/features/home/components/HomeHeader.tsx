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
    <View style={{ marginBottom: spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingTop: spacing.lg }}>
        <View style={{ flex: 1 }}>
          <SearchBarPill
            mode="link"
            placeholder="Concerts, museums, theatre…"
            onPress={() => router.push('/(tabs)/search')}
            onFilterPress={onFilterPress}
          />
        </View>
        {/* No circle background, bigger icon, tucked tight in the corner so
            the search bar reads as the dominant element. */}
        <IconButton accessibilityLabel="Open explore menu" onPress={() => setDrawerOpen(true)} transparent size={44}>
          <Text style={{ fontSize: 26 }}>☰</Text>
        </IconButton>
      </View>

      <SideDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </View>
  );
}
