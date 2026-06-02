import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { SkillsSection } from '@/components/skills/SkillsSection';
import { GitHubSection } from '@/components/github/GitHubSection';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { MouseSpotlight } from '@/components/ui/MouseSpotlight';
import { HeroSection } from '@/components/desktop/HeroSection';
import { fetchRepos } from '@/lib/github';
import { setRequestLocale } from 'next-intl/server';

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const repos = await fetchRepos();

  return (
    <>
      <MouseSpotlight />
      <Navbar />

      <main className="pt-14">
        {/* Terminal Hero / Desktop Mode */}
        <section id="terminal">
          <HeroSection />
        </section>

        {/* Experience */}
        <ExperienceSection />

        {/* Skills */}
        <SkillsSection />

        {/* GitHub */}
        <GitHubSection repos={repos} />
      </main>

      <Footer />
    </>
  );
}
