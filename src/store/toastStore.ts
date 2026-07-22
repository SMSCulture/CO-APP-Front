/**
 * Toast store — mirrors components/ui/favorites-toast.tsx on web (via sonner
 * there); mobile has no toast library, so this is a minimal from-scratch
 * equivalent: a single active toast, auto-dismissed on a timer, following
 * the same plain-Zustand-store pattern already used for favorites/location
 * (not persisted — a toast is ephemeral UI state, not data worth restoring).
 */
import { create } from 'zustand';

export interface ToastAction {
  label: string;
  onPress: () => void;
}

export interface ToastState {
  id: number;
  message: string;
  imageUrl?: string | null;
  action?: ToastAction;
  variant: 'success' | 'error';
}

interface ToastStore {
  toast: ToastState | null;
  show: (toast: Omit<ToastState, 'id'>, durationMs: number) => void;
  dismiss: () => void;
}

let nextId = 0;
let dismissTimer: ReturnType<typeof setTimeout> | null = null;

export const useToastStore = create<ToastStore>((set) => ({
  toast: null,
  show: (toast, durationMs) => {
    if (dismissTimer) clearTimeout(dismissTimer);
    const id = ++nextId;
    set({ toast: { ...toast, id } });
    dismissTimer = setTimeout(() => {
      set((state) => (state.toast?.id === id ? { toast: null } : state));
    }, durationMs);
  },
  dismiss: () => {
    if (dismissTimer) clearTimeout(dismissTimer);
    set({ toast: null });
  },
}));
