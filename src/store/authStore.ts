import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";
import { authService } from "@/services/auth.service";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  register: (user: User) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: (user) => set({ user, isAuthenticated: true, isLoading: false }),
      register: (user) => set({ user, isAuthenticated: true, isLoading: false }),
      setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
        } catch {
          // Fallback cleanup in case backend call fails or network is offline
          if (typeof window !== "undefined") {
            localStorage.removeItem("heer-auth-token");
            localStorage.removeItem("heer-refresh-token");
          }
        } finally {
          if (typeof window !== "undefined") {
            localStorage.removeItem("heer-auth-token");
            localStorage.removeItem("heer-refresh-token");
          }
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },
      refreshUser: async () => {
        if (typeof window === "undefined") return;
        const token = localStorage.getItem("heer-auth-token");
        if (!token) {
          set({ user: null, isAuthenticated: false, isLoading: false });
          return;
        }
        if (get().isLoading) return;
        set({ isLoading: true });
        try {
          const profile = await authService.getProfile();
          const currentUser = get().user;
          const isUnchanged =
            currentUser && JSON.stringify(currentUser) === JSON.stringify(profile);
          if (isUnchanged) {
            set({ isAuthenticated: true, isLoading: false });
          } else {
            set({ user: profile, isAuthenticated: true, isLoading: false });
          }
        } catch {
          // If profile fetch fails with 401 or invalid token
          if (!localStorage.getItem("heer-auth-token")) {
            set({ user: null, isAuthenticated: false, isLoading: false });
          } else {
            set({ isLoading: false });
          }
        }
      },
    }),
    {
      name: "heer-auth",
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);