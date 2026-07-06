import { router } from 'expo-router';
import { View } from 'react-native';

import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import type { EventDetail } from '../../types/event';
import { Card, Text } from '../ui';

/** Organizer/host block linking to the organization profile. */
export function EventOrganizerCard({ event }: { event: EventDetail }) {
  const theme = useAppTheme();
  if (!event.organizerName) return null;

  return (
    <Card
      onPress={
        event.organizerId ? () => router.push(`/organizations/${event.organizerId}`) : undefined
      }
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: radius.full,
            backgroundColor: theme.colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text variant="bodyBold" color="#ffffff">
            {event.organizerName.charAt(0)}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="label" muted>
            Presented by
          </Text>
          <Text variant="subheading">{event.organizerName}</Text>
        </View>
        {event.organizerId ? <Text muted>›</Text> : null}
      </View>
    </Card>
  );
}
