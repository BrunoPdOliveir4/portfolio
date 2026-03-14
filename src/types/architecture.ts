import type { Node, Edge } from '@xyflow/react';

export type ServiceNodeData = {
  label: string;
  description: string;
  tech: string;
  icon: 'api' | 'worker' | 'gateway';
};

export type DatabaseNodeData = {
  label: string;
  type: 'postgresql' | 'mongodb' | 'redis' | 'mysql';
};

export type QueueNodeData = {
  label: string;
  type: 'rabbitmq' | 'sqs' | 'pubsub';
};

export type AIAgentNodeData = {
  label: string;
  model: string;
  protocol?: string;
};

export type ClientNodeData = {
  label: string;
  type: 'web' | 'mobile' | 'whatsapp' | 'instagram' | 'email' | 'bot';
};

export type ArchitectureConfig = {
  id: string;
  company: string;
  companyEn: string;
  description: string;
  descriptionEn: string;
  nodes: Node[];
  edges: Edge[];
};
