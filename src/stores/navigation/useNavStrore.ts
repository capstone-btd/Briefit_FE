import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface NavState {
  selectedPath: string;
  setSelectedPath: (path: string) => void;
}

export const useNavStore = create<NavState>()(
  persist(
    (set) => ({
      selectedPath: "/today-news",
      setSelectedPath: (path) => set({ selectedPath: path }),
    }),
    {
      name: "selected-nav-path",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
