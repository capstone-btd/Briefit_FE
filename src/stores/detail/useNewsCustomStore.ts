import { create } from 'zustand';

export interface Highlight {
  id: string; // 고유 ID
  startIndex: number; // 하이라이트 시작 전역 인덱스 (0부터 시작)
  endIndex: number;   // 하이라이트 끝 전역 인덱스
  color: string; // 형광펜 색상 (Tailwind 클래스명)
}

interface CustomBarState {
  isCustomBarVisible: boolean;
  activeHighlightColor: string | null; // 현재 선택된 형광펜 색상
  activeThemeColor: string | null;     // 현재 선택된 배경 테마 색상
  globalThemeColor: string | null;     // 전체 배경 테마 색상
  highlights: Highlight[]; // 적용된 하이라이트 목록
  showHighlightPalette: boolean; // 형광펜 팔레트 표시 여부
  showThemePalette: boolean;     // 테마 팔레트 표시 여부
  activeIcon: "highlighter" | "eraser" | "theme" | "undo" | "redo" | "done" | null; // 현재 활성화된 아이콘

  // 액션
  toggleCustomBar: () => void;
  setHighlightColor: (color: string) => void;
  setThemeColor: (color: string) => void;
  setGlobalThemeColor: (color: string | null) => void;
  addHighlight: (startIndex: number, endIndex: number, color: string) => void;
  clearHighlights: () => void;
  toggleHighlightPalette: () => void;
  toggleThemePalette: () => void;
  setActiveIcon: (iconType: "highlighter" | "eraser" | "theme" | "undo" | "redo" | "done" | null) => void;
}

export const useNewsCustomStore = create<CustomBarState>((set) => ({
  isCustomBarVisible: false,
  activeHighlightColor: null,
  activeThemeColor: null,
  globalThemeColor: null,
  highlights: [],
  showHighlightPalette: false,
  showThemePalette: false,
  activeIcon: null,

  toggleCustomBar: () => set((state) => ({ isCustomBarVisible: !state.isCustomBarVisible })),
  setHighlightColor: (color) => set({ activeHighlightColor: color }),
  setThemeColor: (color) => set({ activeThemeColor: color }),
  setGlobalThemeColor: (color) => set({ globalThemeColor: color }),

  // 인덱스 받아서 하이라이트 객체 생성
  addHighlight: (startIndex, endIndex, color) => {
    const newHighlight: Highlight = {
      id: Date.now().toString(), // 임시 ID (실제로는 더 견고한 ID 생성 필요)
      startIndex,
      endIndex,
      color,
    };

    set((state) => ({
      highlights: [...state.highlights, newHighlight],
    }));
  },
  clearHighlights: () => set({ highlights: [] }),
  toggleHighlightPalette: () => set((state) => ({ showHighlightPalette: !state.showHighlightPalette })),
  toggleThemePalette: () => set((state) => ({ showThemePalette: !state.showThemePalette })),
  setActiveIcon: (iconType) => set({ activeIcon: iconType }),
}));