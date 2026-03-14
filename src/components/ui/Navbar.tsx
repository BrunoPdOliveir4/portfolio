'use client';

import { useTranslations } from 'next-intl';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const sections = ['terminal', 'experience', 'skills', 'architecture', 'projects'] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        <a href="#terminal" className="font-mono font-bold text-sm">
          <span className="text-emerald-500">~/</span>dev.bpedroso
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(s)}
            </a>
          ))}
          <div className="flex items-center gap-2 ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 flex items-center justify-center"
            aria-label="Toggle menu"
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
            {sections.map((s) => (
              <a
                key={s}
                href={`#${s}`}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                {'>'} {t(s)}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
