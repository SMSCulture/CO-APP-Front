import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { LocationSwitcherModal } from '../discovery/LocationSwitcherModal';
import { useLocationStore } from '../../store/locationStore';
import { DEFAULT_CITY } from '../../config/constants';
import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { IconButton, Text } from '../ui';
import { ChevronDownIcon, MapPinIcon } from './icons/MenuIcons';
import { SideDrawer } from './SideDrawer';

interface AppHeaderProps {
  /** Omit on screens that only need the city trigger + hamburger (e.g. Home). */
  title?: string;
  /** @deprecated pass nothing — the header now shows the shared selected city itself. */
  subtitle?: string;
  /** Set false to hide the location trigger (e.g. Tickets — city isn't relevant there). */
  showLocation?: boolean;
}

/**
 * Screen header: selected-city trigger (opens the global location switcher,
 * shared across every screen via useLocationStore) + directories panel.
 */
export function AppHeader({ title, subtitle, showLocation = true }: AppHeaderProps) {
  const theme = useAppTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const { selectedCity, setSelectedCity } = useLocationStore();

  const displayCity = subtitle ?? selectedCity?.city ?? DEFAULT_CITY;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.lg,
      }}
    >
      <View style={{ flex: 1 }}>
        {showLocation ? (
          <Pressable
            onPress={() => setLocationOpen(true)}
            accessibilityRole="button"
            accessibilityLabel={`Change city, currently ${displayCity}`}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.sm,
              alignSelf: 'flex-start',
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <MapPinIcon color={String(theme.colors.text)} size={20} />
            <View>
              <Text variant="label" muted>
                Location
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text variant="subheading">{displayCity}</Text>
                <ChevronDownIcon color={String(theme.colors.textMuted)} size={14} />
              </View>
            </View>
          </Pressable>
        ) : null}
        {title ? <Text variant="title" style={showLocation ? { marginTop: spacing.sm } : undefined}>{title}</Text> : null}
      </View>
      <IconButton accessibilityLabel="Open explore menu" onPress={() => setDrawerOpen(true)} transparent>
        <Text variant="heading">☰</Text>
      </IconButton>
      <SideDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
      {showLocation ? (
        <LocationSwitcherModal
          visible={locationOpen}
          onClose={() => setLocationOpen(false)}
          onSelectCity={setSelectedCity}
        />
      ) : null}
    </View>
  );
}
