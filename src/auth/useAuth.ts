import { useAuthStore } from './auth.store';

export function useAuth() {
  const status = useAuthStore((s) => s.status);
  const user = useAuthStore((s) => s.user);
  const requestCode = useAuthStore((s) => s.requestCode);
  const verifyCode = useAuthStore((s) => s.verifyCode);
  const signOut = useAuthStore((s) => s.signOut);

  return {
    status,
    user,
    isAuthenticated: status === 'authenticated',
    requestCode,
    verifyCode,
    signOut,
  };
}
