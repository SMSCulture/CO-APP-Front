import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Dimensions, Pressable, View } from 'react-native';

import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { formatDateSlot } from '../../lib/formatDate';
import { formatEventLocation } from '../../lib/formatLocation';
import { formatEventPrice } from '../../lib/formatPrice';
import { useFavoriteToggle } from '../../queries/favorites.queries';
import type { EventSummary } from '../../types/event';
import { MapPinIcon } from '../layout/icons/MenuIcons';
import { Text } from '../ui';
import { HeartButton } from './HeartButton';

// Matches the real web carousel's peek ratio, not an invented "exactly 3"
// grid: web's genre/nearby-events rows use Swiper with slidesPerView: 2.3
// on mobile (app/components/genre-events/genre-events-carousel.tsx,
// app/components/nearby-events/nearby-events-carousel.tsx) — 2 full cards
// plus a partial 3rd peeking in as a scroll affordance. CARD_GAP must stay
// equal to HorizontalCarousel's contentContainerStyle gap (spacing.md).
const SLIDES_PER_VIEW = 2.3;
const CARD_GAP = spacing.md;
const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = Math.floor((screenWidth - spacing.screenX * 2 - CARD_GAP * (SLIDES_PER_VIEW - 1)) / SLIDES_PER_VIEW);

interface PortraitEventCardProps {
  event: EventSummary;
}

/**
 * Faithful port of components/directory/directory-card.tsx (via
 * app/calendar/events/components/event-card.tsx's field mapping) on web —
 * NOT an invented layout. Structure, in order: square image (aspect 1:1,
 * 10px radius) with a heart overlay top-right, then below: topLine (pin +
 * venue name), title, infoRow (date label), price — same fields, same
 * order, same "square image + stacked text below" shape used site-wide for
 * every directory card type.
 */
export function PortraitEventCard({ event }: PortraitEventCardProps) {
  const theme = useAppTheme();
  const { isFavorite: saved, toggle } = useFavoriteToggle('event', event);
  const venueName = formatEventLocation(event);
  const dateLabel = formatDateSlot(event.nextEventDate, event.startDate);
  const priceText = formatEventPrice(event);

  return (
    // Outer View, not Pressable: on react-native-web, Pressable renders an
    // HTML <button>. The card tap area and the save IconButton were both
    // Pressables, and the IconButton was nested inside the card's, producing
    // <button><button/></button> — invalid HTML, breaks hydration. Fixed by
    // making them siblings here (same visual position via absolute
    // positioning) instead of parent/child.
    <View style={{ width: CARD_WIDTH }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={event.title}
        onPress={() => router.push(`/events/${event.id}`)}
        style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}
      >
        <Image
          source={{ uri: event.mainImageUrl ?? undefined }}
          style={{
            width: CARD_WIDTH,
            aspectRatio: 1,
            borderRadius: 10,
            backgroundColor: theme.colors.skeleton,
          }}
          contentFit="cover"
          transition={200}
        />
        <View style={{ marginTop: 6, gap: 6 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
            <MapPinIcon color={String(theme.colors.primary)} size={16} />
            <Text variant="body" numberOfLines={1} style={{ flex: 1 }}>
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

      {/* Sibling, not child, of the card Pressable above — see comment above. */}
      <View style={{ position: 'absolute', top: spacing.xs, right: spacing.xs }}>
        <HeartButton saved={saved} onPress={toggle} />
      </View>
    </View>
  );
}
