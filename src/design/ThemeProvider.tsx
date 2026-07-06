import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { create } from 'zustand';

import type { AppTheme, ThemeMode } from '../types/theme';
import { themes } from './theme';

const THEME_MODE_STORAGE_KEY = 'cultureowl.themeMode';

interface ThemeModeState {
  mode: ThemeMode;
  hydrated: boolean;
  setMode: (mode: ThemeMode) => void;
  hydrate: () => Promise<void>;
}

export const useThemeModeStore = create<ThemeModeState>((set) => ({
  mode: 'system',
  hydrated: false,
  setMode: (mode) => {
    set({ mode });
    AsyncStorage.setItem(THEME_MODE_STORAGE_KEY, mode).catch(() => {});
  },
  hydrate: async () => {
    try {
      const stored = await AsyncStorage.getItem(THEME_MODE_STORAGE_KEY);
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        set({ mode: stored, hydrated: true });
        return;
      }
    } catch {
      // fall through to defaults
    }
    set({ hydrated: true });
  },
}));

const ThemeContext = createContext<AppTheme>(themes.light);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const mode = useThemeModeStore((s) => s.mode);
  const hydrate = useThemeModeStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const resolved = mode === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : mode;

  return <ThemeContext.Provider value={themes[resolved]}>{children}</ThemeContext.Provider>;
}

export function useThemeContext(): AppTheme {
  return useContext(ThemeContext);
}
