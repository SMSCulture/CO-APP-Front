import { useThemeContext, useThemeModeStore } from './ThemeProvider';

/** Resolved theme (colors + scheme) for the current appearance mode. */
export function useAppTheme() {
  return useThemeContext();
}

/** Manual light/dark/system control, persisted across launches. */
export function useThemeMode() {
  const mode = useThemeModeStore((s) => s.mode);
  const setMode = useThemeModeStore((s) => s.setMode);
  return { mode, setMode };
}
