import { create } from "zustand";

interface SignUpState {
  name: string;
  setName: (name: string) => void;

  // profileColor: string;
  // setProfileColor: (color: string) => void;

  categories: string[];
  setCategories: (categories: string[]) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;

  reset: () => void;
}

export const useSignUpStore = create<SignUpState>((set) => ({
  name: "",
  setName: (name) => set({ name }),

  // profileColor: "",
  // setProfileColor: (color) => set({ profileColor: color }),

  categories: [],
  setCategories: (categories) => set({ categories }),
  addCategory: (category) =>
    set((state) =>
      state.categories.includes(category)
        ? state
        : { categories: [...state.categories, category] }
    ),
  removeCategory: (category) =>
    set((state) => ({
      categories: state.categories.filter((c) => c !== category),
    })),

  reset: () =>
    set({
      name: "",
      // profileColor: "",
      categories: [],
    }),
}));