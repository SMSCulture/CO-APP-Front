/**
 * Global selected-city store — mirrors store/home-location-store.ts on web.
 *
 * Deliberate divergence from web: web intentionally does NOT persist
 * selectedCity (resets on page refresh). On mobile there's no equivalent
 * "refresh" — persisting across app opens is the expected UX for a native
 * app, so this uses AsyncStorage via zustand's persist middleware.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { CityData } from '../types/location';

interface LocationState {
  selectedCity: CityData | null;
  setSelectedCity: (city: CityData | null) => void;
  clearSelectedCity: () => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      selectedCity: null,
      setSelectedCity: (city) => set({ selectedCity: city }),
      clearSelectedCity: () => set({ selectedCity: null }),
    }),
    {
      name: 'co-selected-city',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
