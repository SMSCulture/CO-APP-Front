import type { ReactNode } from 'react';
import { Pressable } from 'react-native';

import { radius } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';

interface IconButtonProps {
  children: ReactNode;
  onPress: () => void;
  accessibilityLabel: string;
  size?: number;
  transparent?: boolean;
}

export function IconButton({
  children,
  onPress,
  accessibilityLabel,
  size = 40,
  transparent = false,
}: IconButtonProps) {
  const theme = useAppTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => ({
        width: size,
        height: size,
        borderRadius: radius.full,
        backgroundColor: transparent ? 'transparent' : theme.colors.chipBackground,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: pressed ? 0.7 : 1,
      })}
    >
      {children}
    </Pressable>
  );
}
