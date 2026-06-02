'use client';

import { motion } from 'framer-motion';
import type { DesktopApp } from '@/types/desktop';

type Props = {
  app: DesktopApp;
  onOpen: (appId: string) => void;
};

export function DesktopIcon({ app, onOpen }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onDoubleClick={() => onOpen(app.id)}
      className="flex flex-col items-center gap-1.5 w-20 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-default select-none"
    >
      <span className="text-4xl leading-none drop-shadow-lg">{app.icon}</span>
      <span className="text-[11px] text-white font-medium text-center leading-tight drop-shadow-md truncate w-full">
        {app.name}
      </span>
    </motion.button>
  );
}
