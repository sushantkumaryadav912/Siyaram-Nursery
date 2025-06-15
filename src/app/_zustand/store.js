import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  total: 0,
  addToCart: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  removeFromCart: (id) =>
    set((state) => ({
      products: state.products.filter((item) => item.id !== id),
    })),
  calculateTotals: () =>
    set((state) => ({
      total: state.products.reduce((sum, item) => sum + item.price, 0),
    })),
  clearCart: () => set({ products: [], total: 0 }),
}));