import { router, useLocalSearchParams } from 'expo-router';

import { AppHeader } from '../../components/layout/AppHeader';
import { Button, Screen, Text } from '../../components/ui';
import { spacing } from '../../design/tokens';
import { useEvent } from '../../queries/events.queries';
import type { EventRouteParams } from '../../types/navigation';

/**
 * Checkout placeholder — real payments are explicitly out of scope for the
 * foundation. This route exists so the Get Tickets flow is navigable end to end.
 */
export default function CheckoutRoute() {
  const { eventId } = useLocalSearchParams<EventRouteParams>();
  const { data: event } = useEvent(eventId);

  return (
    <Screen scroll>
      <AppHeader title="Checkout" subtitle={event?.title} />
      <Text muted style={{ marginBottom: spacing.xl }}>
        Ticket purchasing is coming soon. This flow will connect to CultureOwl’s flat-fee
        ticketing when the backend API is available.
      </Text>
      <Button
        label="Continue (demo)"
        fullWidth
        onPress={() => router.push('/checkout/confirmation')}
      />
    </Screen>
  );
}
