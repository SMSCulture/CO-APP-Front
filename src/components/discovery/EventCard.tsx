import { router } from 'expo-router';
import { Image } from 'expo-image';
import { View } from 'react-native';

import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { formatDateSlot } from '../../lib/formatDate';
import { formatDistance, formatEventLocation } from '../../lib/formatLocation';
import { formatEventPrice } from '../../lib/formatPrice';
import type { EventSummary } from '../../types/event';
import { Badge, Card, Text } from '../ui';

interface EventCardProps {
  event: EventSummary;
  width?: number;
}

export function EventCard({ event, width }: EventCardProps) {
  const theme = useAppTheme();
  const distance = formatDistance(event.distanceMiles);

  return (
    <Card padded={false} onPress={() => router.push(`/events/${event.id}`)} style={{ width }}>
      <Image
        source={{ uri: event.mainImageUrl ?? undefined }}
        style={{ width: '100%', aspectRatio: 16 / 9, backgroundColor: theme.colors.skeleton }}
        contentFit="cover"
        transition={200}
        accessibilityLabel={event.title}
      />
      <View style={{ padding: spacing.lg, gap: spacing.xs }}>
        <Text variant="caption" color={theme.colors.primary}>
          {formatDateSlot(event.nextEventDate, event.startDate)}
        </Text>
        <Text variant="subheading" numberOfLines={2}>
          {event.title}
        </Text>
        <Text variant="caption" muted numberOfLines={1}>
          {formatEventLocation(event)}
          {distance ? `  ·  ${distance}` : ''}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: spacing.xs }}>
          <Badge
            label={formatEventPrice(event)}
            color={event.free ? theme.colors.primary : theme.colors.accent}
          />
        </View>
      </View>
    </Card>
  );
}
