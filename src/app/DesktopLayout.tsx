import Header from '@/components/Header';
import React from 'react';
import DividerProvider from './providers/DividerProvider';
import ThemeProvider from './providers/ThemeProvider';

function DesktopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <Header />
      <DividerProvider />
      <div className="px-16 py-20 xl:px-160 xl:py-50 2xl:px-240 2xl:py-70">
        {children}
      </div>
    </ThemeProvider>
  );
}

export default DesktopLayout;