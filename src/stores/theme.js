import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set) => ({
      theme: {},
      company: {},
      setCompany: (company) => set({ company }),

      setTheme: (theme) => set({ theme }),

      updateTheme: (newTheme) =>
        set((state) => ({
          theme: { ...state.theme, ...newTheme },
        })),
    }),
    {
      name: "app-theme",
      getStorage: () => localStorage,
    }
  )
);
