import React from "react";
import DividerProvider from "../providers/DividerProvider";
import ThemeProvider from "../providers/ThemeProvider";

function MobileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <DividerProvider />
      {children}
    </ThemeProvider>
  );
}

export default MobileLayout;
