import type { ReactNode } from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';

import { radius, shadows, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';

interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  padded?: boolean;
  style?: ViewStyle;
}

export function Card({ children, onPress, padded = true, style }: CardProps) {
  const theme = useAppTheme();
  const base: ViewStyle = {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
    ...(padded ? { padding: spacing.lg } : {}),
    ...shadows.card,
  };

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [base, { opacity: pressed ? 0.92 : 1 }, style]}
      >
        {children}
      </Pressable>
    );
  }
  return <View style={[base, style]}>{children}</View>;
}
