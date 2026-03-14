import { GlowCard } from '@/components/ui/GlowCard';
import type { GitHubRepo } from '@/types/github';

export function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
      <GlowCard className="h-full">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-sm font-bold font-mono text-foreground">{repo.name}</h4>
          {repo.language && (
            <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-muted-foreground font-mono">
              {repo.language}
            </span>
          )}
        </div>
        {repo.description && (
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {repo.description}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
          {repo.stargazers_count > 0 && <span>⭐ {repo.stargazers_count}</span>}
          {repo.forks_count > 0 && <span>🔀 {repo.forks_count}</span>}
        </div>
      </GlowCard>
    </a>
  );
}
