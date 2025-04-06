import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  token: string | null;
  id: string | null;
  nickname: string | null;
  provider: string | null;
  setUser: (user: {
    token: string;
    id: string;
    nickname: string;
    provider: string;
  }) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      id: null,
      nickname: null,
      provider: null,
      setUser: (user) => set({ ...user }),
      resetUser: () =>
        set({ token: null, id: null, nickname: null, provider: null }),
    }),
    {
      name: "user-storage",
    }
  )
);
