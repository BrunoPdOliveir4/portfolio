'use client';

import { useEffect } from 'react';

// GitHub Pages serves a static export, so we cannot use a server-side
// redirect() on `/`. Redirect on the client and offer a no-JS fallback link
// so a recruiter pasting the bare URL never lands on a 404.
const target = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/en`;

export function RootRedirect() {
  useEffect(() => {
    window.location.replace(target);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center font-mono text-sm text-muted-foreground">
      <p>
        Redirecting…{' '}
        <noscript>
          <a href={target} className="text-emerald-500 underline">
            Continue to the portfolio
          </a>
        </noscript>
      </p>
    </main>
  );
}
