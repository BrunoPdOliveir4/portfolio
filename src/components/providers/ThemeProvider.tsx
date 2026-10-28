'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ReactNode } from 'react';

// The brand is dark-only; forcing the theme keeps `dark:` variants active.
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" forcedTheme="dark" enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
}
