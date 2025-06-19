// app/layout.tsx
"use client";

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ThemeProvider from "@/components/ThemeProvider";
import { useNewsCustomStore } from "@/stores/detail/useNewsCustomStore"; // 추가

const metadata: Metadata = {
  title: "Briefit",
  description: "개인 맞춤형 뉴스 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalDividerColor = useNewsCustomStore(
    (state) => state.globalDividerColor,
  );

  return (
    <html lang="ko">
      <body className="font-pretendard">
        <ThemeProvider>
          <Header />
          <div
            className={`h-1 ${globalDividerColor ?? "bg-gray-100"}`}
          ></div>
          <div className="px-16 py-20 xl:px-160 xl:py-50 2xl:px-240 2xl:py-70">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
