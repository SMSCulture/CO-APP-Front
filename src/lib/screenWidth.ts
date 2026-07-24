import { Dimensions } from 'react-native';

/**
 * Phone-width cap for carousel card-width math (PortraitEventCard,
 * VenuesRow, RestaurantsRow). On a real device `Dimensions.get('window').width`
 * is already phone-sized, so this is a no-op there. On the web preview
 * (`expo start --web`), it returns the actual desktop browser window width —
 * often 1400px+ — which made cards computed as `width / 2.3` genuinely huge
 * instead of the intended phone-sized peek-carousel look. Clamping to a
 * generous phone/small-tablet width fixes the web preview without changing
 * real-device behavior at all.
 */
const MAX_PHONE_WIDTH = 480;

export function getPhoneWidth(): number {
  return Math.min(Dimensions.get('window').width, MAX_PHONE_WIDTH);
}
