import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { radius, spacing } from '../../../design/tokens';
import { useAppTheme } from '../../../design/useAppTheme';
import { Text } from '../../../components/ui';

interface IconMenuRowProps {
  icon: ReactNode;
  label: string;
  description?: string;
  right?: ReactNode;
  onPress?: () => void;
  /** Red label text — pair with a red-tinted icon for destructive rows (Delete Account, Logout). */
  destructive?: boolean;
}

/**
 * Whole row is a rectangular card (background + rounded corners + border) —
 * not just a small icon badge floating next to plain text. The `right`
 * value (e.g. the city name) sits directly next to the title, not pinned
 * to the far edge of the card.
 */
export function IconMenuRow({ icon, label, description, right, onPress, destructive = false }: IconMenuRowProps) {
  const theme = useAppTheme();
  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        padding: spacing.md,
        marginBottom: spacing.sm,
        borderRadius: radius.lg,
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View
        style={{
          width: 44,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
          <Text variant="bodyBold" color={destructive ? theme.colors.danger : undefined}>
            {label}
          </Text>
          {right}
        </View>
        {description ? (
          <Text variant="caption" muted numberOfLines={2} style={{ marginTop: 2 }}>
            {description}
          </Text>
        ) : null}
      </View>
      {onPress ? <Text muted>›</Text> : null}
    </Pressable>
  );
}
