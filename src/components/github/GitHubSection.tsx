import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { RepoCard } from './RepoCard';
import type { GitHubRepo } from '@/types/github';

type Props = {
  repos: GitHubRepo[];
};

export function GitHubSection({ repos }: Props) {
  const t = useTranslations('github');

  return (
    <Section id="projects" title={t('title')}>
      <h3 className="text-sm font-mono font-bold text-emerald-500 dark:text-emerald-400 mb-4">
        {'// '}{t('repositories')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {repos.slice(0, 6).map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </Section>
  );
}
