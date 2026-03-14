'use client';

import { motion } from 'framer-motion';
import type { TerminalLine, CommandOutput } from '@/types/terminal';

function formatAnsi(text: string): string {
  return text
    .replace(/\x1b\[32m/g, '<span class="text-emerald-400">')
    .replace(/\x1b\[0m/g, '</span>');
}

function OutputLine({ output }: { output: CommandOutput }) {
  const colorClass =
    output.type === 'error'
      ? 'text-red-400'
      : output.type === 'system'
      ? 'text-yellow-400'
      : 'text-zinc-300 dark:text-zinc-300';

  return (
    <div
      className={`whitespace-pre-wrap font-mono text-sm ${colorClass}`}
      dangerouslySetInnerHTML={{ __html: formatAnsi(output.content) }}
    />
  );
}

export function TerminalOutput({ lines }: { lines: TerminalLine[] }) {
  return (
    <div className="space-y-3">
      {lines.map((line) => (
        <motion.div
          key={line.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          {line.command && (
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-emerald-400">bruno@portfolio</span>
              <span className="text-zinc-500">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-zinc-500">$</span>
              <span className="text-zinc-200">{line.command}</span>
            </div>
          )}
          <div className="mt-1 ml-0">
            {line.output.map((out, i) => (
              <OutputLine key={i} output={out} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
