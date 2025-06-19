import { useState, useCallback } from "react";

export interface Highlight {
  id: string;
  startPoint: number;
  endPoint: number;
  highlightsColor: string;
  highlightsFontColor: string;
  highlightsFontSize: number;
  isBold: boolean;
}

export function useCustomBar() {
  const [isCustomBarVisible, setIsCustomBarVisible] = useState(false);
  const [activeThemeColor, setActiveThemeColor] = useState<string>("white-theme");
  const [themeBgColor, setThemeBgColor] = useState<string>(null);
  const [themeTextColor1, setThemeTextColor1] = useState<string>(null);
  const [themeTextColor2, setThemeTextColor2] = useState<string>(null);
  const [themeBorderColor, setThemeBorderColor] = useState<string>(null);
  const [themeDividerColor, setThemeDividerColor] = useState<string>(null);
  const [themeCardColor, setThemeCardColor] = useState<string>(null);

  const [activeHighlightColor, setActiveHighlightColor] = useState<string>("yellow-highlight");
  const [showHighlightPalette, setShowHighlightPalette] = useState(false);
  const [showThemePalette, setShowThemePalette] = useState(false);
  const [activeIcon, setActiveIcon] = useState<"highlighter" | "eraser" | "theme" | "undo" | "redo" | "done" | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  const [newScrapId, setNewScrapId] = useState<number>(null);

  // 커스텀바가 열릴 때 팔레트 상태를 초기화하는 함수
  const resetPalettes = useCallback(() => {
    setShowHighlightPalette(false);
    setShowThemePalette(false);
    setActiveIcon(null);
  }, []);

  // 하이라이트 추가/제거 함수
  const addHighlight = useCallback((start: number, end: number, color: string) => {
    const newHighlight: Highlight = {
      id: Date.now().toString(),
      startPoint: start,
      endPoint: end,
      highlightsColor: color,
      highlightsFontColor: "black",
      highlightsFontSize: 12,
      isBold: false,
    };
    setHighlights((prev) => [...prev, newHighlight]);
  }, []);

  const removeHighlight = useCallback((start: number, end: number) => {
    setHighlights((prev) =>
      prev.filter(
        (highlight) =>
          !(start <= highlight.endPoint && end >= highlight.startPoint) &&
          !(highlight.startPoint <= end && highlight.endPoint >= start)
      )
    );
  }, []);

  return {
    newScrapId,
    setNewScrapId,
    isCustomBarVisible,
    setIsCustomBarVisible,
    activeThemeColor,
    themeBgColor,
    themeTextColor1,
    themeTextColor2,
    themeBorderColor,
    themeDividerColor,
    themeCardColor,
    setThemeBgColor,
    setThemeTextColor1,
    setThemeTextColor2,
    setThemeBorderColor,
    setThemeDividerColor,
    setThemeCardColor,
    setActiveThemeColor,
    activeHighlightColor,
    setActiveHighlightColor,
    showHighlightPalette,
    setShowHighlightPalette,
    showThemePalette,
    setShowThemePalette,
    activeIcon,
    setActiveIcon,
    highlights,
    setHighlights,
    addHighlight,
    removeHighlight,
    resetPalettes, // 커스텀바 열릴 때 호출 필요
  };
}