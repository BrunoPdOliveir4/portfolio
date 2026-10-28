import { useLocale, useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { GlowCard } from '@/components/ui/GlowCard';
import { Link } from '@/i18n/routing';
import { pillars } from '@/data/pillars';
import { pick } from '@/lib/cv-i18n';
import type { PillarId } from '@/types/pillars';

// Line icons in the style of the brand sheet: mint strokes, rounded ends.
const ICONS: Record<PillarId, JSX.Element> = {
  backend: (
    <>
      <rect x="4" y="4" width="24" height="10" rx="2.5" />
      <rect x="4" y="18" width="24" height="10" rx="2.5" />
      <circle cx="9" cy="9" r="1.2" fill="currentColor" />
      <circle cx="13" cy="9" r="1.2" fill="currentColor" />
      <circle cx="9" cy="23" r="1.2" fill="currentColor" />
      <circle cx="13" cy="23" r="1.2" fill="currentColor" />
    </>
  ),
  architecture: (
    <>
      <rect x="12" y="3" width="8" height="7" rx="1.5" />
      <rect x="3" y="22" width="8" height="7" rx="1.5" />
      <rect x="21" y="22" width="8" height="7" rx="1.5" />
      <path d="M16 10 V16 M7 22 V16 H25 V22" />
    </>
  ),
  security: (
    <>
      <path d="M16 3 L27 7.5 V15 C27 22 22 27 16 29 C10 27 5 22 5 15 V7.5 Z" />
      <circle cx="16" cy="14" r="2.5" />
      <path d="M16 16.5 V21" />
    </>
  ),
  ai: (
    <>
      <path d="M13 5 C8 5 5 8.5 5 12.5 C3.5 14 3.5 18 5 19.5 C5 23.5 8 27 13 27 Z" />
      <path d="M19 5 C24 5 27 8.5 27 12.5 C28.5 14 28.5 18 27 19.5 C27 23.5 24 27 19 27 Z" />
      <path d="M13 11 H10 M13 16 H8 M13 21 H10 M19 11 H22 M19 16 H24 M19 21 H22" />
    </>
  ),
};

export function PillarsSection({ index }: { index?: number }) {
  const t = useTranslations('pillars');
  const locale = useLocale();

  return (
    <Section id="pillars" title={t('title')} subtitle={t('subtitle')} index={index}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {pillars.map((pillar) => (
          <GlowCard key={pillar.id} className="flex flex-col p-5">
            <svg
              viewBox="0 0 32 32"
              aria-hidden="true"
              className="h-9 w-9 text-brand-400 drop-shadow-[0_0_8px_rgba(94,242,166,0.35)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {ICONS[pillar.id]}
            </svg>
            <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-[0.12em] text-foreground">
              {pick(locale, pillar.title, pillar.titleEn)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {pick(locale, pillar.summary, pillar.summaryEn)}
            </p>

            <ul aria-label={t('skills')} className="mt-4 flex flex-wrap gap-1.5">
              {pillar.skills.map((skill) => (
                <li key={skill} className="rounded border border-brand-500/20 bg-brand-500/5 px-2 py-0.5 text-[11px] text-brand-300">
                  {skill}
                </li>
              ))}
            </ul>

            <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-zinc-500">{t('proof')}</p>
            <ul className="mt-2 space-y-1.5">
              {pillar.proofs.map((proof) => (
                <li key={proof.textEn}>
                  <Link
                    href={proof.href}
                    className="group flex gap-2 text-xs leading-relaxed text-muted-foreground transition-colors hover:text-brand-300"
                  >
                    <span aria-hidden="true" className="text-brand-500">▹</span>
                    <span className="group-hover:underline">{pick(locale, proof.text, proof.textEn)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </GlowCard>
        ))}
      </div>
    </Section>
  );
}
