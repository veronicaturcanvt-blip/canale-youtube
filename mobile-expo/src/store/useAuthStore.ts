import { create } from 'zustand';
import { UserProfile } from '@/types';

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loginWithCredentials: (email: string, password: string) => Promise<void>;
  loginWithPin: (pin: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loginWithCredentials: async (_email, _password) => {
    // TODO: call POST /auth/login on the backend
    set({ isAuthenticated: true });
  },
  loginWithPin: async (_pin) => {
    // TODO: call POST /auth/login-pin on the backend
    set({ isAuthenticated: true });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
