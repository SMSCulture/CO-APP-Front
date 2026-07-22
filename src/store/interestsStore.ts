/** Selected-interests (genre ids) — same AsyncStorage-persisted Zustand pattern as locationStore.ts/favoritesStore.ts. */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface InterestsState {
  selectedGenreIds: string[];
  toggle: (genreId: string) => void;
  setAll: (genreIds: string[]) => void;
}

export const useInterestsStore = create<InterestsState>()(
  persist(
    (set, get) => ({
      selectedGenreIds: [],
      toggle: (genreId) => {
        const current = get().selectedGenreIds;
        set({
          selectedGenreIds: current.includes(genreId)
            ? current.filter((id) => id !== genreId)
            : [...current, genreId],
        });
      },
      setAll: (genreIds) => set({ selectedGenreIds: genreIds }),
    }),
    { name: 'co-interests', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
