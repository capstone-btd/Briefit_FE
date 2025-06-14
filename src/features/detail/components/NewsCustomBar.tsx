"use client";

import { useNewsCustomStore } from "@/stores/detail/useNewsCustomStore";
import { Check, Eraser, Highlighter, Palette, Redo, Undo } from "lucide-react";


export default function NewsCustomBar() {
  const {
    setHighlightColor,
    setThemeColor,
    isCustomBarVisible,
    activeThemeColor,
    activeHighlightColor
  } = useNewsCustomStore();
  
  const highlightColors = [
    { name: "Yellow", variable: "yellow-highlight" },
    { name: "Green", variable: "green-highlight" },
    { name: "Pink", variable: "pink-highlight" },
    { name: "Blue", variable: "blue-highlight" },
    { name: "Orange", variable: "orange-highlight" },
    { name: "Purple", variable: "purple-highlight" },
  ];

  const themeColors = [
    { name: "Pink Theme", variable: "pink-theme-bg" },
    { name: "Blue Theme", variable: "blue-theme-bg" },
    { name: "Beige Theme", variable: "beige-theme-bg" },
    { name: "Purple Theme", variable: "purple-theme-bg" },
    { name: "Green Theme", variable: "green-theme-bg" },
  ];

  const handleHighlightColorSelect = (colorVariable: string) => {
    setHighlightColor(colorVariable);
  };

  const handleThemeColorSelect = (colorVariable: string) => {
    setThemeColor(colorVariable);
  };

  const handleIconClick = (iconType: 'highlighter' | 'eraser' | 'theme' | 'undo' | 'redo' | 'done') => {
    setActiveIcon(iconType);
    if (iconType === 'highlighter') {
      setShowHighlightPalette(prev => !prev);
      setShowThemePalette(false);
      if (!activeHighlightColor) {
        setHighlightColor("yellow-highlight");
      }
    } else if (iconType === 'theme') {
      setShowThemePalette(prev => !prev);
      setShowHighlightPalette(false);
    } else {
      setShowHighlightPalette(false);
      setShowThemePalette(false);
    }
  }

  return (
    <div className="fixed left-120 top-500 -translate-y-1/2 flex flex-col items-center gap-6 z-40">

      {/* 커스텀바 */}
      {isCustomBarVisible && (
       <div className="border bg-white px-10 pt-18 pb-10 rounded-lg shadow-sm flex flex-col items-center gap-20">
        {/* highlighter */}
        <div className="relative">
          <Highlighter strokeWidth={1.5} size={30} color={activeHighlightColor ? "purple" : "gray"}
            className="cursor-pointer"
            onClick={() => handleIconClick('highlighter')} />
        </div>
        
        {/* eraser */}
        <Eraser strokeWidth={1.5} size={30} />

        {/* theme */}
        <div className="relative">
          <Palette strokeWidth={1.5} size={30} color={activeThemeColor ? "purple" : "gray"}
            className="cursor-pointer"
            onClick={() => handleIconClick('theme')} />

        </div>

        {/* undo & redo */}
        <Undo strokeWidth={1.5} size={30} color="gray" className="cursor-pointer" onClick={() => handleIconClick('undo')} />
        <Redo strokeWidth={1.5} size={30} color="gray" className="cursor-pointer" onClick={() => handleIconClick('redo')} />

        <Check strokeWidth={5} size={32} className="p-7 rounded-md bg-purple-500 text-white hover:bg-purple-800 transition mt-2" />
       </div>

      )}
    </div>
  )
}