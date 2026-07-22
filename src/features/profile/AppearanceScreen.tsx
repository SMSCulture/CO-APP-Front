import { router } from 'expo-router';

import { DetailScreenHeader } from '../../components/layout/DetailScreenHeader';
import { Button, Screen, Text } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { AppearanceToggle } from './components/AppearanceToggle';

export function AppearanceScreen() {
  return (
    <Screen scroll>
      <DetailScreenHeader title="Appearance" />
      <Text muted style={{ marginBottom: spacing.xl }}>
        Choose how CultureOwl looks. System follows your device’s appearance setting.
      </Text>
      <AppearanceToggle />
      <Button
        label="Done"
        variant="secondary"
        style={{ marginTop: spacing['2xl'] }}
        onPress={() => router.back()}
      />
    </Screen>
  );
}
