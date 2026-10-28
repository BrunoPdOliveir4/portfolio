import type { ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { GlowCard } from '@/components/ui/GlowCard';
import { ArchitectureFlow } from './ArchitectureFlow';
import { pick } from '@/lib/cv-i18n';
import type { CaseStudy, Project } from '@/types/cv';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

type Props = {
  project: Project;
  study: CaseStudy;
  nextProject?: Project;
};

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-16">
      <h2 className="mb-6 font-mono text-xl font-bold text-foreground">
        <span className="text-emerald-500 dark:text-emerald-400">{'>'}</span> {title}
      </h2>
      {children}
    </section>
  );
}

const LINK_CLASS =
  'rounded-lg border border-border px-4 py-2 font-mono text-sm text-muted-foreground transition-colors hover:border-emerald-500/50 hover:text-foreground';

export function CaseStudyView({ project, study, nextProject }: Props) {
  const t = useTranslations('caseStudy');
  const locale = useLocale();
  const name = pick(locale, project.name, project.nameEn);
  const learnings = pick(locale, study.learnings, study.learningsEn);

  return (
    <article className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <Link
        href={{ pathname: '/', hash: 'projects' }}
        className="font-mono text-xs text-muted-foreground transition-colors hover:text-emerald-500"
      >
        ← {t('back')}
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl md:text-5xl font-bold font-mono tracking-tight">
          <span className="bg-gradient-to-r from-emerald-400 to-steel-400 bg-clip-text text-transparent">{name}</span>
        </h1>
        <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-muted-foreground">
          {pick(locale, project.description, project.descriptionEn)}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.demo && (
            <a
              href={project.demo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-emerald-500 px-4 py-2 font-mono text-sm font-medium text-zinc-950 transition-colors hover:bg-emerald-400"
            >
              {t('liveDemo')} ↗
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
              {t('sourceCode')} ↗
            </a>
          )}
        </div>
        {project.demo?.notice && (
          <p className="mt-3 text-xs text-amber-600 dark:text-amber-400">
            {pick(locale, project.demo.notice, project.demo.noticeEn)}
          </p>
        )}

        <ul aria-label={t('stack')} className="mt-6 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <li key={tech} className="rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 font-mono text-xs text-muted-foreground">
              {tech}
            </li>
          ))}
        </ul>

        {project.screenshot && (
          // eslint-disable-next-line @next/next/no-img-element -- static export serves images unoptimized
          <img
            src={`${basePath}${project.screenshot}`}
            alt={name}
            className="mt-10 w-full rounded-lg border border-border object-cover shadow-2xl shadow-emerald-500/5"
          />
        )}
      </header>

      <Block title={t('problem')}>
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          {pick(locale, study.problem, study.problemEn)}
        </p>
      </Block>

      <Block title={t('architecture')}>
        <ArchitectureFlow steps={study.architecture} />
      </Block>

      <Block title={t('decisions')}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {study.decisions.map((decision) => (
            <GlowCard key={decision.topic} hover={false} className="p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-steel-500 dark:text-steel-400">
                {pick(locale, decision.topic, decision.topicEn)}
              </p>
              <h3 className="mt-1 font-mono text-sm font-bold text-foreground">
                {pick(locale, decision.choice, decision.choiceEn)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pick(locale, decision.why, decision.whyEn)}
              </p>
            </GlowCard>
          ))}
        </div>
      </Block>

      <Block title={t('results')}>
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {study.results.map((metric) => (
            <div key={metric.labelEn} className="flex flex-col rounded-lg border border-border bg-card dark:bg-zinc-900/50 p-4">
              <dt className="order-2 mt-1 text-xs text-muted-foreground">{pick(locale, metric.label, metric.labelEn)}</dt>
              <dd className="order-1 font-mono text-xl font-bold text-emerald-600 dark:text-emerald-400">{pick(locale, metric.value, metric.valueEn ?? metric.value)}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block title={t('learnings')}>
        <ul className="max-w-3xl space-y-3">
          {learnings.map((learning) => (
            <li key={learning} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="text-emerald-500 dark:text-emerald-400">▹</span>
              <span>{learning}</span>
            </li>
          ))}
        </ul>
      </Block>

      {study.gallery.length > 0 && (
        <Block title={t('gallery')}>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {study.gallery.map((image, i) => (
              // eslint-disable-next-line @next/next/no-img-element -- static export serves images unoptimized
              <img
                key={image.src}
                src={`${basePath}${image.src}`}
                alt={pick(locale, image.alt, image.altEn)}
                loading="lazy"
                className={
                  i === 0
                    ? 'col-span-2 md:col-span-3 w-full rounded-lg border border-border object-cover'
                    : 'aspect-[2/3] w-full rounded-lg border border-border object-cover'
                }
              />
            ))}
          </div>
        </Block>
      )}

      {nextProject && (
        <nav className="mt-20 border-t border-border pt-8">
          <p className="font-mono text-xs text-muted-foreground">{t('nextProject')}</p>
          <Link
            href={`/projects/${nextProject.id}`}
            className="mt-1 inline-block font-mono text-xl font-bold text-foreground transition-colors hover:text-emerald-500"
          >
            {pick(locale, nextProject.name, nextProject.nameEn)} →
          </Link>
        </nav>
      )}
    </article>
  );
}
