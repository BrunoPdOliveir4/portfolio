'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { GlowCard } from '@/components/ui/GlowCard';
import { pick, formatPeriod } from '@/lib/cv-i18n';
import type { Experience } from '@/types/cv';

export function ExperienceCard({ experience }: { experience: Experience }) {
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations('experience');
  const locale = useLocale();

  const bullets = pick(locale, experience.bullets, experience.bulletsEn);
  const visibleBullets = expanded ? bullets : bullets.slice(0, 2);

  return (
    <GlowCard className="relative">
      {/* Timeline dot */}
      <div className="absolute -left-[41px] top-8 w-4 h-4 rounded-full bg-emerald-500 border-4 border-background dark:border-zinc-950 hidden md:block" />

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-3">
        <div>
          <h3 className="text-lg font-bold text-foreground">
            {pick(locale, experience.role, experience.roleEn)}
          </h3>
          <p className="text-emerald-500 dark:text-emerald-400 font-mono text-sm">
            {experience.company}
          </p>
        </div>
        <span className="text-sm text-muted-foreground font-mono shrink-0">
          {formatPeriod(experience.periodStart, experience.periodEnd, locale)}
        </span>
      </div>

      <ul className="space-y-2 mb-4">
        <AnimatePresence initial={false}>
          {visibleBullets.map((bullet, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm text-muted-foreground flex gap-2"
            >
              <span className="text-emerald-500 shrink-0 mt-1">▸</span>
              <span>{bullet}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {bullets.length > 2 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-mono text-emerald-500 hover:text-emerald-400 transition-colors"
        >
          {expanded ? `— ${t('showLess')}` : `+ ${t('showMore')} (${bullets.length - 2})`}
        </button>
      )}

      <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border dark:border-zinc-800">
        {experience.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 text-xs font-mono rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </GlowCard>
  );
}
