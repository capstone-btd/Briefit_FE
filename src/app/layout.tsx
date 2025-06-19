import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Briefit",
  description: "개인 맞춤형 뉴스 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-pretendard">
        <ThemeProvider>
          <Header />
          <div className="border-b border-gray-100"></div>
          <div className="px-16 py-20 xl:px-160 xl:py-50 2xl:px-240 2xl:py-70">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
