import { Handle, Position } from '@xyflow/react';

const icons: Record<string, string> = {
  api: '⚡',
  worker: '⚙️',
  gateway: '🔒',
};

export function ServiceNode({ data }: { data: any }) {
  return (
    <div className="px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 shadow-md min-w-[160px]">
      <Handle type="target" position={Position.Left} className="!bg-emerald-500" />
      <div className="flex items-center gap-2">
        <span className="text-lg">{icons[data.icon] || '⚡'}</span>
        <div>
          <div className="text-sm font-bold text-foreground">{data.label}</div>
          <div className="text-xs text-muted-foreground">{data.description}</div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">{data.tech}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-emerald-500" />
    </div>
  );
}
