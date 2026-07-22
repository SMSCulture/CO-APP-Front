import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { formatDateSlot } from '../../lib/formatDate';
import { formatEventLocation } from '../../lib/formatLocation';
import { formatEventPrice } from '../../lib/formatPrice';
import type { EventSummary } from '../../types/event';
import { MapPinIcon } from '../layout/icons/MenuIcons';
import { Text } from '../ui';

const THUMBNAIL_SIZE = 128;

interface SearchResultRowProps {
  event: EventSummary;
}

/**
 * Single-row search result: square thumbnail left, info right — same
 * fields, same order as PortraitEventCard.tsx (pin + venue, title, date,
 * price), just laid out horizontally instead of stacked, matching the
 * reference screenshot's list style. Distinct from PortraitEventCard (used
 * for grid/carousel listings, which stays a vertical stack).
 */
export function SearchResultRow({ event }: SearchResultRowProps) {
  const theme = useAppTheme();
  const venueName = formatEventLocation(event);
  const dateLabel = formatDateSlot(event.nextEventDate, event.startDate);
  const priceText = formatEventPrice(event);

  return (
    <Pressable
      onPress={() => router.push(`/events/${event.id}`)}
      style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', opacity: pressed ? 0.85 : 1 })}
    >
      <Image
        source={{ uri: event.mainImageUrl ?? undefined }}
        style={{
          width: THUMBNAIL_SIZE,
          height: THUMBNAIL_SIZE,
          borderRadius: radius.md,
          backgroundColor: theme.colors.skeleton,
        }}
        contentFit="cover"
        transition={200}
        accessibilityLabel={event.title}
      />
      <View style={{ flex: 1, paddingLeft: spacing.md, gap: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
          <MapPinIcon color={String(theme.colors.primary)} size={14} />
          <Text variant="caption" muted numberOfLines={1} style={{ flex: 1 }}>
            {venueName}
          </Text>
        </View>
        <Text variant="subheading" numberOfLines={2}>
          {event.title}
        </Text>
        {dateLabel ? (
          <Text variant="caption" numberOfLines={1}>
            {dateLabel}
          </Text>
        ) : null}
        {priceText ? (
          <Text variant="caption" numberOfLines={1}>
            {priceText}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}
