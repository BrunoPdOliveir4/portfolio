import { render, screen } from '@/test-utils/render';
import { GitHubSection, topLanguages } from '../GitHubSection';
import type { GitHubRepo } from '@/types/github';

function repo(id: number, language: string | null): GitHubRepo {
  return {
    id,
    name: `repo-${id}`,
    full_name: `BrunoPdOliveir4/repo-${id}`,
    description: null,
    html_url: `https://github.com/BrunoPdOliveir4/repo-${id}`,
    language,
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-10-01T00:00:00Z',
    topics: [],
  };
}

describe('topLanguages', () => {
  it('ranks languages by repo count and skips repos without one', () => {
    const repos = [repo(1, 'TypeScript'), repo(2, 'Python'), repo(3, 'TypeScript'), repo(4, null), repo(5, 'Go'), repo(6, 'Rust')];
    expect(topLanguages(repos)).toEqual(['TypeScript', 'Python', 'Go']);
  });
});

describe('GitHubSection', () => {
  it('shows the public repo count, top languages and the profile link', () => {
    render(<GitHubSection repos={[repo(1, 'TypeScript'), repo(2, 'Python')]} publicRepoCount={24} />);
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View GitHub profile/ })).toHaveAttribute(
      'href',
      'https://github.com/BrunoPdOliveir4',
    );
  });

  it('still links to the profile when the GitHub API was unavailable at build time', () => {
    render(<GitHubSection repos={[]} publicRepoCount={null} />);
    expect(screen.queryByText('public repositories')).not.toBeInTheDocument();
    expect(screen.queryByText('Most used languages')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View GitHub profile/ })).toBeInTheDocument();
  });
});
