"use client";

import Link from "next/link";
import { useNavStore } from "@/stores/navigation/useNavStrore";
import { navItems } from "@/constants/navItems";
import { useNavigation } from "@/hooks/useNavigation";

export default function Navigationbar() {
  const { selectedPath, setSelectedPath } = useNavStore(); 
  const { containerRef, linkRefs, underlineStyle, handleClick } = useNavigation(
    selectedPath,
    setSelectedPath,
  );

  return (
    <nav className="relative">
      <div className="flex items-baseline justify-between gap-24 xl:gap-50 2xl:gap-100">
        <div
          ref={containerRef}
          className="relative flex items-center gap-24 pb-3 xl:gap-32 2xl:gap-48"
        >
          {navItems.map(({ label, path }, index) => (
            <Link
              prefetch
              key={path}
              ref={(el) => {
                linkRefs.current[index] = el;
              }}
              href={path}
              onClick={() => handleClick(index, path)}
              className={`block pb-20 font-title-20 transition-colors duration-300 ${
                selectedPath === path
                  ? "text-purple-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {label}
            </Link>
          ))}

          <div
            className="absolute bottom-[-1.5px] h-3 rounded-full bg-purple-500 transition-all duration-200 ease-out"
            style={{
              width: `${underlineStyle.width}px`,
              transform: `translateX(${underlineStyle.left}px)`,
            }}
          />
        </div>
      </div>
    </nav>
  );
}