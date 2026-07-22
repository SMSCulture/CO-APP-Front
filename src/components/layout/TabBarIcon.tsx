import type { ColorValue } from 'react-native';

import { DiscoverTabIcon, HomeTabIcon, ProfileTabIcon, SearchTabIcon, TicketTabIcon } from './icons/TabIcons';

const ICONS = {
  home: HomeTabIcon,
  search: SearchTabIcon,
  discover: DiscoverTabIcon,
  tickets: TicketTabIcon,
  profile: ProfileTabIcon,
};

interface TabBarIconProps {
  name: keyof typeof ICONS;
  color: ColorValue;
  focused: boolean;
}

/**
 * Real SVG tab icons (react-native-svg) — replaces the earlier text/Unicode-
 * glyph placeholders. Fixed size regardless of focus state — active/inactive
 * is communicated by color alone (matches the reference), not by resizing,
 * which was causing the bar to clip/jump.
 */
export function TabBarIcon({ name, color }: TabBarIconProps) {
  const Icon = ICONS[name];
  return <Icon color={String(color)} size={24} />;
}
