import type { About } from '@/types/about';

// Draft for review: the story is built from the CV (src/data/cv.ts) and the
// tool list is inferred from the projects' repos.
export const about: About = {
  story: [
    'Antes do código veio a música: me formei em Educação Musical pela Universidade Católica de Santos. Em 2023 comecei o bacharelado em Engenharia de Software na Jala University e, em 2024, entrei no mercado como desenvolvedor back-end.',
    'Construí APIs em Node.js e TypeScript e, na NextIA, uma plataforma multi-tenant de agentes de IA com LangGraph, ADK e MCP que atendia cerca de 50 empresas. Hoje sou Engenheiro de Software Sênior e Tech Lead na Accenture, conduzindo a arquitetura de projetos corporativos para clientes globais, e faço um MBA em Arquitetura de Software.',
    'Gosto de problemas em que a arquitetura faz diferença: sistemas distribuídos, mensageria e tempo real. Nos projetos pessoais, isso virou um RPG multiplayer com servidor autoritativo e um overlay interativo para lives.',
  ],
  storyEn: [
    'Music came before code: I graduated in Music Education from Universidade Católica de Santos. In 2023 I started a B.Sc. in Software Engineering at Jala University, and in 2024 I joined the industry as a back-end developer.',
    'I built APIs with Node.js and TypeScript and, at NextIA, a multi-tenant AI agent platform with LangGraph, ADK, and MCP serving about 50 companies. Today I am a Senior Software Engineer and Tech Lead at Accenture, driving the architecture of enterprise projects for global clients, while taking an MBA in Software Architecture.',
    'I enjoy problems where architecture makes the difference: distributed systems, messaging, and real time. In side projects, that became a multiplayer RPG with an authoritative server and an interactive overlay for live streams.',
  ],
  targetRoles: ['Senior Backend Engineer', 'Enterprise Solution Architect', 'Security Architect'],
  availability: 'Remoto, para empresas no Brasil e no exterior. Baseado em Bertioga, SP (UTC−3).',
  availabilityEn: 'Remote, for companies in Brazil and abroad. Based in Bertioga, Brazil (UTC−3).',
  principles: [
    {
      title: 'Type-safety de ponta a ponta',
      titleEn: 'End-to-end type safety',
      detail: 'Contratos tipados do banco ao cliente, com validação na borda (zod, Pydantic).',
      detailEn: 'Typed contracts from database to client, validated at the edge (zod, Pydantic).',
    },
    {
      title: 'Observabilidade',
      titleEn: 'Observability',
      detail: 'Logs estruturados e métricas desde o primeiro deploy. Problema em produção vira dado, não palpite.',
      detailEn: 'Structured logs and metrics from the first deploy. Production issues become data, not guesses.',
    },
    {
      title: 'Testes automatizados',
      titleEn: 'Automated tests',
      detail: 'Jest, Vitest e Pytest rodando no CI, com regras de domínio puras e fáceis de testar.',
      detailEn: 'Jest, Vitest, and Pytest in CI, with pure domain rules that are easy to test.',
    },
    {
      title: 'Legibilidade',
      titleEn: 'Readability',
      detail: 'Código e documentação que a próxima pessoa entende sem precisar me chamar.',
      detailEn: 'Code and docs the next person understands without having to call me.',
    },
  ],
  uses: [
    { category: 'Editor e IA', categoryEn: 'Editor & AI', tools: ['VS Code', 'Claude Code'] },
    { category: 'Sistema e terminal', categoryEn: 'OS & terminal', tools: ['macOS', 'zsh'] },
    { category: 'Back-end', categoryEn: 'Back-end', tools: ['Node.js', 'Python', 'FastAPI', 'pnpm'] },
    { category: 'Dados e mensageria', categoryEn: 'Data & messaging', tools: ['PostgreSQL', 'Redis', 'RabbitMQ', 'MongoDB'] },
    { category: 'Infra e CI', categoryEn: 'Infra & CI', tools: ['Docker', 'GitHub Actions', 'Vercel', 'Render'] },
    { category: 'Testes', categoryEn: 'Testing', tools: ['Jest', 'Vitest', 'Pytest'] },
  ],
};
