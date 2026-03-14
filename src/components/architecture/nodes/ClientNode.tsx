import { Handle, Position } from '@xyflow/react';

const icons: Record<string, string> = {
  web: '🌐',
  mobile: '📱',
  whatsapp: '💬',
  instagram: '📸',
  email: '📧',
  bot: '🤖',
};

export function ClientNode({ data }: { data: any }) {
  return (
    <div className="px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800/50 shadow-md min-w-[100px]">
      <div className="flex items-center gap-2">
        <span className="text-lg">{icons[data.type] || '🌐'}</span>
        <div className="text-sm font-bold text-foreground">{data.label}</div>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-zinc-500" />
    </div>
  );
}
