import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserDto } from '../api/auth/types';

type State = {
  session: {
    user: UserDto | undefined;
    isAuthenticated: boolean;
  };
};

type Action = {
  signIn: (user: State['session']['user']) => void;
  signOut: () => void;
};

const useSessionStore = create<State & Action>()(
  persist(
    (set, get) => ({
      session: {
        user: undefined,
        isAuthenticated: false,
      },
      signIn: (user) => set({ session: { user, isAuthenticated: true } }),
      signOut: () => set({ session: { user: undefined, isAuthenticated: false } }),
    }),
    { name: 'session' },
  ),
);

export default useSessionStore;
