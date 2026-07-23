/**
 * Favorites hooks — mirrors hooks/use-favorites.ts and hooks/use-favorites-sync.ts
 * on web, adapted to React Query + the mobile useAuth()/AsyncStorage-backed store.
 */
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

import { useAuth } from '../auth/useAuth';
import { fetchMyFavorites, toggleFavoriteRemote } from '../api/modules/favorites.api';
import { useFavoritesStore } from '../store/favoritesStore';
import { useToastStore } from '../store/toastStore';
import {
  transformFavoriteNode,
  toFavoriteItem,
  type FavoritableEntity,
  type FavoriteEntityType,
} from '../types/favorite';

export function useMyFavorites(entityType?: FavoriteEntityType) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ['favorites', 'mine', entityType] as const,
    queryFn: () => fetchMyFavorites(entityType ? { entityType } : undefined),
    enabled: isAuthenticated,
  });
}

/**
 * One hook, usable by any card/entity type — replaces web's per-type wrapper
 * hooks (useVenueFavorites, useArtsGroupFavorites, etc.), which existed there
 * to configure DirectoryCard props; mobile cards call this directly instead.
 */
export function useFavoriteToggle(entityType: FavoriteEntityType, entity: FavoritableEntity | undefined) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const showToast = useToastStore((s) => s.show);
  const favorited = entity ? isFavorite(entityType, entity.id) : false;

  const toggle = useCallback(async () => {
    // The whole app requires being signed in already, so there's no
    // meaningful "signed out" case to special-case here anymore.
    if (!entity) return;
    const item = toFavoriteItem(entityType, entity);
    const wasFavorited = isFavorite(entityType, entity.id);

    // 1. Optimistic local update + toast — mirrors web's handleToggleFavorite,
    // which fires the success toast immediately, before the mutation even starts.
    toggleFavorite(item);
    if (wasFavorited) {
      showToast({ message: 'Removed from favorites', imageUrl: item.imageUrl, variant: 'success' }, 5000);
    } else {
      showToast(
        {
          message: 'Added to favorites',
          imageUrl: item.imageUrl,
          variant: 'success',
          action: { label: 'Show faves', onPress: () => router.push('/favorites') },
        },
        5500,
      );
    }

    // 2. Backend sync, rollback + error toast on failure (overrides the success toast, same as web).
    try {
      await toggleFavoriteRemote(entity.id, entityType);
    } catch {
      toggleFavorite(item); // rollback: toggling twice restores original state
      showToast({ message: 'Failed to update favorite. Please try again.', variant: 'error' }, 5000);
    }
    return !wasFavorited;
  }, [entityType, entity, isFavorite, toggleFavorite, showToast]);

  return { isFavorite: favorited, toggle };
}

/** Syncs the local store from the backend once per authenticated identity — mirrors useFavoritesSync on web. */
export function useFavoritesSync() {
  const { isAuthenticated, user } = useAuth();
  const { setFromBackend, clearAll } = useFavoritesStore();
  const lastSyncedUserId = useRef<string | null>(null);

  useEffect(() => {
    const userId = user?.id ?? null;

    if (isAuthenticated && userId && lastSyncedUserId.current !== userId) {
      if (lastSyncedUserId.current !== null) clearAll();
      lastSyncedUserId.current = userId;

      fetchMyFavorites()
        .then((result) => setFromBackend(result.edges.map((edge) => transformFavoriteNode(edge.node))))
        .catch(() => {
          // keep local favorites on sync failure
        });
    }

    if (!isAuthenticated) {
      lastSyncedUserId.current = null;
      clearAll();
    }
  }, [isAuthenticated, user?.id, setFromBackend, clearAll]);
}
