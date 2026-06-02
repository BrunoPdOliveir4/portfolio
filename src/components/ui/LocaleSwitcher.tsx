'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center font-mono text-xs" role="group" aria-label="Language">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="text-zinc-500" aria-hidden="true">/</span>}
          <button
            onClick={() => router.replace(pathname, { locale: l })}
            aria-current={l === locale ? 'true' : undefined}
            className={cn(
              'px-1.5 transition-colors',
              l === locale
                ? 'font-bold text-emerald-500 dark:text-emerald-400'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
