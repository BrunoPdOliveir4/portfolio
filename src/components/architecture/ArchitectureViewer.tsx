'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { cn } from '@/lib/utils';
import { architectureConfigs } from '@/data/architecture-configs';

const ReactFlowWrapper = dynamic(() => import('./ReactFlowWrapper'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] md:h-[500px] rounded-lg border border-border bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
      <div className="text-sm text-muted-foreground font-mono animate-pulse">
        Loading diagram...
      </div>
    </div>
  ),
});

export function ArchitectureViewer() {
  const t = useTranslations('architecture');
  const [activeTab, setActiveTab] = useState(0);

  const config = architectureConfigs[activeTab];

  return (
    <Section id="architecture" title={t('title')} subtitle={t('subtitle')}>
      {/* Company tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {architectureConfigs.map((cfg, i) => (
          <button
            key={cfg.id}
            onClick={() => setActiveTab(i)}
            className={cn(
              'px-4 py-2 text-sm font-mono rounded-md border whitespace-nowrap transition-all',
              activeTab === i
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/20'
            )}
          >
            {cfg.company}
          </button>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 font-mono">
        {'// '}{config.descriptionEn}
      </p>

      {/* Diagram */}
      <ReactFlowWrapper config={config} />

      <p className="text-xs text-muted-foreground mt-3 text-center font-mono">
        {t('zoom')}
      </p>
    </Section>
  );
}
