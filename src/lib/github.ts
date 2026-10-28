import type { GitHubRepo, GitHubUser } from '@/types/github';

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

/** Total public repos on the profile, or null when the API is unavailable at build time. */
export async function fetchPublicRepoCount(): Promise<number | null> {
  const res = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, { cache: 'force-cache' });

  if (!res.ok) return null;
  const user: GitHubUser = await res.json();
  return user.public_repos;
}
