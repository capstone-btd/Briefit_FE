import { create } from "zustand";

interface CustomBarState {
  globalBgColor: string | null; // 전체 배경 테마 색상
  globalDividerColor: string | null; // 구분선 색상

  // 액션
  setGlobalBgColor: (color: string | null) => void;
  setGlobalDividerColor: (color: string | null) => void;
}

export const useNewsCustomStore = create<CustomBarState>((set) => ({
  globalBgColor: null,
  globalDividerColor: null,

  setGlobalBgColor: (color) => set({ globalBgColor: color }),
  setGlobalDividerColor: (color) => set({ globalDividerColor: color }),
}));
