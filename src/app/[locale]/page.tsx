import { Terminal } from '@/components/terminal/Terminal';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { SkillsSection } from '@/components/skills/SkillsSection';
import { ArchitectureViewer } from '@/components/architecture/ArchitectureViewer';
import { GitHubSection } from '@/components/github/GitHubSection';
import { CodeToggle } from '@/components/code-toggle/CodeToggle';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Section } from '@/components/ui/Section';
import { MouseSpotlight } from '@/components/ui/MouseSpotlight';
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
        {/* Terminal Hero */}
        <Section id="terminal" className="min-h-[80vh] flex flex-col items-center justify-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-mono mb-2">
              <span className="text-emerald-500">{'>'}</span> Bruno Pedroso
            </h1>
            <p className="text-muted-foreground font-mono text-sm">
              Back-End Engineer · TypeScript · Python · Distributed Systems
            </p>
          </div>
          <Terminal />
        </Section>

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
