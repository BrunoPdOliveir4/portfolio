'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { GlowCard } from '@/components/ui/GlowCard';
import { Link } from '@/i18n/routing';
import { pick } from '@/lib/cv-i18n';
import type { Project } from '@/types/cv';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const LINK_CLASS =
  'inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 hover:underline';

function ProjectScreenshot({ name, screenshot }: { name: string; screenshot?: string }) {
  const [hasFailed, setHasFailed] = useState(false);

  if (!screenshot || hasFailed) {
    return (
      <div
        data-testid="project-screenshot-placeholder"
        className="aspect-video flex items-center justify-center bg-gradient-to-br from-emerald-500/20 via-zinc-800 to-zinc-900"
      >
        <span className="font-mono text-lg font-bold text-zinc-200">{name}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export serves images unoptimized
    <img
      src={`${BASE_PATH}${screenshot}`}
      alt={name}
      loading="lazy"
      onError={() => setHasFailed(true)}
      className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
    />
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const locale = useLocale();
  const t = useTranslations('projects');
  const name = pick(locale, project.name, project.nameEn);
  const highlights = pick(locale, project.highlights, project.highlightsEn) ?? [];
  const notice = project.demo && pick(locale, project.demo.notice, project.demo.noticeEn);

  return (
    <GlowCard className="group h-full flex flex-col overflow-hidden p-0">
      <Link href={`/projects/${project.id}`} tabIndex={-1} aria-hidden="true" className="block overflow-hidden">
        <ProjectScreenshot name={name} screenshot={project.screenshot} />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold font-mono text-foreground">
          <Link href={`/projects/${project.id}`} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            {name}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {pick(locale, project.description, project.descriptionEn)}
        </p>

        {highlights.length > 0 && (
          <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span className="text-emerald-500 dark:text-emerald-400">▹</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-muted-foreground font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5 flex flex-wrap items-center gap-4">
          <Link href={`/projects/${project.id}`} className={LINK_CLASS}>
            {t('caseStudy')} →
          </Link>
          {project.demo && (
            <a href={project.demo.url} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
              {t('liveDemo')} ↗
            </a>
          )}
        </div>

        {notice && <p className="mt-3 text-xs text-amber-600 dark:text-amber-400">{notice}</p>}
      </div>
    </GlowCard>
  );
}
