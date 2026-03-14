import { Handle, Position } from '@xyflow/react';

export function AIAgentNode({ data }: { data: any }) {
  return (
    <div className="px-4 py-3 rounded-lg border-2 border-purple-300 dark:border-purple-600 bg-purple-50 dark:bg-purple-950/30 shadow-md min-w-[140px]">
      <Handle type="target" position={Position.Left} className="!bg-purple-500" />
      <div className="flex items-center gap-2">
        <span className="text-lg">🤖</span>
        <div>
          <div className="text-sm font-bold text-foreground">{data.label}</div>
          <div className="text-xs text-muted-foreground">{data.model}</div>
          {data.protocol && (
            <div className="text-xs text-purple-600 dark:text-purple-400 font-mono mt-0.5">{data.protocol}</div>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-purple-500" />
    </div>
  );
}
