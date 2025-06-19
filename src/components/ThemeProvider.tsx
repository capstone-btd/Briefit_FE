"use client";

import { useCustomBar } from "@/hooks/useCustomBar";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { themeBgColor } = useCustomBar();

  return <div className={`min-h-screen ${themeBgColor || ""}`}>{children}</div>;
}
