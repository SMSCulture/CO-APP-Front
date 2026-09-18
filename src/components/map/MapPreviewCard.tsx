import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { formatDateSlot } from '../../lib/formatDate';
import { formatEventLocation } from '../../lib/formatLocation';
import { formatEventPrice } from '../../lib/formatPrice';
import { useFavoritesStore } from '../../store/favoritesStore';
import type { EventSummary } from '../../types/event';
import { toFavoriteItem } from '../../types/favorite';
import { Badge, Text } from '../ui';
const IMAGE_SIZE = 132;
export function MapPreviewCard({ event }: { event: EventSummary }) {
  const theme = useAppTheme();
  const favorite = useFavoritesStore((s) => s.isFavorite('event', event.id));
  const toggle = useFavoritesStore((s) => s.toggleFavorite);
  const moreDates = event.nextEventDate ? 0 : 0;
  return (
    <Pressable
      onPress={() => router.push(`/events/${event.id}`)}
      style={({ pressed }) => ({ flexDirection: 'row', opacity: pressed ? 0.85 : 1 })}
    >
      <View>
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
        <Pressable
          accessibilityLabel={favorite ? 'Remove from saved' : 'Save event'}
          onPress={(e) => {
            e.stopPropagation();
            toggle(toFavoriteItem('event', event));
          }}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 34,
            height: 34,
            borderRadius: 17,
            backgroundColor: 'rgba(7,8,12,.62)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text color="#fff" style={{ fontSize: 21 }}>
            {favorite ? '♥' : '♡'}
          </Text>
        </Pressable>
      </View>
      <View style={{ flex: 1, paddingLeft: spacing.md, justifyContent: 'center', gap: 3 }}>
        <Text variant="caption" muted numberOfLines={1}>
          ⌖ {formatEventLocation(event)}
        </Text>
        <Text variant="subheading" numberOfLines={2}>
          {event.title}
        </Text>
        <Text variant="caption">
          {formatDateSlot(event.nextEventDate, event.startDate)}
          {moreDates ? ` and ${moreDates} others` : ''}
        </Text>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Badge label={formatEventPrice(event)} />
          <Text variant="caption" muted>
            Event details ↗
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
