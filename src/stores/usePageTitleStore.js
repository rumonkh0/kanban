import { create } from "zustand";

export const usePageTitleStore = create((set) => ({
  title: "Creative CRM",
  setTitle: (newTitle) => set({ title: newTitle }),
}));
