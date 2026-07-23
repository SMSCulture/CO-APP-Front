import { Pressable, View } from 'react-native';
import Svg, { Line, Path, Rect } from 'react-native-svg';

import { radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { Text } from '../ui';

function CalendarIcon({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={5} width={18} height={16} rx={2} stroke={color} strokeWidth={2} />
      <Line x1={3} y1={10} x2={21} y2={10} stroke={color} strokeWidth={2} />
      <Line x1={8} y1={3} x2={8} y2={7} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={16} y1={3} x2={16} y2={7} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function GridIcon({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={3} width={7} height={7} rx={1.5} stroke={color} strokeWidth={2} />
      <Rect x={14} y={3} width={7} height={7} rx={1.5} stroke={color} strokeWidth={2} />
      <Rect x={3} y={14} width={7} height={7} rx={1.5} stroke={color} strokeWidth={2} />
      <Rect x={14} y={14} width={7} height={7} rx={1.5} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

function SortIcon({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M7 4v16M7 4L4 7M7 4l3 3" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M17 20V4M17 20l3-3M17 20l-3-3" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

interface FilterPillButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onPress: () => void;
}

function FilterPillButton({ icon, label, active, onPress }: FilterPillButtonProps) {
  const theme = useAppTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: radius.full,
        backgroundColor: active ? theme.colors.primary : theme.colors.chipBackground,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      {icon}
      <Text variant="caption" color={active ? '#ffffff' : theme.colors.text}>
        {label}
      </Text>
    </Pressable>
  );
}

interface FilterPillRowProps {
  onDatePress: () => void;
  onCategoryPress: () => void;
  onSortPress: () => void;
  dateActive?: boolean;
  categoryActive?: boolean;
  sortActive?: boolean;
  /** Selected category's display name — shown in place of the generic "Category" label, so people can see what category they're on. */
  categoryLabel?: string;
}

/** Date / Category / Sort — separate pill buttons below the search bar, matching the reference (not a single gear/sliders icon). */
export function FilterPillRow({
  onDatePress,
  onCategoryPress,
  onSortPress,
  dateActive,
  categoryActive,
  sortActive,
  categoryLabel,
}: FilterPillRowProps) {
  const theme = useAppTheme();
  const iconColor = (active?: boolean) => (active ? '#ffffff' : String(theme.colors.text));

  return (
    <View style={{ flexDirection: 'row', gap: spacing.sm, justifyContent: 'flex-start' }}>
      <FilterPillButton icon={<CalendarIcon color={iconColor(dateActive)} />} label="Date" active={dateActive} onPress={onDatePress} />
      <FilterPillButton
        icon={<GridIcon color={iconColor(categoryActive)} />}
        label={categoryActive && categoryLabel ? categoryLabel : 'Category'}
        active={categoryActive}
        onPress={onCategoryPress}
      />
      <FilterPillButton icon={<SortIcon color={iconColor(sortActive)} />} label="Sort" active={sortActive} onPress={onSortPress} />
    </View>
  );
}
