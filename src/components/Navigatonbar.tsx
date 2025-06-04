"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";

export const navItems = [
  { label: "오늘의 뉴스", path: "/today-news" },
  { label: "나의 추천 뉴스", path: "/recommended-news" },
  { label: "마이페이지", path: "/my" },
];

export default function Navigationbar() {
  const pathName = usePathname();
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = navItems.findIndex((item) => item.path === pathName);
    const activeLink = linkRefs.current[activeIndex];
    const container = containerRef.current;
    if (activeLink && container) {
      const containerRect = container.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      setUnderlineStyle({
        width: linkRect.width,
        left: linkRect.left - containerRect.left,
      });
    }
  }, [pathName]);

  return (
    <nav className="relative">
      <div className="flex items-baseline justify-between gap-6 xl:gap-[50px] 2xl:gap-[100px]">
        <Link href="/today-news">
          <Logo />
        </Link>
        <div
          ref={containerRef}
          className="relative flex items-center gap-6 xl:gap-8 2xl:gap-12 pb-[3px]"
        >
          {navItems.map(({ label, path }, index) => (
            <Link
              key={path}
              ref={(el) => {
                linkRefs.current[index] = el;
              }}
              href={path}
              className={`block pb-[20px] font-title-20 transition-colors duration-300 ${
                pathName === path
                  ? "text-purple-500"
                  : "text-gray-400 hover:text-purple-300"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* underline */}
          <div
            className="absolute bottom-[-1.5px] h-[3px] bg-purple-500 rounded-full transition-all duration-200 ease-out"
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
