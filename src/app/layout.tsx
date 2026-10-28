import type { ReactNode } from 'react';
import { Chakra_Petch, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';

// Self-hosted at build time, so the static export never depends on a
// third-party font request (the old CSS @import was silently ignored).
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const display = Chakra_Petch({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt" className={`dark ${mono.variable} ${display.variable}`} suppressHydrationWarning>
      <body className="font-mono antialiased bg-background text-foreground min-h-screen">
        {children}
      </body>
    </html>
  );
}
