'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

type Props = {
  name: string;
  level: number; // 0-100
};

export function SkillBar({ name, level }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm font-mono text-foreground">{name}</span>
        <span className="text-xs text-muted-foreground font-mono">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
        />
      </div>
    </div>
  );
}
