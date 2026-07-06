import { create } from 'zustand';

import { requestOtp, verifyOtp } from '../api/modules/auth.api';
import { fetchMe } from '../api/modules/profile.api';
import { clearToken, getToken, setToken } from './tokenStorage';
import type { SessionStatus } from './session.types';
import type { User } from '../types/user';

interface AuthState {
  status: SessionStatus;
  user: User | null;
  pendingEmail: string | null;
  requestCode: (email: string) => Promise<{ userCreated: boolean }>;
  verifyCode: (code: string) => Promise<void>;
  restoreSession: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  status: 'loading',
  user: null,
  pendingEmail: null,

  requestCode: async (email) => {
    const result = await requestOtp(email);
    set({ pendingEmail: email });
    return { userCreated: result.userCreated };
  },

  verifyCode: async (code) => {
    const email = get().pendingEmail;
    if (!email) throw new Error('No pending email — request a code first.');
    const result = await verifyOtp(email, code);
    await setToken(result.accessToken);
    set({ status: 'authenticated', user: result.user, pendingEmail: null });
  },

  restoreSession: async () => {
    const token = await getToken();
    if (!token) {
      set({ status: 'unauthenticated', user: null });
      return;
    }
    try {
      const user = await fetchMe();
      set({ status: 'authenticated', user });
    } catch {
      await clearToken();
      set({ status: 'unauthenticated', user: null });
    }
  },

  signOut: async () => {
    await clearToken();
    set({ status: 'unauthenticated', user: null, pendingEmail: null });
  },
}));
