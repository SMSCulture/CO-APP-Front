import { router } from 'expo-router';
import { View } from 'react-native';

import { Button, Screen, Text } from '../../components/ui';
import { spacing } from '../../design/tokens';

export default function ConfirmationRoute() {
  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: spacing.lg }}>
        <Text variant="display">🎉</Text>
        <Text variant="title" style={{ textAlign: 'center' }}>
          You’re going!
        </Text>
        <Text muted style={{ textAlign: 'center' }}>
          This is a placeholder confirmation. Real order details will appear here once ticketing
          is connected.
        </Text>
        <Button label="View my tickets" onPress={() => router.replace('/(tabs)/tickets')} />
        <Button label="Back to Home" variant="ghost" onPress={() => router.replace('/(tabs)/home')} />
      </View>
    </Screen>
  );
}
