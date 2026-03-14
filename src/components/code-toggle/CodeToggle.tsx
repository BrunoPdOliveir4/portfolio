'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CodeBlock } from './CodeBlock';
import { GlowCard } from '@/components/ui/GlowCard';
import { cn } from '@/lib/utils';

type CodeSample = {
  title: string;
  typescript: string;
  python: string;
};

type Props = {
  samples: CodeSample[];
};

export function CodeToggle({ samples }: Props) {
  const t = useTranslations('skills');
  const [lang, setLang] = useState<'typescript' | 'python'>('typescript');
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSample = samples[activeIndex];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-mono font-bold text-muted-foreground">
          {t('codeToggle')}
        </h3>
        <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800">
          {(['typescript', 'python'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={cn(
                'px-3 py-1 text-xs font-mono rounded transition-all',
                lang === l
                  ? 'bg-white dark:bg-zinc-700 text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {l === 'typescript' ? 'TypeScript' : 'Python'}
            </button>
          ))}
        </div>
      </div>

      {/* Sample tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {samples.map((sample, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              'px-3 py-1.5 text-xs font-mono rounded-md border whitespace-nowrap transition-all',
              activeIndex === i
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                : 'border-border text-muted-foreground hover:text-foreground'
            )}
          >
            {sample.title}
          </button>
        ))}
      </div>

      <GlowCard className="p-0 overflow-hidden" hover={false}>
        {/* File tab */}
        <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-xs font-mono text-zinc-500">
          {activeSample.title}.{lang === 'typescript' ? 'ts' : 'py'}
        </div>
        <motion.div
          key={`${activeIndex}-${lang}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <CodeBlock
            code={lang === 'typescript' ? activeSample.typescript : activeSample.python}
            language={lang}
          />
        </motion.div>
      </GlowCard>
    </div>
  );
}
