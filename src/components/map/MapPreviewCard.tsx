import { router } from 'expo-router';
import { Image } from 'expo-image';
import { View } from 'react-native';

import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { formatDateSlot } from '../../lib/formatDate';
import { formatEventLocation } from '../../lib/formatLocation';
import { formatEventPrice } from '../../lib/formatPrice';
import type { EventSummary } from '../../types/event';
import { Badge, Card, Text } from '../ui';

/** Bottom preview card shown when a map pin is selected. */
export function MapPreviewCard({ event }: { event: EventSummary }) {
  const theme = useAppTheme();
  return (
    <Card padded={false} onPress={() => router.push(`/events/${event.id}`)}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: event.mainImageUrl ?? undefined }}
          style={{ width: 110, height: 110, backgroundColor: theme.colors.skeleton }}
          contentFit="cover"
        />
        <View style={{ flex: 1, padding: spacing.md, gap: spacing.xs }}>
          <Text variant="caption" color={theme.colors.primary}>
            {formatDateSlot(event.nextEventDate, event.startDate)}
          </Text>
          <Text variant="subheading" numberOfLines={2}>
            {event.title}
          </Text>
          <Text variant="caption" muted numberOfLines={1}>
            {formatEventLocation(event)}
          </Text>
          <Badge label={formatEventPrice(event)} />
        </View>
      </View>
    </Card>
  );
}
