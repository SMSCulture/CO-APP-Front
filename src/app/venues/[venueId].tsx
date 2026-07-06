import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { View } from 'react-native';

import { AppHeader } from '../../components/layout/AppHeader';
import { ErrorState, LoadingState, Screen, Text } from '../../components/ui';
import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { useVenue } from '../../queries/venues.queries';
import type { VenueRouteParams } from '../../types/navigation';

export default function VenueRoute() {
  const theme = useAppTheme();
  const { venueId } = useLocalSearchParams<VenueRouteParams>();
  const { data: venue, isLoading, isError, refetch } = useVenue(venueId);

  if (isLoading) {
    return (
      <Screen>
        <LoadingState rows={1} />
      </Screen>
    );
  }
  if (isError || !venue) {
    return (
      <Screen>
        <ErrorState message="We couldn’t load this venue." onRetry={() => refetch()} />
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <AppHeader title={venue.name} subtitle={`${venue.city}, ${venue.state}`} />
      <View style={{ gap: spacing.lg }}>
        <Image
          source={{ uri: venue.imageUrl ?? undefined }}
          style={{
            width: '100%',
            aspectRatio: 16 / 9,
            borderRadius: radius.lg,
            backgroundColor: theme.colors.skeleton,
          }}
          contentFit="cover"
          accessibilityLabel={venue.name}
        />
        {venue.address ? <Text muted>{venue.address}</Text> : null}
        {venue.description ? <Text>{venue.description}</Text> : null}
      </View>
    </Screen>
  );
}
