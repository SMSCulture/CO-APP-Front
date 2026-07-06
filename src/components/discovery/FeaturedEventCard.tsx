import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { formatDateSlot } from '../../lib/formatDate';
import { formatEventLocation } from '../../lib/formatLocation';
import type { EventSummary } from '../../types/event';
import { Text } from '../ui';

/** Large hero-style card with image background and overlaid copy. */
export function FeaturedEventCard({ event }: { event: EventSummary }) {
  const theme = useAppTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={event.title}
      onPress={() => router.push(`/events/${event.id}`)}
      style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}
    >
      <View style={{ borderRadius: radius.xl, overflow: 'hidden' }}>
        <Image
          source={{ uri: event.bigImageUrl ?? event.mainImageUrl ?? undefined }}
          style={{ width: '100%', aspectRatio: 4 / 5, backgroundColor: theme.colors.skeleton }}
          contentFit="cover"
          transition={250}
        />
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: spacing.xl,
            backgroundColor: 'rgba(22,23,23,0.55)',
            gap: spacing.xs,
          }}
        >
          <Text variant="label" color={theme.colors.accent}>
            Featured
          </Text>
          <Text variant="title" color="#ffffff" numberOfLines={2}>
            {event.title}
          </Text>
          <Text variant="caption" color="rgba(255,255,255,0.85)">
            {formatDateSlot(event.nextEventDate, event.startDate)} · {formatEventLocation(event)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
