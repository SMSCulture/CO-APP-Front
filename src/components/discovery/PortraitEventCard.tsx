import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import { radius, shadows, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { formatFromPrice } from '../../lib/formatPrice';
import type { EventSummary } from '../../types/event';
import { Badge, IconButton, Text } from '../ui';

interface PortraitEventCardProps {
  event: EventSummary;
  saved?: boolean;
  onToggleSave?: () => void;
}

/**
 * Tall portrait card for home rows (reference: premium discovery apps).
 * Image with genre badge + heart, venue pill overlapping the image bottom,
 * two-line title, "From $X" price.
 */
export function PortraitEventCard({ event, saved = false, onToggleSave }: PortraitEventCardProps) {
  const theme = useAppTheme();
  const genre = event.tags[0]?.name;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={event.title}
      onPress={() => router.push(`/events/${event.id}`)}
      style={({ pressed }) => ({ width: 240, opacity: pressed ? 0.92 : 1 })}
    >
      <View style={{ borderRadius: radius.lg, overflow: 'hidden', ...shadows.card }}>
        <Image
          source={{ uri: event.mainImageUrl ?? undefined }}
          style={{ width: 240, height: 300, backgroundColor: theme.colors.skeleton }}
          contentFit="cover"
          transition={200}
        />
        {genre ? (
          <View style={{ position: 'absolute', top: spacing.md, left: spacing.md }}>
            <Badge label={genre} color={theme.colors.primary} />
          </View>
        ) : null}
        <View style={{ position: 'absolute', top: spacing.sm, right: spacing.sm }}>
          <IconButton
            accessibilityLabel={saved ? 'Remove from saved' : 'Save event'}
            onPress={onToggleSave ?? (() => {})}
            size={36}
          >
            <Text variant="subheading" color={saved ? theme.colors.danger : theme.colors.text}>
              {saved ? '♥' : '♡'}
            </Text>
          </IconButton>
        </View>
        {/* Venue pill overlapping the image bottom edge */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            backgroundColor: theme.colors.surfaceElevated,
            borderTopRightRadius: radius.lg,
            paddingVertical: spacing.xs,
            paddingHorizontal: spacing.md,
            maxWidth: 200,
          }}
        >
          <Text variant="caption" muted numberOfLines={1}>
            🏛 {event.venueName ?? event.city}
          </Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm, gap: 2 }}>
        <Text variant="subheading" numberOfLines={2}>
          {event.title}
        </Text>
        <Text variant="caption" muted>
          {formatFromPrice(event)}
        </Text>
      </View>
    </Pressable>
  );
}
