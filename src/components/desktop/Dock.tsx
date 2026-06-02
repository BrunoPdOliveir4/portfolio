'use client';

import { motion } from 'framer-motion';
import type { DesktopApp } from '@/types/desktop';

type Props = {
  apps: DesktopApp[];
  openAppIds: string[];
  onOpen: (appId: string) => void;
};

const systemApps = new Set(['browser', 'terminal']);

export function Dock({ apps, openAppIds, onOpen }: Props) {
  const firstSystemIndex = apps.findIndex((a) => systemApps.has(a.id));

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-end gap-1 px-2 py-1.5 bg-zinc-800/60 backdrop-blur-2xl border border-zinc-700/50 rounded-2xl shadow-2xl">
        {apps.map((app, i) => (
          <div key={app.id} className="flex items-end">
            {i === firstSystemIndex && i > 0 && (
              <div className="w-px h-8 bg-zinc-600/50 mx-1" />
            )}
            <motion.button
              whileHover={{ scale: 1.3, y: -8 }}
              whileTap={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              onClick={() => onOpen(app.id)}
              className="relative flex flex-col items-center group"
            >
              <span className="absolute -top-8 px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg border border-zinc-700">
                {app.name}
              </span>
              <span className="text-3xl leading-none p-1.5 rounded-xl bg-zinc-700/30 hover:bg-zinc-700/50 transition-colors">
                {app.id === 'terminal' ? (
                  <span className="text-lg font-bold text-emerald-400 flex items-center justify-center w-7 h-7">{'>_'}</span>
                ) : (
                  app.icon
                )}
              </span>
              {openAppIds.includes(app.id) && (
                <div className="w-1 h-1 rounded-full bg-zinc-400 mt-0.5" />
              )}
            </motion.button>
          </div>
        ))}
      </div>
    </div>
  );
}
