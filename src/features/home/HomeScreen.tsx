import { router } from 'expo-router';
import { useState } from 'react';

import { SectionHeader } from '../../components/layout/SectionHeader';
import { CategoryRectangleRow } from '../../components/discovery/CategoryRectangleRow';
import { EventCarousel } from '../../components/discovery/EventCarousel';
import { FilterPanel } from '../../components/discovery/FilterPanel';
import { ErrorState, LoadingState, Screen } from '../../components/ui';
import { DEFAULT_CITY } from '../../config/constants';
import { useEventsFeed } from '../../queries/events.queries';
import { useLocationStore } from '../../store/locationStore';
import { DEFAULT_EVENT_FILTERS, type EventFiltersState } from '../../types/filters';
import { CultureNewsSection } from './components/CultureNewsSection';
import { GenreEventRows } from './components/GenreEventRows';
import { HomeHeader } from './components/HomeHeader';
import { InviteExploreCard } from './components/InviteExploreCard';
import { LocationRow } from './components/LocationRow';
import { RestaurantsRow } from './components/RestaurantsRow';
import { VenuesRow } from './components/VenuesRow';

/**
 * Row order — intentionally NOT a mirror of web's bottom-of-page category
 * placement (that was the original layout here). Per explicit mobile-only
 * reorder request:
 *   1. HomeHeader — search bar + hamburger only
 *   2. Location row — moved down out of the header
 *   3. Categories — moved up from the bottom
 *   4. "Events Near You" — horizontal carousel
 *   5. One horizontal carousel per genre (>= 4 events)
 *   6. Venues row, Restaurants row — new, above Culture News
 *   7. Culture News — horizontal carousel
 * (Banner ads and Suggested Cities from web are skipped — no ad system on
 * mobile, and city switching already has its own dedicated UI here.)
 */
export function HomeScreen() {
  const { selectedCity } = useLocationStore();
  const city = selectedCity?.city ?? DEFAULT_CITY;
  const [homeFilterOpen, setHomeFilterOpen] = useState(false);
  const { data, isLoading, isError, refetch } = useEventsFeed({ city });

  const events = data?.events ?? [];

  const goToNews = () => router.push('/news');

  // Pressing a filter here doesn't just filter Home in place — it pops the
  // panel up, and picking any option immediately runs that search on the
  // Search screen instead (per explicit request).
  const applyFilterAndGoToSearch = (filters: EventFiltersState) => {
    setHomeFilterOpen(false);
    router.push({
      pathname: '/(tabs)/search',
      params: {
        dateFilter: filters.dateFilter || undefined,
        tagIds: filters.tagIds.length ? filters.tagIds.join(',') : undefined,
        virtual: filters.virtual ? '1' : undefined,
      },
    });
  };

  return (
    <Screen scroll>
      <HomeHeader onFilterPress={() => setHomeFilterOpen(true)} />

      {/* 2. Location — moved down out of the header, now above Categories. */}
      <LocationRow />

      {/* 3. Categories — moved up from the bottom (was "Discover more"). */}
      <SectionHeader title="Categories" />
      <CategoryRectangleRow
        variant="row"
        onSelect={(genreId) => genreId && router.push({ pathname: '/(tabs)/search', params: { tagIds: genreId } })}
      />

      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState message="We couldn’t load events." onRetry={() => refetch()} />
      ) : events.length === 0 ? null : (
        <>
          {/* 4. "Events Near You" — mirrors DiscoveryEvents on web. */}
          <SectionHeader
            title="Events Near You"
            actionLabel="View All"
            onAction={() => router.push('/(tabs)/search')}
            spacious
          />
          <EventCarousel events={events} />

          {/* 5. One carousel per genre with >= 4 events — mirrors
              GenreEventsSection on web exactly. Self-fetches per real genre
              server-side (tagId) — see GenreEventRows.tsx. */}
          <GenreEventRows city={city} />

          {/* 6. Venues row, Restaurants row — new, above Culture News. */}
          <VenuesRow city={city} />
          <RestaurantsRow city={city} />

          {/* 7. Culture News — mirrors CulturalNewsSection on web. */}
          <SectionHeader title="Culture news" actionLabel="View All" onAction={goToNews} spacious />
          <CultureNewsSection />

          {/* 8. Invite Friends / Explore — brand-voice closer at the bottom of Home. */}
          <InviteExploreCard />
        </>
      )}

      <FilterPanel
        visible={homeFilterOpen}
        onClose={() => setHomeFilterOpen(false)}
        filters={DEFAULT_EVENT_FILTERS}
        onChange={applyFilterAndGoToSearch}
      />
    </Screen>
  );
}
