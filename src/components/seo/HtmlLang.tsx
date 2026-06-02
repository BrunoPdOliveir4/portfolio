'use client';

import { useEffect } from 'react';

// The root <html> lives in the root layout, which is above the [locale]
// segment and can't read the locale param. Sync the lang attribute from the
// client so it reflects the active locale (root layout sets a sensible default).
export function HtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
