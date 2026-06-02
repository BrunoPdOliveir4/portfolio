'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Terminal } from '@/components/terminal/Terminal';
import { Desktop } from './Desktop';

export function HeroSection() {
  const [mode, setMode] = useState<'terminal' | 'desktop'>('terminal');

  if (mode === 'desktop') {
    return (
      <AnimatePresence mode="wait">
        <Desktop
          key="desktop"
          onSwitchToTerminal={() => setMode('terminal')}
        />
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 md:py-24">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-mono mb-2">
          <span className="text-emerald-500">{'>'}</span> Bruno Pedroso
        </h1>
        <p className="text-muted-foreground font-mono text-sm">
          Back-End Engineer · TypeScript · Python · Distributed Systems
        </p>
      </div>
      <Terminal onToggleDesktop={() => setMode('desktop')} />
    </div>
  );
}
