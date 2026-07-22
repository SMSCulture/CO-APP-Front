import { router } from 'expo-router';
import { View } from 'react-native';

import { SectionHeader } from '../../components/layout/SectionHeader';
import { GearIcon, HeartIcon, HelpIcon, MapPinIcon, StarIcon, TicketIcon } from '../../components/layout/icons/MenuIcons';
import { Button, IconButton, Screen, Text } from '../../components/ui';
import { DEFAULT_CITY } from '../../config/constants';
import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useAuth } from '../../auth/useAuth';
import { trackEvent } from '../../lib/analytics';
import { useFavoritesStore } from '../../store/favoritesStore';
import { useInterestsStore } from '../../store/interestsStore';
import { FriendsSection } from './components/FriendsSection';
import { IconMenuRow } from './components/IconMenuRow';
import { ProfileHeader } from './components/ProfileHeader';

/**
 * Profile's own minimal top row — deliberately not the shared AppHeader,
 * which always shows a location-switcher trigger. Profile doesn't need one
 * (per explicit request to remove it here); just a title and a settings
 * gear on the right. Gear goes to "Personal" (per explicit request — not
 * labeled "Settings" from this entry point).
 */
function ProfileTopBar() {
  const theme = useAppTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing.lg }}>
      <Text variant="title">Profile</Text>
      <IconButton accessibilityLabel="Personal settings" onPress={() => router.push('/settings')} transparent size={44}>
        <GearIcon color={String(theme.colors.text)} size={26} />
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
 * them behind a sign-in wall. Only actions that genuinely require an
 * account (Tickets) redirect to sign-in when tapped while signed out.
 */
export function ProfileScreen() {
  const { isAuthenticated, user } = useAuth();
  const theme = useAppTheme();
  const favoritesCount = useFavoritesStore((s) => s.getFavoriteCount());
  const interestsCount = useInterestsStore((s) => s.selectedGenreIds.length);
  const iconColor = String(theme.colors.text);

  return (
    <Screen scroll>
      <ProfileTopBar />
      {isAuthenticated && user ? (
        <>
          <ProfileHeader user={user} />
          <FriendsSection />
        </>
      ) : (
        <>
          <GuestHeader />
          <Button
            label="Sign in or create account"
            fullWidth
            onPress={() => router.push('/(public)/login')}
            style={{ marginBottom: spacing.lg }}
          />
        </>
      )}

      <SectionHeader title="Settings" />
      <IconMenuRow
        icon={<MapPinIcon color={iconColor} />}
        label="City"
        description="Change city"
        right={<Text muted>{DEFAULT_CITY}</Text>}
        onPress={() => trackEvent('city_setting_placeholder_tap')}
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
        onPress={() => (isAuthenticated ? router.push('/(tabs)/tickets') : router.push('/(public)/login'))}
      />
      <IconMenuRow
        icon={<HelpIcon color={iconColor} />}
        label="Help"
        description="Any questions or issues? We are here to help"
        onPress={() => trackEvent('support_placeholder_tap')}
      />
    </Screen>
  );
}
