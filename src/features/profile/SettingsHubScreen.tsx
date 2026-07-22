import { router } from 'expo-router';

import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Screen, Text } from '../../components/ui';
import { useAuth } from '../../auth/useAuth';
import { trackEvent } from '../../lib/analytics';
import { ProfileMenuItem } from './components/ProfileMenuItem';

/**
 * Destination for Profile's gear icon. Items without a real backend yet
 * (Communication preferences, Location Permissions, Legal, Delete payment
 * methods, Delete Account) are marked "Coming soon" — same honest pattern
 * already used in SettingsScreen.tsx, not faked as working.
 */
export function SettingsHubScreen() {
  const { signOut } = useAuth();

  return (
    <Screen scroll>
      <DetailScreenHeader title="Personal" />
      <ProfileMenuItem label="Profile" onPress={() => router.push('/profile/edit')} />
      <ProfileMenuItem
        label="Communication preferences"
        right={<Text muted>Coming soon</Text>}
        onPress={() => trackEvent('communication_prefs_placeholder_tap')}
      />
      <ProfileMenuItem
        label="Location Permissions"
        right={<Text muted>Coming soon</Text>}
        onPress={() => trackEvent('location_permissions_placeholder_tap')}
      />
      <ProfileMenuItem
        label="Legal"
        right={<Text muted>Coming soon</Text>}
        onPress={() => trackEvent('legal_placeholder_tap')}
      />
      <ProfileMenuItem label="Account" onPress={() => router.push('/settings/account')} />
      <ProfileMenuItem
        label="Delete payment methods"
        right={<Text muted>Coming soon</Text>}
        onPress={() => trackEvent('delete_payment_methods_placeholder_tap')}
      />
      <ProfileMenuItem
        label="Delete Account"
        destructive
        right={<Text muted>Coming soon</Text>}
        onPress={() => trackEvent('delete_account_placeholder_tap')}
      />
      <ProfileMenuItem
        label="Logout"
        destructive
        onPress={() => {
          signOut();
          trackEvent('sign_out');
          router.replace('/(tabs)/home');
        }}
      />
    </Screen>
  );
}
