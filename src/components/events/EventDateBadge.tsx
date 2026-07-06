import { View } from 'react-native';

import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { formatDateBadge } from '../../lib/formatDate';
import { Text } from '../ui';

export function EventDateBadge({ date }: { date: string }) {
  const theme = useAppTheme();
  const { day, month } = formatDateBadge(date);
  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        borderRadius: radius.md,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        alignItems: 'center',
      }}
    >
      <Text variant="heading" color={theme.colors.danger}>
        {day}
      </Text>
      <Text variant="label">{month}</Text>
    </View>
  );
}
