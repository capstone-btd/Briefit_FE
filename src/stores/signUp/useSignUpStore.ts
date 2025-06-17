import { create } from "zustand";

interface SignUpState {
  name: string;
  setName: (name: string) => void;

  profileImageFile: File | null;
  setProfileImageFile: (file: File) => void;

  categories: string[];
  setCategories: (categories: string[]) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;

  reset: () => void;
}

export const useSignUpStore = create<SignUpState>((set) => ({
  name: "",
  setName: (name) => set({ name }),

  profileImageFile: null,
  setProfileImageFile: (file) => set({ profileImageFile: file }),

  categories: [],
  setCategories: (categories) => set({ categories }),
  addCategory: (category) =>
    set((state) =>
      state.categories.includes(category)
        ? state
        : { categories: [...state.categories, category] },
    ),
  removeCategory: (category) =>
    set((state) => ({
      categories: state.categories.filter((c) => c !== category),
    })),

  reset: () =>
    set({
      name: "",
      profileImageFile: null,
      categories: [],
    }),
}));