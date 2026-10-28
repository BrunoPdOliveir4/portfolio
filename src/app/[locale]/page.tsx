import { Hero } from '@/components/home/Hero';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { SkillsSection } from '@/components/skills/SkillsSection';
import { GitHubSection } from '@/components/github/GitHubSection';
import { ContactSection } from '@/components/home/ContactSection';
import { fetchPublicRepoCount, fetchRepos } from '@/lib/github';
import { setRequestLocale } from 'next-intl/server';

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const [repos, publicRepoCount] = await Promise.all([fetchRepos(), fetchPublicRepoCount()]);

  return (
    <main className="pt-14">
      <Hero />
      <ExperienceSection index={1} />
      <ProjectsSection index={2} />
      <SkillsSection index={3} />
      <GitHubSection repos={repos} publicRepoCount={publicRepoCount} index={4} />
      <ContactSection index={5} />
    </main>
  );
}
