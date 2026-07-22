import { router } from 'expo-router';

import { EventCarousel } from '../../../components/discovery/EventCarousel';
import { SectionHeader } from '../../../components/layout/SectionHeader';
import { useEventsFeed } from '../../../queries/events.queries';
import { useMainGenres } from '../../../queries/genres.queries';
import type { MainGenre } from '../../../types/genre';

const MIN_EVENTS_TO_SHOW_ROW = 4;

// Curated display order — ported verbatim from HOME_GENRE_ORDER in
// app/components/genre-events/genre-events-section.tsx on web. Keyed by the
// real genre `name` (not id), since that's what's stable/curated there too.
const HOME_GENRE_ORDER: Record<string, number> = {
  art_and_museum: 0,
  THEATER: 1,
  MUSIC: 2,
  CLASS: 3,
  FESTIVAL: 4,
  KIDS: 5,
};

function GenreCarouselRow({ genre, city }: { genre: MainGenre; city: string }) {
  // Server-side tagId filter, same as web's per-genre useEventsFeed call —
  // NOT a client-side filter over a shared flat list (that was the bug).
  const { data } = useEventsFeed({ city, tagId: genre.id, limit: 8 });
  const events = data?.events ?? [];

  if (events.length < MIN_EVENTS_TO_SHOW_ROW) return null;

  return (
    <>
      <SectionHeader
        title={genre.display}
        actionLabel="View All"
        onAction={() => router.push({ pathname: '/(tabs)/search', params: { tagIds: genre.id } })}
      />
      <EventCarousel events={events} />
    </>
  );
}

/**
 * One horizontal carousel per genre — mirrors GenreEventsSection on web
 * exactly: real genres from the backend (useMainGenres, not the old fake
 * GENRES constant), each genre self-fetches its own events server-side via
 * tagId, and only renders once it has >= 4 events.
 */
export function GenreEventRows({ city }: { city: string }) {
  const { data: genres } = useMainGenres();

  const orderedGenres = (genres ?? [])
    .filter((g) => g.isGenrePage)
    .sort((a, b) => {
      const rank = (name: string) => HOME_GENRE_ORDER[name] ?? Number.MAX_SAFE_INTEGER;
      return rank(a.name) - rank(b.name);
    });

  return (
    <>
      {orderedGenres.map((genre) => (
        <GenreCarouselRow key={genre.id} genre={genre} city={city} />
      ))}
    </>
  );
}
