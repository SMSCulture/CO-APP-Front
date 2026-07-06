import { useEffect, type ReactNode } from 'react';

import { useAuthStore } from './auth.store';

/** Restores the persisted session once on app launch. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const restoreSession = useAuthStore((s) => s.restoreSession);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return children;
}
