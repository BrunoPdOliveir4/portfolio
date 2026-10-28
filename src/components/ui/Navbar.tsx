'use client';

import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from './LocaleSwitcher';
import { Brand } from './Brand';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const CV_HREF = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/curriculum.pdf`;

// Home sections are linked by hash so they work from any page (case studies,
// /about); next-intl's Link prefixes the active locale and the basePath.
const sections = ['pillars', 'experience', 'projects', 'skills'] as const;
const pages = [
  { key: 'about', href: '/about' },
  { key: 'terminal', href: '/terminal' },
] as const;

const LINK_CLASS = 'text-xs font-mono text-muted-foreground hover:text-foreground transition-colors';

export function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    ...sections.map((s) => ({ key: s, href: { pathname: '/', hash: s } as const })),
    ...pages,
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || mobileOpen
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        <Link href="/" aria-label="Bruno Pedroso — home" className="flex items-center">
          <Brand />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link key={link.key} href={link.href} className={LINK_CLASS}>
              {link.key === 'terminal' && <span className="text-brand-500">{'>_ '}</span>}
              {t(link.key)}
            </Link>
          ))}
          <div className="flex items-center gap-3 ml-2">
            <a
              href={CV_HREF}
              download="Bruno_Pedroso_Curriculum.pdf"
              className="rounded-md border border-brand-500/40 px-2.5 py-1 text-xs font-mono font-medium text-brand-600 dark:text-brand-400 transition-colors hover:bg-brand-500/10"
            >
              {t('cv')} ↓
            </a>
            <LocaleSwitcher />
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-3">
          <LocaleSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <div className="px-4 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                {'>'} {t(link.key)}
              </Link>
            ))}
            <a
              href={CV_HREF}
              download="Bruno_Pedroso_Curriculum.pdf"
              className="text-sm font-mono text-brand-600 dark:text-brand-400"
            >
              {'>'} {t('cv')} ↓
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
