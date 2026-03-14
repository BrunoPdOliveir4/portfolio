import type { GitHubCommit } from '@/types/github';

export function CommitHistory({ commits }: { commits: GitHubCommit[] }) {
  if (commits.length === 0) return null;

  return (
    <div className="space-y-3">
      {commits.map((commit) => (
        <div key={commit.sha} className="flex gap-3 items-start">
          <div className="shrink-0 mt-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="min-w-0 flex-1">
            <a
              href={commit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground hover:text-emerald-500 transition-colors line-clamp-1 font-mono"
            >
              {commit.message.split('\n')[0]}
            </a>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
              <span className="font-mono">{commit.repo}</span>
              <span>·</span>
              <span>{new Date(commit.date).toLocaleDateString()}</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground font-mono shrink-0">
            {commit.sha.slice(0, 7)}
          </span>
        </div>
      ))}
    </div>
  );
}
