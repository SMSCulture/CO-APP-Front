import { router } from 'expo-router';
import { View } from 'react-native';

import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { IconButton, Text } from '../ui';
import { ChevronLeftIcon } from './icons/MenuIcons';

interface DetailScreenHeaderProps {
  title: string;
  /** Optional centered line below the title, such as the current city. */
  subtitle?: string;
  /** Where a direct link returns when no local history exists. */
  fallbackHref?: string;
  /** Bottom-tab roots hide the arrow; pushed settings/details show it. */
  showBack?: boolean;
}

/** One uniform navigation header for pushed app and settings pages. */
export function DetailScreenHeader({ title, subtitle, fallbackHref = '/(tabs)/profile', showBack = true }: DetailScreenHeaderProps) {
  const theme = useAppTheme();
  const goBack = () => router.canGoBack() ? router.back() : router.replace(fallbackHref as never);
  return (
    <View style={{ minHeight: 64, flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm }}>
      <View style={{ width: 44 }}>
        {showBack ? (
          <IconButton accessibilityLabel="Go back" onPress={goBack} size={40} transparent>
            <View style={{ width: 36, height: 36, borderRadius: radius.full, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.chipBackground }}>
              <ChevronLeftIcon color={String(theme.colors.text)} size={20} />
            </View>
          </IconButton>
        ) : null}
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text variant="heading" numberOfLines={1}>{title}</Text>
        {subtitle ? <Text variant="caption" muted numberOfLines={1}>{subtitle}</Text> : null}
      </View>
      <View style={{ width: 44 }} />
    </View>
  );
}
