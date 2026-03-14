'use client';

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ServiceNode, DatabaseNode, QueueNode, AIAgentNode, ClientNode } from './nodes';
import type { ArchitectureConfig } from '@/types/architecture';

const nodeTypes: NodeTypes = {
  serviceNode: ServiceNode,
  databaseNode: DatabaseNode,
  queueNode: QueueNode,
  aiAgentNode: AIAgentNode,
  clientNode: ClientNode,
};

export default function ReactFlowWrapper({ config }: { config: ArchitectureConfig }) {
  return (
    <div className="h-[400px] md:h-[500px] rounded-lg border border-border overflow-hidden bg-zinc-50 dark:bg-zinc-900/50">
      <ReactFlow
        nodes={config.nodes}
        edges={config.edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.3}
        maxZoom={2}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={20} size={1} />
        <Controls className="!bg-white dark:!bg-zinc-800 !border-border !shadow-lg" />
        <MiniMap
          className="!bg-zinc-100 dark:!bg-zinc-800 !border-border"
          nodeColor="#10b981"
          maskColor="rgba(0,0,0,0.1)"
        />
      </ReactFlow>
    </div>
  );
}
