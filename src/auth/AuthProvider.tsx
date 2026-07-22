import { useEffect, type ReactNode } from 'react';

import { useFavoritesSync } from '../queries/favorites.queries';
import { useAuthStore } from './auth.store';

/** Restores the persisted session once on app launch, and keeps favorites synced to the authenticated identity. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const restoreSession = useAuthStore((s) => s.restoreSession);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  useFavoritesSync();

  return children;
}
