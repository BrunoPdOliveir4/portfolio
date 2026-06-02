'use client';

import { useState } from 'react';

const LOGO_SRC = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/logo.svg`;

/**
 * Brand mark for the navbar. Renders `public/logo.svg` once it exists and
 * falls back to the `~/dev.bpedroso` wordmark until then, so dropping a logo
 * file in is the only step needed to swap the brand.
 */
export function Brand() {
  const [logoFailed, setLogoFailed] = useState(false);

  if (logoFailed) {
    return (
      <span className="font-mono font-bold text-sm">
        <span className="text-emerald-500">~/</span>dev.bpedroso
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export, logo is a fixed local asset
    <img
      src={LOGO_SRC}
      alt="Bruno Pedroso"
      className="h-7 w-auto"
      onError={() => setLogoFailed(true)}
    />
  );
}
