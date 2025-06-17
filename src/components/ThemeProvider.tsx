"use client";

import { useNewsCustomStore } from "@/stores/detail/useNewsCustomStore";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { globalThemeColor } = useNewsCustomStore();

  return (
    <div className={`min-h-screen ${globalThemeColor || ""}`}>{children}</div>
  );
}
