import { create } from 'zustand';

export interface Highlight {
  id: string; // 고유 ID
  startPoint: number; // 하이라이트 시작 전역 인덱스 (0부터 시작)
  endPoint: number;   // 하이라이트 끝 전역 인덱스
  highlightsColor: string; // 형광펜 색상
  highlightsFontColor: string;
  highlightsFontSize: number;
  isBold: boolean;
}

interface CustomBarState {
  globalBgColor: string | null; // 전체 배경 테마 색상
  globalDividerColor: string | null; // 구분선 색상

  isCustomBarVisible: boolean;
  activeHighlightColor: string | null; // 현재 선택된 형광펜 색상
  activeThemeColor: string | "white-theme"; // 현재 선택된 테마 색상
  themeTextColor1: string | null; // 주요 텍스트 색상
  themeTextColor2: string | null; // 보조 텍스트 색상
  themeBorderColor: string | null; // 테두리 색상
  themeCardColor: string | null; // 카드 배경 색상
  highlights: Highlight[]; // 적용된 하이라이트 목록
  showHighlightPalette: boolean; // 형광펜 팔레트 표시 여부
  showThemePalette: boolean; // 테마 팔레트 표시 여부
  activeIcon:
    | "highlighter"
    | "eraser"
    | "theme"
    | "undo"
    | "redo"
    | "done"
    | null; // 현재 활성화된 아이콘
  currentPageId: number | null; // 현재 페이지 ID

  // 액션
  setGlobalBgColor: (color: string | null) => void;
  setGlobalDividerColor: (color: string | null) => void;

  toggleCustomBar: () => void;
  setCustomBarVisible: (visible: boolean) => void;
  setHighlightColor: (color: string | null) => void;
  setThemeColor: (color: string | null) => void;
  setThemeTextColor1: (color: string | null) => void;
  setThemeTextColor2: (color: string | null) => void;
  setThemeBorderColor: (color: string | null) => void;
  setThemeCardColor: (color: string | null) => void;
  addHighlight: (
    startPoint: number,
    endPoint: number,
    highlightsColor: string,
  ) => void;
  removeHighlight: (startPoint: number, endPoint: number) => void;
  clearHighlights: () => void;
  toggleHighlightPalette: () => void;
  toggleThemePalette: () => void;
  setHighlightPaletteVisible: (visible: boolean) => void;
  setThemePaletteVisible: (visible: boolean) => void;
  setActiveIcon: (
    iconType:
      | "highlighter"
      | "eraser"
      | "theme"
      | "undo"
      | "redo"
      | "done"
      | null,
  ) => void;
  setCurrentPageId: (pageId: number | null) => void;
  resetPageState: () => void; // 페이지별 상태 초기화
  getCustomRequestInfo: () => {
    backgroundColor: string;
    highlightsInfos: Omit<Highlight, "id">[];
  }; // 백엔드 요청용 데이터 생성
}

export const useNewsCustomStore = create<CustomBarState>((set, get) => ({
  globalBgColor: null,
  globalDividerColor: null,

  isCustomBarVisible: false,
  activeHighlightColor: null,
  activeThemeColor: "",
  themeTextColor1: null,
  themeTextColor2: null,
  themeBorderColor: null,
  themeCardColor: null,
  highlights: [],
  showHighlightPalette: false,
  showThemePalette: false,
  activeIcon: null,
  currentPageId: null,

  setGlobalBgColor: (color) => set({ globalBgColor: color }),
  setGlobalDividerColor: (color) => set({ globalDividerColor: color }),

  toggleCustomBar: () =>
    set((state) => ({ isCustomBarVisible: !state.isCustomBarVisible })),
  setCustomBarVisible: (visible) => set({ isCustomBarVisible: visible }),
  setHighlightColor: (color) => set({ activeHighlightColor: color }),
  setThemeColor: (color) => set({ activeThemeColor: color || "white-theme" }),
  setThemeTextColor1: (color) => set({ themeTextColor1: color }),
  setThemeTextColor2: (color) => set({ themeTextColor2: color }),
  setThemeBorderColor: (color) => set({ themeBorderColor: color }),
  setThemeCardColor: (color) => set({ themeCardColor: color }),
  setHighlightPaletteVisible: (visible) =>
    set({ showHighlightPalette: visible }),
  setThemePaletteVisible: (visible) => set({ showThemePalette: visible }),
  setActiveIcon: (iconType) => set({ activeIcon: iconType }),
  setCurrentPageId: (pageId) => set({ currentPageId: pageId }),

  // 인덱스 받아서 하이라이트 객체 생성
  addHighlight: (startPoint, endPoint, highlightsColor) => {
    const newHighlight: Highlight = {
      id: Date.now().toString(), // 임시 ID (실제로는 더 견고한 ID 생성 필요)
      startPoint,
      endPoint,
      highlightsColor,
      highlightsFontColor: "black", // 디폴트 값
      highlightsFontSize: 12, // 디폴트 값
      isBold: false, // 디폴트 값
    };

    set((state) => ({
      highlights: [...state.highlights, newHighlight],
    }));
  },

  // 특정 범위의 하이라이트 제거
  removeHighlight: (startPoint, endPoint) => {
    set((state) => ({
      highlights: state.highlights.filter(
        (highlight) =>
          !(
            startPoint <= highlight.endPoint && endPoint >= highlight.startPoint
          ) &&
          !(
            highlight.startPoint <= endPoint && highlight.endPoint >= startPoint
          ),
      ),
    }));
  },

  clearHighlights: () => set({ highlights: [] }),
  toggleHighlightPalette: () =>
    set((state) => ({ showHighlightPalette: !state.showHighlightPalette })),
  toggleThemePalette: () =>
    set((state) => ({ showThemePalette: !state.showThemePalette })),

  // 백엔드 API 요청용 데이터 생성
  getCustomRequestInfo: () => {
    const state = get();
    const backgroundColor = state.globalBgColor || "white-theme";
    const highlightsInfos = state.highlights.map(
      ({
        startPoint,
        endPoint,
        highlightsColor,
        highlightsFontColor,
        highlightsFontSize,
        isBold,
      }) => ({
        startPoint,
        endPoint,
        highlightsColor,
        highlightsFontColor,
        highlightsFontSize,
        isBold,
      }),
    );

    return {
      backgroundColor,
      highlightsInfos,
    };
  },

  // resetPageState: () => set(() => {
  //   return {
  //     activeHighlightColor: null,
  //     activeThemeColor: "white-theme",
  //     globalThemeColor: null,
  //     themeTextColor1: null,
  //     themeTextColor2: null,
  //     themeDividerColor: null,
  //     themeBorderColor: null,
  //     themeCardColor: null,
  //     highlights: [],
  //     isCustomBarVisible: false,
  //     showHighlightPalette: false,
  //     showThemePalette: false,
  //     activeIcon: null,
  //     currentPageId: null,
  //   };
  // }),
  resetPageState: () =>
    set(() => ({
      activeHighlightColor: null,
      activeThemeColor: "white-theme",
      globalThemeColor: null,
      themeTextColor1: null,
      themeTextColor2: null,
      themeDividerColor: null,
      themeBorderColor: null,
      themeCardColor: null,
      highlights: [],
      isCustomBarVisible: false,
      showHighlightPalette: false,
      showThemePalette: false,
      activeIcon: null,
      currentPageId: null,
    })),
}));

// 페이지별 상태 관리를 위한 커스텀 훅
// export const usePageSpecificNewsCustom = (pageId: number) => {
//   const {
//     currentPageId,
//     setCurrentPageId,
//     resetPageState,
//     ...state
//   } = useNewsCustomStore();

//   useEffect(() => {
//     // 페이지가 변경되면 상태 초기화
//     if (currentPageId !== pageId) {
//       resetPageState();
//       setCurrentPageId(pageId);
//     }

//     // 컴포넌트 언마운트 시 상태 초기화
//     return () => {
//       if (currentPageId === pageId) {
//         resetPageState();
//       }
//     };
//   }, [pageId, resetPageState]);

//   return state;
// };