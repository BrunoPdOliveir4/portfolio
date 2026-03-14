import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

type Props = {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, title, subtitle, children, className }: Props) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 md:py-24 px-4 md:px-8 max-w-6xl mx-auto',
        className
      )}
    >
      {title && (
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-mono">
            <span className="text-emerald-500 dark:text-emerald-400">{'>'}</span>{' '}
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-muted-foreground text-sm md:text-base">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
