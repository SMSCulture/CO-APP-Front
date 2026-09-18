import { router } from 'expo-router';
import { useWindowDimensions, View } from 'react-native';

import { SectionHeader } from '../../../components/layout/SectionHeader';
import { RestaurantCard } from '../../../components/restaurants/RestaurantCard';
import { spacing } from '../../../design/tokens';
import { useRestaurantsInfinite } from '../../../queries/restaurants.queries';

// Same peek-ratio math as PortraitEventCard.tsx (slidesPerView: 2.3, matches
// web's Swiper config). getPhoneWidth() (not raw Dimensions.get) clamps the
// web preview's actual desktop browser width down to a phone-sized max.
const CARD_GAP = spacing.md;

/** New Home row — sits above Culture News, per explicit request. No web precedent for a minimum-count threshold here (unlike GenreEventRows), so it shows whenever there's at least one result. */
export function RestaurantsRow({ city }: { city: string }) {
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = Math.floor((Math.min(screenWidth, 480) - spacing.screenX * 2 - CARD_GAP) / 2);
  const { data } = useRestaurantsInfinite(city);
  const restaurants = data?.pages[0]?.restaurants ?? [];

  if (restaurants.length === 0) return null;

  return (
    <>
      <SectionHeader title="Art & Dine" actionLabel="View All" onAction={() => router.push('/art-and-dine')} spacious />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md }}>
        {restaurants.slice(0, 4).map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} width={cardWidth} />
        ))}
      </View>
    </>
  );
}
