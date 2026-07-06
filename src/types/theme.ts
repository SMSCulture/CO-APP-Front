export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceElevated: string;
  text: string;
  textMuted: string;
  textInverse: string;
  border: string;
  primary: string;
  primaryPressed: string;
  onPrimary: string;
  accent: string;
  danger: string;
  chipBackground: string;
  chipActiveBackground: string;
  chipActiveText: string;
  tabBarBackground: string;
  tabInactive: string;
  overlay: string;
  skeleton: string;
}

export interface AppTheme {
  scheme: 'light' | 'dark';
  colors: ThemeColors;
}
