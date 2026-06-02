'use client';

import { useEffect } from 'react';

// GitHub Pages serves a static export, so we cannot use a server-side
// redirect() on `/`. Redirect on the client to the visitor's language
// (English browsers → /en, everyone else → the Portuguese default) and offer a
// no-JS fallback link so a recruiter pasting the bare URL never hits a 404.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const fallback = `${basePath}/pt`;

export function RootRedirect() {
  useEffect(() => {
    const prefersEnglish = navigator.language?.toLowerCase().startsWith('en');
    window.location.replace(`${basePath}/${prefersEnglish ? 'en' : 'pt'}`);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center font-mono text-sm text-muted-foreground">
      <p>
        Redirecting…{' '}
        <noscript>
          <a href={fallback} className="text-emerald-500 underline">
            Continuar para o portfólio
          </a>
        </noscript>
      </p>
    </main>
  );
}
