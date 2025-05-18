import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Briefit",
  description: "맞춤형 뉴스 요약",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-pretendard"> { /* 전역에서 커스텀 폰트 사용 */ }
        {children}
      </body>
    </html>
  );
}
