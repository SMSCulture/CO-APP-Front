import { router } from 'expo-router';
import { View } from 'react-native';

import { AppHeader } from '../../components/layout/AppHeader';
import { Button, EmptyState, Screen } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useAuth } from '../../auth/useAuth';
import { trackEvent } from '../../lib/analytics';
import { AppearanceToggle } from './components/AppearanceToggle';
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
        <Button label="Sign in or create account" fullWidth onPress={() => router.push('/(public)/login')} />
        <View style={{ marginTop: spacing['2xl'] }}>
          <AppearanceToggle />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <AppHeader title="Profile" />
      <ProfileHeader user={user} />
      <ProfileMenuItem label="Account" onPress={() => router.push('/settings/account')} />
      <ProfileMenuItem label="Appearance" onPress={() => router.push('/settings/appearance')} />
      <ProfileMenuItem
        label="Help & support"
        onPress={() => trackEvent('support_placeholder_tap')}
      />
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
