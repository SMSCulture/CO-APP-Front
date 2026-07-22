import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Screen, Text } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useAuth } from '../../auth/useAuth';
import { ProfileMenuItem } from './components/ProfileMenuItem';

/** Account settings placeholder — profile editing arrives with backend wiring. */
export function SettingsScreen() {
  const { user } = useAuth();

  return (
    <Screen scroll>
      <DetailScreenHeader title="Account" />
      <Text muted style={{ marginBottom: spacing.lg }}>
        Account management is coming soon. Signed in as {user?.email ?? 'guest'}.
      </Text>
      <ProfileMenuItem label="Email" right={<Text muted>{user?.email ?? '—'}</Text>} />
      <ProfileMenuItem label="Notifications" right={<Text muted>Coming soon</Text>} />
      <ProfileMenuItem label="Delete account" right={<Text muted>Coming soon</Text>} />
    </Screen>
  );
}
