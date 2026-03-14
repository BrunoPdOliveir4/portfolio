import type { ArchitectureConfig } from '@/types/architecture';

export const weefindConfig: ArchitectureConfig = {
  id: 'weefind',
  company: 'WeeFind Pro',
  companyEn: 'WeeFind Pro',
  description: 'APIs RESTful escaláveis com Clean Architecture',
  descriptionEn: 'Scalable RESTful APIs with Clean Architecture',
  nodes: [
    { id: 'client', type: 'clientNode', position: { x: 0, y: 100 }, data: { label: 'Web App', type: 'web' } },
    { id: 'gateway', type: 'serviceNode', position: { x: 250, y: 100 }, data: { label: 'API Gateway', description: 'OAuth2 + routing', tech: 'Node.js', icon: 'gateway' } },
    { id: 'auth-service', type: 'serviceNode', position: { x: 500, y: 0 }, data: { label: 'Auth Service', description: 'OAuth2 provider', tech: 'TypeScript', icon: 'api' } },
    { id: 'core-api', type: 'serviceNode', position: { x: 500, y: 150 }, data: { label: 'Core API', description: 'Business logic (SOLID)', tech: 'TypeScript', icon: 'api' } },
    { id: 'service-template', type: 'serviceNode', position: { x: 500, y: 300 }, data: { label: 'Service Template', description: 'Standardized modules', tech: 'TypeScript', icon: 'worker' } },
    { id: 'postgres', type: 'databaseNode', position: { x: 750, y: 100 }, data: { label: 'PostgreSQL', type: 'postgresql' } },
  ],
  edges: [
    { id: 'e1', source: 'client', target: 'gateway', animated: true },
    { id: 'e2', source: 'gateway', target: 'auth-service' },
    { id: 'e3', source: 'gateway', target: 'core-api' },
    { id: 'e4', source: 'core-api', target: 'service-template', style: { strokeDasharray: '5 5' }, label: 'extends' },
    { id: 'e5', source: 'auth-service', target: 'postgres' },
    { id: 'e6', source: 'core-api', target: 'postgres' },
  ],
};
