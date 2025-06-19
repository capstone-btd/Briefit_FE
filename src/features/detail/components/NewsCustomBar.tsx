"use client";

import Image from "next/image";
import { usePageSpecificNewsCustom } from "@/stores/detail/useNewsCustomStore";
import { Check, Eraser, Palette } from "lucide-react";
import HighlightIcon from "@/features/common/HighlightIcon";
import Divider from "@/features/common/Divider";
import postNewsDetailCustom from "@/features/detail/api/newsDetailCustom";

interface NewsCustomBarProps {
  pageId: number;
}

export default function NewsCustomBar({ pageId }: NewsCustomBarProps) {
  const {
    setHighlightColor,
    setThemeColor,
    setGlobalThemeColor,
    setThemeTextColor1,
    setThemeTextColor2,
    setThemeDividerColor,
    setThemeBorderColor,
    setThemeCardColor,
    isCustomBarVisible,
    activeThemeColor,
    activeHighlightColor,
    showHighlightPalette,
    showThemePalette,
    activeIcon,
    toggleHighlightPalette,
    toggleThemePalette,
    setActiveIcon,
    getCustomRequestInfo,
  } = usePageSpecificNewsCustom(pageId);

  const highlightColors = [
    { variable: "yellow-highlight", bg: "bg-yellow-highlight" },
    { variable: "green-highlight", bg: "bg-green-highlight" },
    { variable: "pink-highlight", bg: "bg-pink-highlight" },
    { variable: "blue-highlight", bg: "bg-blue-highlight" },
    { variable: "orange-highlight", bg: "bg-orange-highlight" },
    { variable: "purple-highlight", bg: "bg-purple-highlight" },
  ];

  const themeColors = [
    { variable: "white-theme", bg: "bg-white" },
    { variable: "pink-theme", bg: "bg-pink-theme" },
    { variable: "blue-theme", bg: "bg-blue-theme" },
    { variable: "beige-theme", bg: "bg-beige-theme" },
    { variable: "purple-theme", bg: "bg-purple-theme" },
    { variable: "green-theme", bg: "bg-green-theme" },
  ];

  const handleIconClick = (
    iconType: "highlighter" | "eraser" | "theme" | "undo" | "redo" | "done",
  ) => {
    setActiveIcon(iconType);
    if (iconType === "highlighter") {
      toggleHighlightPalette();
      if (!activeHighlightColor) {
        setHighlightColor("yellow-highlight");
      }
      if (showThemePalette) {
        toggleThemePalette();
      }
    } else if (iconType === "theme") {
      toggleThemePalette();
      if (!activeThemeColor) {
        setThemeColor("white-theme");
      }
      if (showHighlightPalette) {
        toggleHighlightPalette();
      }
    } else {
      if (showHighlightPalette) {
        toggleHighlightPalette();
      }
      if (showThemePalette) {
        toggleThemePalette();
      }
    }
  };

  const handleThemeColorSelect = (color: string) => {
    setThemeColor(`${color}`);

    if (color === "white-theme") {
      setGlobalThemeColor(null);
      setThemeTextColor1(null);
      setThemeTextColor2(null);
      setThemeBorderColor(null);
      setThemeCardColor(null);
    } else {
      setGlobalThemeColor(`bg-${color}`);
      setThemeTextColor1(`text-${color}-text1`);
      setThemeTextColor2(`text-${color}-text2`);
      setThemeBorderColor(`border-${color}-dark`);
      setThemeDividerColor(`bg-${color}-dark`);
      setThemeCardColor(`bg-${color}-light`);
    }
  };

  const handleSaveCustom = async () => {
    try {
      const customRequestInfo = getCustomRequestInfo();
      const result = await postNewsDetailCustom(pageId, customRequestInfo);
      if (result) {
        alert("커스텀 정보가 성공적으로 저장되었습니다.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed top-500 left-100 z-40 flex -translate-y-1/2 flex-col items-center gap-6">
      {/* 커스텀바 */}
      {isCustomBarVisible && (
        <div className="flex flex-col items-center gap-20 rounded-lg border bg-white px-10 pt-18 pb-10 shadow-sm">
          {/* highlighter */}
          <div className="relative">
            <HighlightIcon
              tipColor={activeHighlightColor}
              activeIcon={activeIcon}
              onClick={() => handleIconClick("highlighter")}
            />
            {showHighlightPalette && (
              <div className="absolute top-[-30px] left-50 w-100 rounded-lg border bg-white px-10 py-15 shadow-sm">
                <div className="grid grid-cols-2 justify-items-center gap-x-7 gap-y-15">
                  {highlightColors.map((color) => (
                    <div
                      key={color.variable}
                      className={`h-27 w-27 cursor-pointer rounded-full transition ${color.bg} ${
                        activeHighlightColor === color.variable
                          ? "ring-2 ring-purple-500"
                          : ""
                      }`}
                      onClick={() => setHighlightColor(color.variable)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* eraser */}
          <Eraser
            strokeWidth={2}
            size={30}
            className={`cursor-pointer rounded-md p-3 text-gray-400 hover:bg-purple-100 hover:text-purple-500 ${activeIcon === "eraser" ? "text-purple-500" : "text-gray-400"}`}
            onClick={() => handleIconClick("eraser")}
          />

          {/* theme */}
          <div className="relative">
            <Palette
              strokeWidth={2}
              size={30}
              className={`cursor-pointer rounded-md p-3 hover:bg-purple-100 hover:text-purple-500 ${activeIcon === "theme" ? "text-purple-500" : "text-gray-400"}`}
              onClick={() => handleIconClick("theme")}
            />
            {showThemePalette && (
              <div className="absolute top-[-30px] left-50 w-100 rounded-lg border bg-white px-10 py-15 shadow-sm">
                <div className="grid grid-cols-2 justify-items-center gap-x-7 gap-y-15">
                  {themeColors.map((color) => (
                    <div
                      key={color.variable}
                      className={`h-27 w-27 cursor-pointer rounded-full transition ${color.bg} border ${
                        activeThemeColor === color.variable
                          ? "ring-2 ring-purple-500"
                          : ""
                      }`}
                      onClick={() => handleThemeColorSelect(color.variable)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <Divider className="bg-gray-200" />

          {/* undo & redo */}
          <Image
            src="/assets/custom/undo.png"
            alt="undo"
            width={25}
            height={25}
            onClick={() => handleIconClick("undo")}
            className="cursor-pointer p-3"
          />
          <Image
            src="/assets/custom/redo.png"
            alt="redo"
            width={25}
            height={25}
            onClick={() => handleIconClick("redo")}
            className="cursor-pointer p-3"
          />

          <Check
            strokeWidth={5}
            size={32}
            className="mt-2 cursor-pointer rounded-md bg-purple-500 p-7 text-white transition hover:bg-purple-800"
            onClick={handleSaveCustom}
          />
        </div>
      )}
    </div>
  );
}
