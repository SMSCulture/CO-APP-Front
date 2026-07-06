import { View } from 'react-native';

import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { Text } from './Text';

interface BadgeProps {
  label: string;
  color?: string;
}

export function Badge({ label, color }: BadgeProps) {
  const theme = useAppTheme();
  const background = color ?? theme.colors.accent;
  return (
    <View
      style={{
        backgroundColor: background,
        borderRadius: radius.sm,
        paddingVertical: 3,
        paddingHorizontal: spacing.sm,
        alignSelf: 'flex-start',
      }}
    >
      <Text variant="label" color="#ffffff">
        {label}
      </Text>
    </View>
  );
}
