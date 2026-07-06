import { Pressable } from 'react-native';

import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { Text } from './Text';

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export function Chip({ label, active = false, onPress }: ChipProps) {
  const theme = useAppTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: active ? theme.colors.chipActiveBackground : theme.colors.chipBackground,
        borderRadius: radius.full,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <Text
        variant="caption"
        color={active ? theme.colors.chipActiveText : theme.colors.text}
        style={{ fontFamily: 'PlusJakartaSans_600SemiBold' }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
