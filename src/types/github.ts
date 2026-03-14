export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

export interface GitHubCommit {
  sha: string;
  message: string;
  date: string;
  repo: string;
  url: string;
}
