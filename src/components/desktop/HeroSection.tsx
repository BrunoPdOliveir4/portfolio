'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence } from 'framer-motion';
import { Terminal } from '@/components/terminal/Terminal';
import { Desktop } from './Desktop';
import { cv } from '@/data/cv';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const ctas = [
  { label: 'Download CV', href: `${basePath}/curriculum.pdf`, download: true, primary: true },
  { label: 'LinkedIn', href: `https://www.linkedin.com/in/${cv.contact.linkedin}`, external: true },
  { label: 'GitHub', href: `https://github.com/${cv.contact.github}`, external: true },
  { label: 'Email', href: `mailto:${cv.contact.email}` },
];

export function HeroSection() {
  const [mode, setMode] = useState<'terminal' | 'desktop'>('terminal');
  const t = useTranslations('hero');

  if (mode === 'desktop') {
    return (
      <AnimatePresence mode="wait">
        <Desktop
          key="desktop"
          onSwitchToTerminal={() => setMode('terminal')}
        />
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 md:py-24">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-mono mb-2">
          <span className="text-emerald-500">{'>'}</span> Bruno Pedroso
        </h1>
        <p className="text-muted-foreground font-mono text-sm">
          {t('subtitle')}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {ctas.map((cta) => (
            <a
              key={cta.label}
              href={cta.href}
              {...(cta.download ? { download: 'Bruno_Pedroso_Curriculum.pdf' } : {})}
              {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={
                cta.primary
                  ? 'rounded-lg bg-emerald-500 px-4 py-2 font-mono text-sm font-medium text-zinc-950 transition-colors hover:bg-emerald-400'
                  : 'rounded-lg border border-border px-4 py-2 font-mono text-sm text-muted-foreground transition-colors hover:border-emerald-500/50 hover:text-foreground'
              }
            >
              {cta.primary ? t('downloadCv') : cta.label}
            </a>
          ))}
        </div>
      </div>
      <Terminal onToggleDesktop={() => setMode('desktop')} />
    </div>
  );
}
