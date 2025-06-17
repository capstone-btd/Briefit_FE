"use client";

import { useNewsCustomStore } from "@/stores/detail/useNewsCustomStore";
import { Check, Eraser, Palette, Redo, Undo } from "lucide-react";
import HighlightIcon from "@/features/common/HighlightIcon";

export default function NewsCustomBar() {
  const {
    setHighlightColor,
    setThemeColor,
    setGlobalThemeColor,
    isCustomBarVisible,
    activeThemeColor,
    activeHighlightColor,
    showHighlightPalette,
    showThemePalette,
    activeIcon,
    toggleHighlightPalette,
    toggleThemePalette,
    setActiveIcon,
  } = useNewsCustomStore();

  const highlightColors = [
    { name: "Yellow", variable: "yellow-highlight", bg: "bg-yellow-highlight" },
    { name: "Green", variable: "green-highlight", bg: "bg-green-highlight" },
    { name: "Pink", variable: "pink-highlight", bg: "bg-pink-highlight" },
    { name: "Blue", variable: "blue-highlight", bg: "bg-blue-highlight" },
    { name: "Orange", variable: "orange-highlight", bg: "bg-orange-highlight" },
    { name: "Purple", variable: "purple-highlight", bg: "bg-purple-highlight" },
  ];

  const themeColors = [
    { name: "White Theme", variable: "bg-white" },
    { name: "Pink Theme", variable: "bg-pink-theme" },
    { name: "Blue Theme", variable: "bg-blue-theme" },
    { name: "Beige Theme", variable: "bg-beige-theme" },
    { name: "Purple Theme", variable: "bg-purple-theme" },
    { name: "Green Theme", variable: "bg-green-theme" },
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
    setThemeColor(color);
    setGlobalThemeColor(color);
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
                      key={color.name}
                      className={`h-27 w-27 cursor-pointer rounded-full transition ${color.bg} ${
                        activeThemeColor === color.variable
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
            strokeWidth={1.7}
            size={30}
            className="rounded-md p-3 text-gray-400 hover:bg-purple-100 hover:text-purple-500"
          />

          {/* theme */}
          <div className="relative">
            <Palette
              strokeWidth={1.7}
              size={30}
              className={`cursor-pointer rounded-md p-3 hover:bg-purple-100 hover:text-purple-500 ${activeIcon === "theme" ? "text-purple-500" : "text-gray-400"}`}
              onClick={() => handleIconClick("theme")}
            />
            {showThemePalette && (
              <div className="absolute top-[-30px] left-50 w-100 rounded-lg border bg-white px-10 py-15 shadow-sm">
                <div className="grid grid-cols-2 justify-items-center gap-x-7 gap-y-15">
                  {themeColors.map((color) => (
                    <div
                      key={color.name}
                      className={`h-27 w-27 cursor-pointer rounded-full transition ${color.variable} border ${
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

          {/* undo & redo */}
          <Undo
            strokeWidth={1.7}
            size={30}
            color="gray"
            className="cursor-pointer"
            onClick={() => handleIconClick("undo")}
          />
          <Redo
            strokeWidth={1.7}
            size={30}
            color="gray"
            className="cursor-pointer"
            onClick={() => handleIconClick("redo")}
          />

          <Check
            strokeWidth={5}
            size={32}
            className="mt-2 rounded-md bg-purple-500 p-7 text-white transition hover:bg-purple-800"
          />
        </div>
      )}
    </div>
  );
}
