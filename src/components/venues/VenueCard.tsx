import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { HeartButton } from '../discovery/HeartButton';
import { useFavoriteToggle } from '../../queries/favorites.queries';
import { formatVenueType } from '../../lib/formatVenueType';
import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import type { Venue } from '../../types/venue';
import { MapPinIcon } from '../layout/icons/MenuIcons';
import { Text } from '../ui';

/**
 * Faithful port of components/directory/directory-card.tsx (via
 * app/venues/components/venue-card.tsx's field mapping) on web — square
 * image, pin + city topLine, venue type below the title. Matches the same
 * shell already used by PortraitEventCard.tsx (no bordered Card, no border).
 */
interface VenueCardProps {
  venue: Venue;
  /** Fixed width for horizontal carousel use (Home's Venues row); omit for grid use (flex: 1, VenuesScreen). */
  width?: number;
}

export function VenueCard({ venue, width }: VenueCardProps) {
  const theme = useAppTheme();
  const { isFavorite: saved, toggle } = useFavoriteToggle('venue', venue);
  const venueTypeLabel = formatVenueType(venue.venueType);

  return (
    // View, not Pressable, wrapping both the card Pressable and the heart —
    // same nested-<button> fix already applied in PortraitEventCard.
    <View style={width ? { width } : { flex: 1 }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={venue.name}
        onPress={() => router.push(`/venues/${venue.id}`)}
        style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}
      >
        <Image
          source={{ uri: venue.imageUrl ?? undefined }}
          style={{
            width: '100%',
            aspectRatio: 1,
            borderRadius: 10,
            backgroundColor: theme.colors.skeleton,
          }}
          contentFit="cover"
          accessibilityLabel={venue.name}
        />
        <View style={{ marginTop: 6, gap: 6 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
            <MapPinIcon color={String(theme.colors.primary)} size={16} />
            <Text variant="body" numberOfLines={1} style={{ flex: 1 }}>
              {venue.city}
            </Text>
          </View>
          <Text variant="subheading" numberOfLines={1}>
            {venue.name}
          </Text>
          {venueTypeLabel ? (
            <Text variant="caption" muted numberOfLines={1}>
              {venueTypeLabel}
            </Text>
          ) : null}
        </View>
      </Pressable>

      <View style={{ position: 'absolute', top: spacing.xs, right: spacing.xs }}>
        <HeartButton saved={saved} onPress={toggle} />
      </View>
    </View>
  );
}
