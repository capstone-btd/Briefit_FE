"use client";

import { mockPressCompnyTitleList } from "@/mock/pressCompanyList";
import { CheckSquare2, ChevronDown, Square } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

export default function PressCompanyFilterPopup() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const popupRef = useRef<HTMLDivElement>(null);

  const toggleSelect = (title: string) => {
    if (title === "전체") {
      if (selected.length === mockPressCompnyTitleList.length - 1) {
        setSelected([]);
      } else {
        setSelected(mockPressCompnyTitleList.filter((t) => t !== "전체"));
      }
    } else {
      setSelected((prev) =>
        prev.includes(title)
          ? prev.filter((t) => t !== title)
          : [...prev, title],
      );
    }
  };

  const allSelected = selected.length === mockPressCompnyTitleList.length - 1;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative inline-block" ref={popupRef}>
      <div
        className="flex cursor-pointer items-center gap-6"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="font-basic-16 text-gray-400">전체</div>
        <div
          className={`text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <ChevronDown />
        </div>
      </div>

      {/* 팝업 영역 */}
      <div
        className={`absolute right-0 z-50 h-[220px] w-[305px] origin-top rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 ease-out ${
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-y-10 p-20">
          {mockPressCompnyTitleList.map((title, index) => {
            const isSelected =
              title === "전체" ? allSelected : selected.includes(title);

            return (
              <div
                key={index}
                className="flex cursor-pointer items-center gap-10"
                onClick={() => toggleSelect(title)}
              >
                {isSelected ? (
                  <CheckSquare2 fill="#7B47FF" color="white" strokeWidth={1} />
                ) : (
                  <Square className="text-gray-400" strokeWidth={1} />
                )}
                <div className="font-basic-16">{title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}