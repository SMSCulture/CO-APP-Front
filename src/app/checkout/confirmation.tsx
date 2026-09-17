import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Button, Screen, Text } from '../../components/ui';
import { spacing } from '../../design/tokens';

export default function ConfirmationRoute() {
  const { event } = useLocalSearchParams<{ demo?: string; event?: string }>();
  return <Screen><View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: spacing.lg }}><Text variant="display">Order preview</Text><Text variant="title" style={{ textAlign: 'center' }}>{event ?? 'Your local arts event'}</Text><Text muted style={{ textAlign: 'center' }}>The V1 journey is complete, but this is not a purchase. Nothing was charged and no ticket was issued. Real order details and QR access activate with the consumer ticket backend.</Text><Button label="Browse more events" onPress={() => router.replace('/(tabs)/home')} /><Button label="See ticket wallet" variant="ghost" onPress={() => router.replace('/(tabs)/tickets')} /></View></Screen>;
}
