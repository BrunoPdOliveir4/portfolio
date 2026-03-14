import type { GitHubRepo, GitHubCommit } from '@/types/github';

const GITHUB_USERNAME = 'BrunoPdOliveir4';
const GITHUB_API = 'https://api.github.com';

export async function fetchRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`,
    { cache: 'force-cache' }
  );

  if (!res.ok) return [];
  return res.json();
}

export async function fetchCommits(): Promise<GitHubCommit[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/events?per_page=30`,
    { cache: 'force-cache' }
  );

  if (!res.ok) return [];

  const events = await res.json();

  return events
    .filter((e: any) => e.type === 'PushEvent')
    .flatMap((e: any) =>
      (e.payload.commits || []).map((c: any) => ({
        sha: c.sha,
        message: c.message,
        date: e.created_at,
        repo: e.repo.name.replace(`${GITHUB_USERNAME}/`, ''),
        url: `https://github.com/${e.repo.name}/commit/${c.sha}`,
      }))
    )
    .slice(0, 20);
}
