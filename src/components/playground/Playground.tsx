'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Terminal } from '@/components/terminal/Terminal';
import { Desktop } from '@/components/desktop/Desktop';

/**
 * The interactive resume: a terminal that can switch into a full desktop
 * mode. Lives on its own page (/terminal) as an optional extra so the home
 * page stays quick to scan.
 */
export function Playground() {
  const [mode, setMode] = useState<'terminal' | 'desktop'>('terminal');

  if (mode === 'desktop') {
    return (
      <AnimatePresence mode="wait">
        <Desktop key="desktop" onSwitchToTerminal={() => setMode('terminal')} />
      </AnimatePresence>
    );
  }

  return <Terminal onToggleDesktop={() => setMode('desktop')} />;
}
