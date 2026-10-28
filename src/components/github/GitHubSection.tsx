import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { cv } from '@/data/cv';
import type { GitHubRepo } from '@/types/github';

type Props = {
  repos: GitHubRepo[];
  publicRepoCount: number | null;
  index?: number;
};

const TOP_LANGUAGES = 3;

/** Most frequent primary languages across the repos, most used first. */
export function topLanguages(repos: GitHubRepo[], limit = TOP_LANGUAGES): string[] {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([language]) => language);
}

export function GitHubSection({ repos, publicRepoCount, index }: Props) {
  const t = useTranslations('github');
  const languages = topLanguages(repos);
  const profileUrl = `https://github.com/${cv.contact.github}`;

  return (
    <Section id="github" title={t('title')} index={index} className="py-12 md:py-16">
      <div className="flex flex-col gap-6 rounded-lg border border-border bg-card dark:bg-zinc-900/50 p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4 font-mono">
          {publicRepoCount !== null && (
            <p>
              <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">{publicRepoCount}</span>{' '}
              <span className="text-sm text-muted-foreground">{t('publicRepos')}</span>
            </p>
          )}
          {languages.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground">{t('topLanguages')}</p>
              <ul className="mt-1 flex flex-wrap gap-1.5">
                {languages.map((language) => (
                  <li
                    key={language}
                    className="rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs text-foreground"
                  >
                    {language}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 font-mono text-sm font-bold text-brand-600 dark:text-brand-400 hover:underline"
        >
          {t('viewProfile')} ↗
        </a>
      </div>
    </Section>
  );
}
