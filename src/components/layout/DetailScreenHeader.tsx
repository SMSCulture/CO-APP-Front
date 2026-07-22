import { router } from 'expo-router';
import { View } from 'react-native';

import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { IconButton, Text } from '../ui';
import { ChevronLeftIcon } from './icons/MenuIcons';

/**
 * Header for pushed, non-tab screens (Settings hub, Edit Profile, etc.) —
 * back button + title, deliberately not the shared AppHeader, which always
 * shows a location-switcher trigger that doesn't belong on these screens.
 */
export function DetailScreenHeader({ title }: { title: string }) {
  const theme = useAppTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.lg }}>
      <IconButton accessibilityLabel="Go back" onPress={() => router.back()} transparent>
        <ChevronLeftIcon color={String(theme.colors.text)} size={22} />
      </IconButton>
      <Text variant="title">{title}</Text>
    </View>
  );
}
