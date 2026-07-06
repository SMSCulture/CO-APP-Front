import { router } from 'expo-router';
import { Image } from 'expo-image';
import { View } from 'react-native';

import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import type { Venue } from '../../types/venue';
import { Card, Text } from '../ui';

export function VenueCard({ venue }: { venue: Venue }) {
  const theme = useAppTheme();
  return (
    <Card padded={false} onPress={() => router.push(`/venues/${venue.id}`)}>
      <Image
        source={{ uri: venue.imageUrl ?? undefined }}
        style={{ width: '100%', aspectRatio: 16 / 9, backgroundColor: theme.colors.skeleton }}
        contentFit="cover"
        accessibilityLabel={venue.name}
      />
      <View style={{ padding: spacing.lg, gap: 2 }}>
        <Text variant="subheading" numberOfLines={1}>
          {venue.name}
        </Text>
        <Text variant="caption" muted numberOfLines={1}>
          {venue.city}, {venue.state}
        </Text>
      </View>
    </Card>
  );
}
