import type { ArchitectureConfig } from '@/types/architecture';

export const programarConfig: ArchitectureConfig = {
  id: 'programar',
  company: 'Programar com Você',
  companyEn: 'Programar com Você',
  description: 'APIs REST com NestJS, autenticação JWT e real-time com WebSockets',
  descriptionEn: 'REST APIs with NestJS, JWT authentication and real-time WebSockets',
  nodes: [
    { id: 'client-web', type: 'clientNode', position: { x: 0, y: 50 }, data: { label: 'Web Client', type: 'web' } },
    { id: 'client-mobile', type: 'clientNode', position: { x: 0, y: 200 }, data: { label: 'Mobile App', type: 'mobile' } },
    { id: 'nestjs', type: 'serviceNode', position: { x: 300, y: 50 }, data: { label: 'NestJS API', description: 'REST + WebSocket', tech: 'NestJS', icon: 'api' } },
    { id: 'ws-gateway', type: 'serviceNode', position: { x: 300, y: 200 }, data: { label: 'WS Gateway', description: 'Real-time events', tech: 'Socket.IO', icon: 'gateway' } },
    { id: 'sqs', type: 'queueNode', position: { x: 550, y: 200 }, data: { label: 'AWS SQS', type: 'sqs' } },
    { id: 'postgres', type: 'databaseNode', position: { x: 550, y: 0 }, data: { label: 'PostgreSQL', type: 'postgresql' } },
    { id: 's3', type: 'databaseNode', position: { x: 550, y: 120 }, data: { label: 'AWS S3', type: 'postgresql' } },
  ],
  edges: [
    { id: 'e1', source: 'client-web', target: 'nestjs', animated: true },
    { id: 'e2', source: 'client-mobile', target: 'ws-gateway', animated: true },
    { id: 'e3', source: 'nestjs', target: 'postgres' },
    { id: 'e4', source: 'nestjs', target: 's3' },
    { id: 'e5', source: 'nestjs', target: 'sqs', style: { strokeDasharray: '5 5' }, label: 'async' },
    { id: 'e6', source: 'ws-gateway', target: 'nestjs', label: 'events' },
  ],
};
