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
    const activeIndex = navItems.findIndex((item) =>
      pathName.startsWith(item.path),
    );

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
      <div className="flex items-baseline justify-between gap-24 xl:gap-50 2xl:gap-100">
        <Link href={navItems[0].path}>
          <Logo />
        </Link>
        <div
          ref={containerRef}
          className="relative flex items-center gap-24 pb-3 xl:gap-32 2xl:gap-48"
        >
          {navItems.map(({ label, path }, index) => (
            <Link
              key={path}
              ref={(el) => {
                linkRefs.current[index] = el;
              }}
              href={path}
              className={`font-title-20 block pb-20 transition-colors duration-300 ${
                pathName .startsWith(path)
                  ? "text-purple-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* underline */}
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
