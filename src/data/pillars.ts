import type { Pillar } from '@/types/pillars';

const experience = { pathname: '/', hash: 'experience' };

// Each proof must point at something already on the site (experience, a case
// study, or the About page), so every claim is one click from its evidence.
export const pillars: Pillar[] = [
  {
    id: 'backend',
    title: 'Backend',
    titleEn: 'Backend',
    summary: 'APIs e serviços que aguentam produção: multi-tenant, orientados a eventos e observáveis.',
    summaryEn: 'APIs and services built for production: multi-tenant, event-driven, and observable.',
    skills: ['Python', 'TypeScript', 'FastAPI', 'Node.js', 'RabbitMQ', 'PostgreSQL'],
    proofs: [
      { text: 'Plataforma multi-tenant com ~6k requisições/dia (NextIA)', textEn: 'Multi-tenant platform at ~6k requests/day (NextIA)', href: experience },
      { text: 'Servidor multiplayer autoritativo em tempo real (Projeto R)', textEn: 'Authoritative real-time multiplayer server (Projeto R)', href: { pathname: '/projects/projeto-r' } },
    ],
  },
  {
    id: 'architecture',
    title: 'Arquitetura',
    titleEn: 'Architecture',
    summary: 'Decisões de back-end e segurança com trade-offs explícitos, do diagrama ao deploy.',
    summaryEn: 'Backend and security decisions with explicit trade-offs, from diagram to deploy.',
    skills: ['Solution Architecture', 'Microservices', 'Event-Driven', 'Clean Architecture', 'Cloud-Native'],
    proofs: [
      { text: 'Tech Lead de projetos corporativos para clientes globais (Accenture)', textEn: 'Tech Lead on enterprise projects for global clients (Accenture)', href: experience },
      { text: 'Decisões técnicas documentadas no case study do Projeto R', textEn: 'Technical decisions documented in the Projeto R case study', href: { pathname: '/projects/projeto-r' } },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    titleEn: 'Security',
    summary: 'Autenticação, autorização e isolamento tratados como requisito, não como remendo.',
    summaryEn: 'Authentication, authorization, and isolation treated as requirements, not patches.',
    skills: ['OAuth2', 'JWT', 'RBAC', 'Input Validation', 'Multi-tenant Isolation'],
    proofs: [
      { text: 'OAuth2 com login social e integrações de terceiros (Wee Find Pro)', textEn: 'OAuth2 with social login and third-party integrations (Wee Find Pro)', href: experience },
      { text: 'Acesso por Twitch OAuth e whitelist (OBS Overlay)', textEn: 'Access through Twitch OAuth and a whitelist (OBS Overlay)', href: { pathname: '/projects/obs-interactive' } },
      { text: 'Servidor que recusa mensagens fora do contrato (Projeto R)', textEn: 'Server that rejects off-contract messages (Projeto R)', href: { pathname: '/projects/projeto-r' } },
      { text: 'Certificação Introduction to Ethical Hacking', textEn: 'Introduction to Ethical Hacking certification', href: { pathname: '/about' } },
    ],
  },
  {
    id: 'ai',
    title: 'AI Engineering',
    titleEn: 'AI Engineering',
    summary: 'Agentes e sistemas multiagente em produção, com LLMs integrados a sistemas distribuídos.',
    summaryEn: 'Agents and multi-agent systems in production, with LLMs wired into distributed systems.',
    skills: ['LangGraph', 'ADK', 'MCP', 'RAG', 'LLMs'],
    proofs: [
      { text: 'Resposta dos agentes de 20–30 s para <1 s (NextIA)', textEn: 'Agent response time from 20–30 s to <1 s (NextIA)', href: experience },
      { text: 'Workflows multiagente com LangGraph, ADK e MCP (NextIA)', textEn: 'Multi-agent workflows with LangGraph, ADK, and MCP (NextIA)', href: experience },
    ],
  },
];
