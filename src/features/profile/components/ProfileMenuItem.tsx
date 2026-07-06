import type { ReactNode } from 'react';
import { Pressable } from 'react-native';

import { Text } from '../../../components/ui';
import { spacing } from '../../../design/tokens';
import { useAppTheme } from '../../../design/useAppTheme';

interface ProfileMenuItemProps {
  label: string;
  onPress?: () => void;
  right?: ReactNode;
  destructive?: boolean;
}

export function ProfileMenuItem({ label, onPress, right, destructive }: ProfileMenuItemProps) {
  const theme = useAppTheme();
  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <Text variant="body" color={destructive ? theme.colors.danger : undefined}>
        {label}
      </Text>
      {right ?? (onPress ? <Text muted>›</Text> : null)}
    </Pressable>
  );
}
