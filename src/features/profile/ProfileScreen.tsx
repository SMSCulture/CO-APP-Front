import { router } from 'expo-router';
import { View } from 'react-native';

import { AppHeader } from '../../components/layout/AppHeader';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Button, EmptyState, Screen, Text } from '../../components/ui';
import { DEFAULT_CITY } from '../../config/constants';
import { spacing } from '../../design/tokens';
import { useAuth } from '../../auth/useAuth';
import { trackEvent } from '../../lib/analytics';
import { AppearanceToggle } from './components/AppearanceToggle';
import { FriendsSection } from './components/FriendsSection';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileMenuItem } from './components/ProfileMenuItem';

export function ProfileScreen() {
  const { isAuthenticated, user, signOut } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <Screen scroll>
        <AppHeader title="Profile" />
        <EmptyState
          title="Welcome to CultureOwl"
          message="Sign in to save events, get tickets, and follow the culture in your city."
        />
        <Button
          label="Sign in or create account"
          fullWidth
          onPress={() => router.push('/(public)/login')}
        />
        <View style={{ marginTop: spacing['2xl'] }}>
          <AppearanceToggle />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <ProfileHeader user={user} />
      <FriendsSection />

      <SectionHeader title="Settings" />
      <ProfileMenuItem
        label="City"
        right={<Text muted>{DEFAULT_CITY}</Text>}
        onPress={() => trackEvent('city_setting_placeholder_tap')}
      />
      <ProfileMenuItem
        label="Favorites"
        onPress={() => trackEvent('favorites_placeholder_tap')}
      />
      <ProfileMenuItem label="Tickets" onPress={() => router.push('/(tabs)/tickets')} />
      <ProfileMenuItem label="Appearance" onPress={() => router.push('/settings/appearance')} />
      <ProfileMenuItem label="Help" onPress={() => trackEvent('support_placeholder_tap')} />
      <ProfileMenuItem
        label="Sign out"
        destructive
        onPress={() => {
          signOut();
          trackEvent('sign_out');
        }}
      />
    </Screen>
  );
}
