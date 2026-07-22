/**
 * Favorites store — mirrors store/favorites-store.ts on web: a Map keyed by
 * `entityType:id`, persisted (AsyncStorage here instead of localStorage,
 * same pattern as src/store/locationStore.ts), with the same partialize/
 * onRehydrateStorage Map<->array workaround web uses (JSON can't serialize
 * a Map directly).
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { FavoriteEntityType, FavoriteItem } from '../types/favorite';

interface FavoritesState {
  favorites: Map<string, FavoriteItem>;
  lastSyncedAt: number | null;

  addFavorite: (item: Omit<FavoriteItem, 'addedAt'>) => void;
  removeFavorite: (entityType: FavoriteEntityType, id: string) => void;
  toggleFavorite: (item: Omit<FavoriteItem, 'addedAt'>) => boolean;
  isFavorite: (entityType: FavoriteEntityType, id: string) => boolean;
  getFavoritesByType: (entityType: FavoriteEntityType) => FavoriteItem[];
  getAllFavorites: () => FavoriteItem[];
  getFavoriteCount: () => number;
  setFromBackend: (favorites: FavoriteItem[]) => void;
  clearAll: () => void;
}

const getKey = (entityType: FavoriteEntityType, id: string) => `${entityType}:${id}`;

const safeGetMap = (favorites: Map<string, FavoriteItem> | [string, FavoriteItem][]): Map<string, FavoriteItem> => {
  if (favorites instanceof Map) return favorites;
  if (Array.isArray(favorites)) return new Map(favorites);
  return new Map();
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: new Map<string, FavoriteItem>(),
      lastSyncedAt: null,

      addFavorite: (item) => {
        const key = getKey(item.entityType, item.id);
        set((state) => {
          const newMap = new Map(safeGetMap(state.favorites));
          newMap.set(key, { ...item, addedAt: Date.now() });
          return { favorites: newMap };
        });
      },

      removeFavorite: (entityType, id) => {
        set((state) => {
          const newMap = new Map(safeGetMap(state.favorites));
          newMap.delete(getKey(entityType, id));
          return { favorites: newMap };
        });
      },

      toggleFavorite: (item) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        const wasFavorited = isFavorite(item.entityType, item.id);
        if (wasFavorited) {
          removeFavorite(item.entityType, item.id);
          return false;
        }
        addFavorite(item);
        return true;
      },

      isFavorite: (entityType, id) => safeGetMap(get().favorites).has(getKey(entityType, id)),

      getFavoritesByType: (entityType) =>
        Array.from(safeGetMap(get().favorites).values())
          .filter((item) => item.entityType === entityType)
          .sort((a, b) => b.addedAt - a.addedAt),

      getAllFavorites: () => Array.from(safeGetMap(get().favorites).values()).sort((a, b) => b.addedAt - a.addedAt),

      getFavoriteCount: () => safeGetMap(get().favorites).size,

      setFromBackend: (favorites) => {
        const newMap = new Map<string, FavoriteItem>();
        favorites.forEach((item) => newMap.set(getKey(item.entityType, item.id), item));
        set({ favorites: newMap, lastSyncedAt: Date.now() });
      },

      clearAll: () => set({ favorites: new Map(), lastSyncedAt: null }),
    }),
    {
      name: 'co-favorites',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        favorites: Array.from(state.favorites.entries()),
        lastSyncedAt: state.lastSyncedAt,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && !(state.favorites instanceof Map)) {
          state.favorites = new Map(state.favorites as unknown as [string, FavoriteItem][]);
        }
      },
    },
  ),
);
