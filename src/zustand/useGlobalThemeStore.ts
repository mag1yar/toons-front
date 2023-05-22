import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeType = 'light' | 'dark' | 'system';

type State = {
  globalTheme: ThemeType;
};

type Action = {
  setGlobalTheme: (globalTheme: State['globalTheme']) => void;
};

const useGlobalThemeStore = create<State & Action>()(
  persist(
    (set, get) => ({
      globalTheme: 'system',
      setGlobalTheme: (globalTheme) => set({ globalTheme: globalTheme || get().globalTheme }),
    }),
    { name: 'globalTheme' },
  ),
);

export default useGlobalThemeStore;
