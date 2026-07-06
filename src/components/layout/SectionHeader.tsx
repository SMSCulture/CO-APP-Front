import { Pressable, View } from 'react-native';

import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { Text } from '../ui';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, actionLabel, onAction }: SectionHeaderProps) {
  const theme = useAppTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginTop: spacing.xl,
        marginBottom: spacing.md,
      }}
    >
      <Text variant="heading">{title}</Text>
      {actionLabel && onAction ? (
        <Pressable accessibilityRole="button" onPress={onAction} hitSlop={8}>
          <Text variant="caption" color={theme.colors.primary}>
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
