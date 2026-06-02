import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { SkillsSection } from '@/components/skills/SkillsSection';
import { ArchitectureViewer } from '@/components/architecture/ArchitectureViewer';
import { GitHubSection } from '@/components/github/GitHubSection';
import { CodeToggle } from '@/components/code-toggle/CodeToggle';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Section } from '@/components/ui/Section';
import { MouseSpotlight } from '@/components/ui/MouseSpotlight';
import { HeroSection } from '@/components/desktop/HeroSection';
import { fetchRepos } from '@/lib/github';
import { eventDrivenTS, eventDrivenPython } from '@/data/code-samples/event-driven';
import { authMiddlewareTS, authMiddlewarePython } from '@/data/code-samples/auth-middleware';
import { agentOrchestrationTS, agentOrchestrationPython } from '@/data/code-samples/agent-orchestration';

const codeSamples = [
  {
    title: 'Event-Driven',
    typescript: eventDrivenTS,
    python: eventDrivenPython,
  },
  {
    title: 'Auth Middleware',
    typescript: authMiddlewareTS,
    python: authMiddlewarePython,
  },
  {
    title: 'Agent Orchestration',
    typescript: agentOrchestrationTS,
    python: agentOrchestrationPython,
  },
];

export default async function HomePage() {
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

        {/* Skills + Code Samples */}
        <SkillsSection />
        <Section id="code-samples" className="pt-0">
          <CodeToggle samples={codeSamples} />
        </Section>

        {/* Architecture */}
        <ArchitectureViewer />

        {/* GitHub */}
        <GitHubSection repos={repos} />
      </main>

      <Footer />
    </>
  );
}
