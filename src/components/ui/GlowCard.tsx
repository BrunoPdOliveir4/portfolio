import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export function GlowCard({ children, className, hover = true }: Props) {
  return (
    <div
      className={cn(
        'relative rounded-lg border border-border bg-card p-6',
        'dark:bg-zinc-900/50 dark:border-zinc-800',
        hover && 'transition-all duration-300 hover:border-emerald-500/50 dark:hover:border-emerald-400/30 hover:shadow-lg dark:hover:shadow-emerald-500/5',
        className
      )}
    >
      {children}
    </div>
  );
}
