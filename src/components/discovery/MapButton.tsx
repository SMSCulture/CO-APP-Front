import { router } from 'expo-router';
import { Pressable } from 'react-native';

import { radius, shadows, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { Text } from '../ui';

/**
 * Floating "Map" pill — premium event-discovery pattern. Navigates to the
 * dedicated map screen; deliberately NOT a bottom tab.
 */
export function MapButton() {
  const theme = useAppTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Open map view"
      onPress={() => router.push('/map')}
      style={({ pressed }) => ({
        position: 'absolute',
        bottom: spacing.xl,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        backgroundColor: theme.colors.text,
        borderRadius: radius.full,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        opacity: pressed ? 0.85 : 1,
        ...shadows.raised,
      })}
    >
      <Text variant="bodyBold" color={theme.colors.background}>
        ◎ Map
      </Text>
    </Pressable>
  );
}
