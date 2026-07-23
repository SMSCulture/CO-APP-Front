import { router } from 'expo-router';
import { View } from 'react-native';

import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { IconButton, Text } from '../ui';
import { ChevronLeftIcon } from './icons/MenuIcons';

const SIDE_WIDTH = 40;

interface DetailScreenHeaderProps {
  title: string;
  /** Optional centered line below the title — e.g. the current city (Art & Dine). */
  subtitle?: string;
  /** Where to go if there's no back history (e.g. this screen was deep-linked to directly). */
  fallbackHref?: string;
  /** Set false for bottom-tab screens (e.g. Tickets) — there's nothing to "go back" to. */
  showBack?: boolean;
}

/**
 * Shared header for every pushed/detail screen (Venues, Organizations,
 * Restaurants, Settings, Edit Profile, etc.) — back button + centered,
 * smaller title, deliberately not the shared AppHeader (which always shows
 * a location-switcher trigger that doesn't belong on these screens). Title
 * is centered with a same-width spacer opposite the back button so it stays
 * centered regardless of the back button's presence.
 *
 * router.back() silently no-ops if there's no back history (e.g. a deep
 * link straight into this screen) — falls back to a real navigation target
 * instead of leaving the button looking broken.
 */
export function DetailScreenHeader({
  title,
  subtitle,
  fallbackHref = '/(tabs)/home',
  showBack = true,
}: DetailScreenHeaderProps) {
  const theme = useAppTheme();

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace(fallbackHref as never);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.lg }}>
      <View style={{ width: SIDE_WIDTH }}>
        {showBack ? (
          <IconButton accessibilityLabel="Go back" onPress={goBack} transparent>
            <ChevronLeftIcon color={String(theme.colors.text)} size={22} />
          </IconButton>
        ) : null}
      </View>
      <View style={{ flex: 1 }}>
        <Text variant="heading" style={{ textAlign: 'center' }} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="caption" muted style={{ textAlign: 'center', marginTop: 2 }} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View style={{ width: SIDE_WIDTH }} />
    </View>
  );
}
