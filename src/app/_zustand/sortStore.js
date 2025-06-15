import { create } from "zustand";

export const useSortStore = create((set) => ({
  sort: "default",
  setSort: (sortValue) => set({ sort: sortValue }),
}));