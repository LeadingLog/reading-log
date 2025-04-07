import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null; // Unix timestamp
  user_id: string | null;
  nickname: string | null;
  provider: string | null;

  setUser: (user: {
    token: string;
    refreshToken: string;
    expiresAt: number;
    user_id: string;
    nickname: string;
    provider: string;
  }) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      expiresAt: 0,
      user_id: null,
      nickname: null,
      provider: null,
      setUser: (user) => set({ ...user }),
      resetUser: () =>
        set({ token: null, user_id: null, nickname: null, provider: null }),
    }),
    {
      name: "user-storage",
    }
  )
);
