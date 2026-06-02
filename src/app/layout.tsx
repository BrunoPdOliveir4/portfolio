import type { ReactNode } from 'react';
import '@/styles/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className="font-mono antialiased bg-background text-foreground min-h-screen">
        {children}
      </body>
    </html>
  );
}
