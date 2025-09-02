// store/useThemeStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
const themeStore=(set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setDarkMode: (value) => set({ darkMode: value }),
    })
const useThemeStore = create(
  persist(
    themeStore,
    {
      name: "theme",
    }
  )
);

export default useThemeStore;
