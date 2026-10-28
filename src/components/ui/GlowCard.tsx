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
        hover && 'transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/50 dark:hover:border-brand-400/30 hover:shadow-lg dark:hover:shadow-brand-500/10',
        className
      )}
    >
      {children}
    </div>
  );
}
