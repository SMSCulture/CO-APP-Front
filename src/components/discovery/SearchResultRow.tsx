import { router } from 'expo-router';
import { Image } from 'expo-image';
import type { GestureResponderEvent } from 'react-native';
import { Pressable, View } from 'react-native';

import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { formatDateSlot } from '../../lib/formatDate';
import { formatEventLocation } from '../../lib/formatLocation';
import { formatEventPrice } from '../../lib/formatPrice';
import { useFavoritesStore } from '../../store/favoritesStore';
import { toFavoriteItem } from '../../types/favorite';
import type { EventSummary } from '../../types/event';
import { BuildingIcon } from '../layout/icons/MenuIcons';
import { HeartButton } from './HeartButton';
import { Text } from '../ui';

interface SearchResultRowProps { event: EventSummary; }

/** Rich horizontal search result with image, save, venue, title, time and price. */
export function SearchResultRow({ event }: SearchResultRowProps) {
  const theme = useAppTheme();
  const isFavorite = useFavoritesStore((state) => state.isFavorite('event', event.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const venueName = formatEventLocation(event);
  const dateLabel = formatDateSlot(event.nextEventDate, event.startDate);
  const priceText = formatEventPrice(event);

  const save = (pressEvent: GestureResponderEvent) => {
    pressEvent.stopPropagation();
    toggleFavorite(toFavoriteItem('event', event));
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${event.title}`}
      onPress={() => router.push(`/events/${event.id}`)}
      style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'stretch', minHeight: 128, opacity: pressed ? 0.85 : 1 })}
    >
      <View style={{ width: 122, height: 128 }}>
        <Image
          source={{ uri: event.mainImageUrl ?? undefined }}
          style={{ width: '100%', height: '100%', borderRadius: radius.md, backgroundColor: theme.colors.skeleton }}
          contentFit="cover"
          transition={200}
          accessibilityLabel={event.title}
        />
        <View style={{ position: 'absolute', right: 1, top: 1 }}>
          <HeartButton saved={isFavorite} onPress={save} size={22} />
        </View>
      </View>
      <View style={{ flex: 1, paddingLeft: spacing.md, paddingVertical: 2, gap: 5 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
          <BuildingIcon color={String(theme.colors.textMuted)} size={14} />
          <Text variant="caption" muted numberOfLines={1} style={{ flex: 1 }}>{venueName}</Text>
        </View>
        <Text variant="subheading" numberOfLines={2}>{event.title}</Text>
        {dateLabel ? <Text variant="body" color={theme.colors.primary} numberOfLines={1}>{dateLabel}</Text> : null}
        {priceText ? <Text variant="bodyBold" numberOfLines={1}>{priceText}</Text> : null}
      </View>
    </Pressable>
  );
}
