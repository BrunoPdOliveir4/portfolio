import { useLocale } from 'next-intl';
import { pick } from '@/lib/cv-i18n';
import type { ArchitectureStep } from '@/types/cv';

/**
 * Architecture as an ordered flow of boxes joined by labelled arrows:
 * horizontal on wide screens, vertical on phones. Plain HTML (an ordered
 * list) so it reflows and reads well with a screen reader.
 */
export function ArchitectureFlow({ steps }: { steps: ArchitectureStep[] }) {
  const locale = useLocale();

  return (
    <ol className="flex flex-col lg:flex-row">
      {steps.map((step, i) => {
        const via = pick(locale, step.via, step.viaEn);
        return (
          <li key={step.labelEn} className="flex flex-1 flex-col lg:flex-row">
            <div className="flex-1 rounded-lg border border-border bg-card dark:bg-zinc-900/60 p-4">
              <p aria-hidden="true" className="font-mono text-[10px] tracking-widest text-steel-500 dark:text-steel-400">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-1 font-mono text-sm font-bold text-foreground">{pick(locale, step.label, step.labelEn)}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {pick(locale, step.detail, step.detailEn)}
              </p>
            </div>
            {via && (
              <div className="flex shrink-0 flex-col items-center justify-center px-2 py-2 lg:w-24 lg:py-0">
                <span aria-hidden="true" className="font-mono text-emerald-500">
                  <span className="lg:hidden">↓</span>
                  <span className="hidden lg:inline">→</span>
                </span>
                <p className="mt-1 text-center font-mono text-[10px] leading-tight text-muted-foreground">
                  {via}
                </p>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
