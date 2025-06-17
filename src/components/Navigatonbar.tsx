"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useNavStore } from "@/stores/navigation/useNavStrore";
import { navItems } from "@/constants/navItems";

export default function Navigationbar() {
  const { selectedPath, setSelectedPath } = useNavStore();
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const updateUnderline = (index: number) => {
    const container = containerRef.current;
    const link = linkRefs.current[index];
    if (container && link) {
      const containerRect = container.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      setUnderlineStyle({
        width: linkRect.width,
        left: linkRect.left - containerRect.left,
      });
    }
  };

  const handleClick = (index: number, path: string) => {
    setSelectedPath(path);
    updateUnderline(index);
  };

  useEffect(() => {
    if (selectedPath) {
      const index = navItems.findIndex((item) => item.path === selectedPath);
      if (index !== -1) {
        setTimeout(() => updateUnderline(index), 0);
      }
    }
  }, [selectedPath]);

  return (
    <nav className="relative">
      <div className="flex items-baseline justify-between gap-24 xl:gap-50 2xl:gap-100">
        <Link prefetch href={navItems[0].path} onClick={() => handleClick(0, navItems[0].path)}>
          <Logo />
        </Link>
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
