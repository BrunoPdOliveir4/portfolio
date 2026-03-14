import { cn } from '@/lib/utils';

export function SkillChip({ name, highlighted }: { name: string; highlighted?: boolean }) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1 text-xs font-mono rounded-md border transition-all duration-200',
        highlighted
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
          : 'bg-zinc-100 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
      )}
    >
      {name}
    </span>
  );
}
