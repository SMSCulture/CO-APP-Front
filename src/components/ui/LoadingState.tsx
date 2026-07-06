import { View } from 'react-native';

import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';

/**
 * Skeleton loading placeholder — mirrors the web frontend's mandatory
 * "structured skeletons, no spinners" rule. Blocks approximate card layouts.
 */
export function LoadingState({ rows = 3 }: { rows?: number }) {
  const theme = useAppTheme();
  return (
    <View accessibilityLabel="Loading" style={{ gap: spacing.lg, paddingVertical: spacing.lg }}>
      {Array.from({ length: rows }).map((_, i) => (
        <View key={i} style={{ gap: spacing.sm }}>
          <View
            style={{
              height: 160,
              borderRadius: radius.lg,
              backgroundColor: theme.colors.skeleton,
            }}
          />
          <View
            style={{
              height: 16,
              width: '70%',
              borderRadius: radius.sm,
              backgroundColor: theme.colors.skeleton,
            }}
          />
          <View
            style={{
              height: 12,
              width: '45%',
              borderRadius: radius.sm,
              backgroundColor: theme.colors.skeleton,
            }}
          />
        </View>
      ))}
    </View>
  );
}
