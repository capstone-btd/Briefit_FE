import { create } from "zustand";

type NavigationState = {
  currentPath: string;
  setCurrentPath: (path: string) => void;
};

export const useNavigationStore = create<NavigationState>((set) => ({
  currentPath: "/today-news",
  setCurrentPath: (path) => set({ currentPath: path }),
}));
