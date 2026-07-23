import { router } from 'expo-router';
import { Dimensions } from 'react-native';

import { HorizontalCarousel } from '../../../components/layout/HorizontalCarousel';
import { SectionHeader } from '../../../components/layout/SectionHeader';
import { VenueCard } from '../../../components/venues/VenueCard';
import { spacing } from '../../../design/tokens';
import { useVenuesInfinite } from '../../../queries/venues.queries';

// Same peek-ratio math as PortraitEventCard.tsx (slidesPerView: 2.3, matches web's Swiper config).
const SLIDES_PER_VIEW = 2.3;
const CARD_GAP = spacing.md;
const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = Math.floor((screenWidth - spacing.screenX * 2 - CARD_GAP * (SLIDES_PER_VIEW - 1)) / SLIDES_PER_VIEW);

/** New Home row — sits above Culture News, per explicit request. No web precedent for a minimum-count threshold here (unlike GenreEventRows), so it shows whenever there's at least one result. */
export function VenuesRow({ city }: { city: string }) {
  const { data } = useVenuesInfinite(city);
  const venues = data?.pages[0]?.venues ?? [];

  if (venues.length === 0) return null;

  return (
    <>
      <SectionHeader title="Venues" actionLabel="View All" onAction={() => router.push('/venues')} spacious />
      <HorizontalCarousel>
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} width={CARD_WIDTH} />
        ))}
      </HorizontalCarousel>
    </>
  );
}
