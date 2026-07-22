import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { formatDateSlot } from '../../lib/formatDate';
import { formatEventLocation } from '../../lib/formatLocation';
import { formatEventPrice } from '../../lib/formatPrice';
import type { EventSummary } from '../../types/event';
import { Badge, Text } from '../ui';

const IMAGE_SIZE = 148;

/**
 * Bottom preview card shown when a map pin is selected. Matches web's
 * borderless DirectoryCard shell (co-design-system.css: co-dc-top/title/info)
 * — no card border/shadow, standard foreground text color (not the blue
 * primary), image sized to be the visually dominant element per row.
 */
export function MapPreviewCard({ event }: { event: EventSummary }) {
  const theme = useAppTheme();
  return (
    <Pressable
      onPress={() => router.push(`/events/${event.id}`)}
      style={({ pressed }) => ({ flexDirection: 'row', opacity: pressed ? 0.85 : 1 })}
    >
      <Image
        source={{ uri: event.mainImageUrl ?? undefined }}
        style={{
          width: IMAGE_SIZE,
          height: IMAGE_SIZE,
          borderRadius: radius.md,
          backgroundColor: theme.colors.skeleton,
        }}
        contentFit="cover"
      />
      <View style={{ flex: 1, paddingLeft: spacing.md, justifyContent: 'center', gap: 4 }}>
        <Text variant="caption">{formatDateSlot(event.nextEventDate, event.startDate)}</Text>
        <Text variant="subheading" numberOfLines={2}>
          {event.title}
        </Text>
        <Text variant="caption" muted numberOfLines={1}>
          {formatEventLocation(event)}
        </Text>
        <Badge label={formatEventPrice(event)} />
      </View>
    </Pressable>
  );
}
