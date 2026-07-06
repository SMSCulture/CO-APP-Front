import { Text, type ColorValue } from 'react-native';

const ICONS: Record<string, string> = {
  home: '⌂',
  search: '⌕',
  tickets: '⧉',
  profile: '◯',
};

interface TabBarIconProps {
  name: keyof typeof ICONS;
  color: ColorValue;
  focused: boolean;
}

/**
 * Simple glyph tab icons for the foundation. Swap for the CultureOwl icon set
 * (SVG or expo-symbols) once brand assets are exported.
 */
export function TabBarIcon({ name, color, focused }: TabBarIconProps) {
  return (
    <Text style={{ fontSize: focused ? 22 : 20, color, lineHeight: 26 }}>{ICONS[name] ?? '•'}</Text>
  );
}
