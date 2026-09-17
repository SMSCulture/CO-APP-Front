import { router } from 'expo-router';

import { HorizontalCarousel } from '../../../components/layout/HorizontalCarousel';
import { SectionHeader } from '../../../components/layout/SectionHeader';
import { RestaurantCard } from '../../../components/restaurants/RestaurantCard';
import { spacing } from '../../../design/tokens';
import { getPhoneWidth } from '../../../lib/screenWidth';
import { useRestaurantsInfinite } from '../../../queries/restaurants.queries';

// Same peek-ratio math as PortraitEventCard.tsx (slidesPerView: 2.3, matches
// web's Swiper config). getPhoneWidth() (not raw Dimensions.get) clamps the
// web preview's actual desktop browser width down to a phone-sized max.
const SLIDES_PER_VIEW = 2.3;
const CARD_GAP = spacing.md;
const screenWidth = getPhoneWidth();
const CARD_WIDTH = Math.floor((screenWidth - spacing.screenX * 2 - CARD_GAP * (SLIDES_PER_VIEW - 1)) / SLIDES_PER_VIEW);

/** New Home row — sits above Culture News, per explicit request. No web precedent for a minimum-count threshold here (unlike GenreEventRows), so it shows whenever there's at least one result. */
export function RestaurantsRow({ city }: { city: string }) {
  const { data } = useRestaurantsInfinite(city);
  const restaurants = data?.pages[0]?.restaurants ?? [];

  if (restaurants.length === 0) return null;

  return (
    <>
      <SectionHeader title="Restaurants" actionLabel="View All" onAction={() => router.push('/restaurants')} spacious />
      <HorizontalCarousel>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} width={CARD_WIDTH} />
        ))}
      </HorizontalCarousel>
    </>
  );
}
