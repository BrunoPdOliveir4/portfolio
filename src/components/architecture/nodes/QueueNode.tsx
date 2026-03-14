import { Handle, Position } from '@xyflow/react';

const icons: Record<string, string> = {
  rabbitmq: '🐰',
  sqs: '📨',
  pubsub: '📡',
};

export function QueueNode({ data }: { data: any }) {
  return (
    <div className="px-4 py-3 rounded-lg border-2 border-orange-300 dark:border-orange-600 bg-orange-50 dark:bg-orange-950/30 shadow-md min-w-[120px]">
      <Handle type="target" position={Position.Left} className="!bg-orange-500" />
      <div className="flex items-center gap-2">
        <span className="text-lg">{icons[data.type] || '📨'}</span>
        <div className="text-sm font-bold text-foreground">{data.label}</div>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-orange-500" />
    </div>
  );
}
