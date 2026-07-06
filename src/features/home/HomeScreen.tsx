import { useState } from 'react';
import { View } from 'react-native';

import { AppHeader } from '../../components/layout/AppHeader';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { CategoryChips } from '../../components/discovery/CategoryChips';
import { FilterBar } from '../../components/discovery/FilterBar';
import { ErrorState, LoadingState, Screen } from '../../components/ui';
import { DEFAULT_CITY } from '../../config/constants';
import { spacing } from '../../design/tokens';
import { useEventsFeed } from '../../queries/events.queries';
import { FeaturedEventsSection } from './components/FeaturedEventsSection';
import { NearbyEventsSection } from './components/NearbyEventsSection';
import { WeekendPicksSection } from './components/WeekendPicksSection';

export function HomeScreen() {
  const [city, setCity] = useState<string>(DEFAULT_CITY);
  const [genre, setGenre] = useState<string | null>(null);
  const { data, isLoading, isError, refetch } = useEventsFeed({
    city,
    tagId: genre ?? undefined,
  });

  const events = data?.events ?? [];

  return (
    <Screen scroll>
      <AppHeader title="Discover" subtitle={city} />
      <View style={{ gap: spacing.md }}>
        <FilterBar city={city} onCityChange={setCity} />
        <CategoryChips selected={genre} onSelect={setGenre} />
      </View>

      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState message="We couldn’t load events." onRetry={() => refetch()} />
      ) : (
        <>
          <FeaturedEventsSection events={events} />
          <SectionHeader title="This weekend" />
          <WeekendPicksSection events={events} />
          <SectionHeader title="Near you" />
          <NearbyEventsSection events={events} />
        </>
      )}
    </Screen>
  );
}
