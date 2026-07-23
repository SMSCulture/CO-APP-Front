import { Pressable, View } from 'react-native';

import { spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { Text } from '../ui';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  /** Doubles the top margin (Home's row-to-row rhythm) — opt-in so other screens keep the tighter default. */
  spacious?: boolean;
}

export function SectionHeader({ title, actionLabel, onAction, spacious = false }: SectionHeaderProps) {
  const theme = useAppTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginTop: spacious ? spacing.xl * 2 : spacing.xl,
        marginBottom: spacing.md,
      }}
    >
      <Text variant="heading">{title}</Text>
      {actionLabel && onAction ? (
        <Pressable accessibilityRole="button" onPress={onAction} hitSlop={8}>
          {/* variant="label" is uppercase by default (Text.tsx) — overridden
              here since "View All" should read in normal case, not "VIEW ALL". */}
          <Text variant="label" color={theme.colors.text} style={{ textTransform: 'none' }}>
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
