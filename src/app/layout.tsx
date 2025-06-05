import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

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
      <body className="font-pretendard"> {/* 전역에서 커스텀 폰트 사용 */}
        <Header />
        <div className="border-b border-gray-100"></div>
        <div className="mx-16 my-20 xl:mx-160 xl:my-50 2xl:mx-240 2xl:my-70">
          {children}
        </div>
      </body>
    </html>
  );
}
