import { Pressable } from 'react-native';

import { radius, shadows, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import type { EventMapPin } from '../../types/map';
import { Text } from '../ui';

interface EventMapMarkerProps {
  pin: EventMapPin;
  selected: boolean;
  onPress: () => void;
  /** Percentage position within the placeholder map canvas. */
  position: { leftPct: number; topPct: number };
}

/** Price-pill marker (FeverUp-style pattern, CultureOwl visual language). */
export function EventMapMarker({ pin, selected, onPress, position }: EventMapMarkerProps) {
  const theme = useAppTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={pin.title}
      onPress={onPress}
      style={({ pressed }) => ({
        position: 'absolute',
        left: `${position.leftPct}%`,
        top: `${position.topPct}%`,
        backgroundColor: selected ? theme.colors.text : theme.colors.primary,
        borderRadius: radius.full,
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
        opacity: pressed ? 0.85 : 1,
        ...shadows.card,
      })}
    >
      <Text variant="caption" color="#ffffff" style={{ fontFamily: 'PlusJakartaSans_600SemiBold' }}>
        {pin.priceLabel}
      </Text>
    </Pressable>
  );
}
