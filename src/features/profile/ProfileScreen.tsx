import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { LocationSwitcherModal } from '../../components/discovery/LocationSwitcherModal';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { GearIcon, HeartIcon, HelpIcon, MapPinIcon, StarIcon, TicketIcon } from '../../components/layout/icons/MenuIcons';
import { IconButton, Screen, Text } from '../../components/ui';
import { DEFAULT_CITY } from '../../config/constants';
import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useAuth } from '../../auth/useAuth';
import { useFavoritesStore } from '../../store/favoritesStore';
import { useInterestsStore } from '../../store/interestsStore';
import { useLocationStore } from '../../store/locationStore';
import { FriendsSection } from './components/FriendsSection';
import { IconMenuRow } from './components/IconMenuRow';

/**
 * Profile's own minimal top row — deliberately not the shared AppHeader,
 * which always shows a location-switcher trigger. Profile doesn't need one
 * (per explicit request to remove it here); just a title and a settings
 * gear. "Edit Profile" moved back to being a row inside Settings (with its
 * own section header there) rather than a shortcut here. Gear goes to
 * "Personal" (per explicit request — not labeled "Settings" from this entry
 * point). Filled + slightly smaller gear per explicit request; the old big
 * avatar/name ProfileHeader block is gone too — this row is the only thing
 * at the top now.
 */
function ProfileTopBar() {
  const theme = useAppTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing.lg }}>
      <Text variant="title">Profile</Text>
      <IconButton accessibilityLabel="Personal settings" onPress={() => router.push('/settings')} transparent size={40}>
        <GearIcon color={String(theme.colors.text)} size={22} filled />
      </IconButton>
    </View>
  );
}

/** Guest-state stand-in for ProfileHeader — same layout, no avatar/name to show yet. */
function GuestHeader() {
  const theme = useAppTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.xl }}>
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: theme.colors.chipBackground,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text variant="heading">👤</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text variant="heading">Guest</Text>
        <Text variant="caption" muted>
          Sign in to save favorites and get tickets
        </Text>
      </View>
    </View>
  );
}

/**
 * The full menu (City/Favorites/Interests/Tickets/Help) is always visible,
 * signed in or not — favorites/interests already work locally without auth
 * (see favoritesStore.ts/interestsStore.ts), so there's no reason to hide
 * them behind a sign-in wall. Tickets no longer redirects to sign-in either
 * — it just opens the Tickets tab, which already has its own signed-out
 * empty state with a sign-in prompt (per explicit request, the standalone
 * "Sign in or create account" button here is gone).
 */
export function ProfileScreen() {
  const { isAuthenticated } = useAuth();
  const theme = useAppTheme();
  const favoritesCount = useFavoritesStore((s) => s.getFavoriteCount());
  const interestsCount = useInterestsStore((s) => s.selectedGenreIds.length);
  const { selectedCity, setSelectedCity } = useLocationStore();
  const [locationOpen, setLocationOpen] = useState(false);
  const iconColor = String(theme.colors.text);
  const displayCity = selectedCity?.city ?? DEFAULT_CITY;

  return (
    <Screen scroll>
      <ProfileTopBar />
      {!isAuthenticated ? <GuestHeader /> : null}
      {/* Shows signed in or out — same "show the feature's shape either way" pattern as Tickets' pills. */}
      <FriendsSection />

      <SectionHeader title="Settings" />
      <IconMenuRow
        icon={<MapPinIcon color={iconColor} />}
        label="City"
        description="Change city"
        right={<Text muted>{displayCity}</Text>}
        onPress={() => setLocationOpen(true)}
      />
      <IconMenuRow
        icon={<HeartIcon color={iconColor} />}
        label="Favorites"
        description="Find your favorite events, arts groups and destinations"
        right={favoritesCount > 0 ? <Text muted>{favoritesCount}</Text> : undefined}
        onPress={() => router.push('/favorites')}
      />
      <IconMenuRow
        icon={<StarIcon color={iconColor} />}
        label="Interests"
        description="Tell us what you're into so we can show you more of it"
        right={interestsCount > 0 ? <Text muted>{interestsCount}</Text> : undefined}
        onPress={() => router.push('/profile/interests')}
      />
      <IconMenuRow
        icon={<TicketIcon color={iconColor} />}
        label="Tickets"
        description="All the tickets you purchased are stored here safe"
        onPress={() => router.push('/(tabs)/tickets')}
      />
      <IconMenuRow
        icon={<HelpIcon color={iconColor} />}
        label="Help"
        description="Any questions or issues? We are here to help"
        onPress={() => router.push('/help')}
      />

      <LocationSwitcherModal visible={locationOpen} onClose={() => setLocationOpen(false)} onSelectCity={setSelectedCity} />
    </Screen>
  );
}
