import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Text } from '../../../components/ui';
import { radius, spacing } from '../../../design/tokens';
import { useAppTheme } from '../../../design/useAppTheme';

/**
 * Hero discovery block: headline + tappable search affordance that jumps to
 * the Search tab (premium discovery pattern — search is a promise, not a form).
 */
export function HeroDiscoverySection({ city }: { city: string }) {
  const theme = useAppTheme();
  return (
    <View style={{ gap: spacing.md, marginBottom: spacing.sm }}>
      <Text variant="display">What’s on in {city}?</Text>
      <Pressable
        accessibilityRole="search"
        accessibilityLabel="Search events"
        onPress={() => router.push('/(tabs)/search')}
        style={({ pressed }) => ({
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: radius.full,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Text muted>⌕  Concerts, museums, theatre…</Text>
      </Pressable>
    </View>
  );
}
