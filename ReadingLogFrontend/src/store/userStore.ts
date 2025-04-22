import {create} from "zustand";
import {persist} from "zustand/middleware";

interface UserState {
  token: string | null;
  expiresAt: number | null;
  user_id: string | null;
  nickname: string | null;
  email: string | null;
  provider: string | null;

  setUser: (user: Partial<Omit<UserState, 'setUser' | 'resetUser'>>) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      expiresAt: 0,
      user_id: null,
      nickname: null,
      email: null,
      provider: null,

      setUser: (user) =>
        set((state) => ({
          ...state,
          ...user,
        })),

      resetUser: () =>
        set({
          token: null,
          expiresAt: 0,
          user_id: null,
          nickname: null,
          email: null,
          provider: null,
        }),
    }),
    {
      name: "user-storage",
    }
  )
);
