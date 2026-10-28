import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

type Props = {
  id: string;
  title?: string;
  subtitle?: string;
  /** Section number shown as a `// 01` eyebrow above the title. */
  index?: number;
  children: ReactNode;
  className?: string;
};

export function Section({ id, title, subtitle, index, children, className }: Props) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-16 py-16 md:py-24 px-4 md:px-8 max-w-6xl mx-auto',
        className
      )}
    >
      {title && (
        <div className="mb-12">
          {index !== undefined && (
            <p className="mb-2 font-mono text-xs tracking-widest text-steel-500 dark:text-steel-400">
              {`// ${String(index).padStart(2, '0')}`}
            </p>
          )}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-mono">
            <span className="text-emerald-500 dark:text-emerald-400">{'>'}</span>{' '}
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-muted-foreground text-sm md:text-base">
              {subtitle}
            </p>
          )}
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-emerald-500/60 to-transparent" />
        </div>
      )}
      {children}
    </section>
  );
}
