import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState } from "../../types/auth/authState";

// 전역으로 관리할 유저 상태 Store 생성 및 저장

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // StateCreator 콜백
      isLoggedIn: false,
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      login: (user, token) => set({ user, token, isLoggedIn: true }),
      logout: () => set({ user: null, token: null, isLoggedIn: false }),
    }),
    {
      name: "auth-store", // localStorage key
      partialize: (state) => ({
        // partialize로 토큰을 제외하고 저장
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
