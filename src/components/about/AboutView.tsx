import type { ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { GlowCard } from '@/components/ui/GlowCard';
import { about } from '@/data/about';
import { cv } from '@/data/cv';
import { pick } from '@/lib/cv-i18n';

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-16">
      <h2 id={id} className="mb-6 font-display text-xl font-bold uppercase tracking-[0.08em] text-foreground">
        <span className="text-brand-500 dark:text-brand-400">{'>'}</span> {title}
      </h2>
      {children}
    </section>
  );
}

export function AboutView() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <article className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <h1 className="text-3xl md:text-5xl font-bold font-display uppercase tracking-[0.06em]">
        <span className="text-brand-500">{'>'}</span>{' '}
        <span className="bg-gradient-to-r from-zinc-50 via-brand-300 to-brand-400 bg-clip-text text-transparent">
          {t('title')}
        </span>
      </h1>

      <Block id="story" title={t('story')}>
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
          {pick(locale, about.story, about.storyEn).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Block>

      <Block id="looking-for" title={t('lookingFor')}>
        <ul className="flex flex-wrap gap-2">
          {about.targetRoles.map((role) => (
            <li
              key={role}
              className="rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 font-mono text-sm text-brand-700 dark:text-brand-300"
            >
              {role}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          {pick(locale, about.availability, about.availabilityEn)}
        </p>
      </Block>

      <Block id="how-i-work" title={t('howIWork')}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {about.principles.map((principle) => (
            <GlowCard key={principle.titleEn} className="p-5">
              <h3 className="font-mono text-sm font-bold text-foreground">
                {pick(locale, principle.title, principle.titleEn)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pick(locale, principle.detail, principle.detailEn)}
              </p>
            </GlowCard>
          ))}
        </div>
      </Block>

      <Block id="education" title={t('education')}>
        <ul className="space-y-4">
          {cv.education.map((entry) => (
            <li key={entry.degree} className="border-l-2 border-brand-500/40 pl-4">
              <p className="font-bold text-foreground">{pick(locale, entry.degree, entry.degreeEn)}</p>
              <p className="font-mono text-sm text-muted-foreground">
                {entry.institution} · {entry.period}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h3 className="font-mono text-xs text-zinc-500">{`// ${t('certifications')}`}</h3>
            <ul className="mt-2 space-y-1 text-sm text-foreground">
              {cv.certifications.map((certification) => (
                <li key={certification}>{certification}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs text-zinc-500">{`// ${t('languages')}`}</h3>
            <ul className="mt-2 space-y-1 text-sm text-foreground">
              {cv.languages.map((language) => (
                <li key={language.nameEn}>
                  {pick(locale, language.name, language.nameEn)}{' '}
                  <span className="text-muted-foreground">— {pick(locale, language.level, language.levelEn)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Block>

      <Block id="uses" title={t('uses')}>
        <p className="-mt-3 mb-6 text-sm text-muted-foreground">{t('usesNote')}</p>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
          {about.uses.map((group) => (
            <div key={group.categoryEn}>
              <dt className="font-mono text-xs text-zinc-500">
                {'// '}{pick(locale, group.category, group.categoryEn)}
              </dt>
              <dd className="mt-1 text-sm text-foreground">{group.tools.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </Block>
    </article>
  );
}
