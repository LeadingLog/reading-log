import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  userId: number | null;
  nickname: string | null;
  email: string | null;
  provider: string | null;

  setUser: (user: Partial<Omit<UserState, 'setUser' | 'resetUser'>>) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: 0,
      nickname: null,
      email: null,
      provider: null,

      setUser: (user) =>
        set( (state) => ({
          ...state,
          ...user,
        }) ),

      resetUser: () =>
        set( {
          userId: 0,
          nickname: null,
          email: null,
          provider: null,
        } ),
    }),
    {
      name: "user-storage",
    }
  )
);