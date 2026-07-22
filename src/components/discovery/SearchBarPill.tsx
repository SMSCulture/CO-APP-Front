/**
 * Search bar with a filter icon docked inside the same pill — mirrors the
 * shape of components/layout/search-bar.tsx on web (icon + input, all one
 * rounded container). Two modes:
 *
 * - "link" (Home): not editable — the whole pill navigates to the Search
 *   tab on press ("search is a promise, not a form"). The filter icon
 *   opens the FilterPanel right on Home instead (see HomeScreen.tsx).
 * - "input" (Search screen): a real editable TextInput; the filter icon
 *   opens the FilterPanel via onFilterPress.
 *
 * Filter is separated by a grey vertical divider (not just a bare gear
 * icon) — matches the reference layout.
 */
import { Pressable, TextInput, View } from 'react-native';
import Svg, { Line } from 'react-native-svg';

import { SearchTabIcon } from '../layout/icons/TabIcons';
import { fontFamily, radius, spacing } from '../../design/tokens';
import { useAppTheme } from '../../design/useAppTheme';
import { Text } from '../ui';

function SlidersIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1={4} y1={6} x2={20} y2={6} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={4} y1={12} x2={20} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={4} y1={18} x2={20} y2={18} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={8} y1={4} x2={8} y2={8} stroke={color} strokeWidth={3} strokeLinecap="round" />
      <Line x1={15} y1={10} x2={15} y2={14} stroke={color} strokeWidth={3} strokeLinecap="round" />
      <Line x1={11} y1={16} x2={11} y2={20} stroke={color} strokeWidth={3} strokeLinecap="round" />
    </Svg>
  );
}

interface SearchBarPillProps {
  mode: 'link' | 'input';
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  onFilterPress?: () => void;
  hasActiveFilters?: boolean;
  /** Search screen now has separate Date/Category/Sort pills below instead — omit the docked icon there. */
  showFilterIcon?: boolean;
}

export function SearchBarPill({
  mode,
  placeholder,
  value,
  onChangeText,
  onPress,
  onFilterPress,
  hasActiveFilters = false,
  showFilterIcon = true,
}: SearchBarPillProps) {
  const theme = useAppTheme();

  const pillStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    minHeight: 52,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: radius.full,
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
  };

  const content = (
    <>
      <View style={{ marginRight: spacing.md }}>
        <SearchTabIcon color={String(theme.colors.textMuted)} size={20} />
      </View>
      {mode === 'input' ? (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          autoCorrect={false}
          returnKeyType="search"
          accessibilityLabel="Search events"
          style={{ flex: 1, color: theme.colors.text, fontSize: 16, fontFamily: fontFamily.regular }}
        />
      ) : (
        <Text muted style={{ flex: 1, fontSize: 16 }} numberOfLines={1}>
          {placeholder}
        </Text>
      )}

      {showFilterIcon ? (
        <>
          {/* Grey vertical divider before the filter icon — not just a bare gear icon. */}
          <View style={{ width: 1, height: 28, backgroundColor: theme.colors.border, marginHorizontal: spacing.sm }} />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Filters"
            onPress={onFilterPress}
            hitSlop={8}
            style={({ pressed }) => ({
              width: 40,
              height: 40,
              borderRadius: radius.full,
              backgroundColor: hasActiveFilters ? theme.colors.primary : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <SlidersIcon color={hasActiveFilters ? '#ffffff' : String(theme.colors.text)} size={20} />
          </Pressable>
        </>
      ) : null}
    </>
  );

  if (mode === 'link') {
    return (
      <Pressable
        accessibilityRole="search"
        accessibilityLabel="Search events"
        onPress={onPress}
        style={({ pressed }) => [pillStyle, { opacity: pressed ? 0.85 : 1 }]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={pillStyle}>{content}</View>;
}
