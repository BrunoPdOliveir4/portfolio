'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useTerminal } from './useTerminal';
import { TerminalInput } from './TerminalInput';
import { TerminalOutput } from './TerminalOutput';
import { cn } from '@/lib/utils';

type TerminalMode = 'normal' | 'fullscreen' | 'minimized' | 'closed';

export function Terminal() {
  const t = useTranslations('terminal');
  const { lines, isBooting, runCommand, navigateHistory, finishBoot, focusInput, inputRef } =
    useTerminal();
  const scrollRef = useRef<HTMLDivElement>(null);
  const bootLines = [t('boot1'), t('boot2'), t('boot3'), '', t('boot4')];
  const [mode, setMode] = useState<TerminalMode>('normal');

  // Boot sequence
  useEffect(() => {
    if (!isBooting) return;
    const timeout = setTimeout(() => finishBoot(), 2000);
    return () => clearTimeout(timeout);
  }, [isBooting, finishBoot]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, isBooting]);

  // Escape to exit fullscreen
  useEffect(() => {
    if (mode !== 'fullscreen') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMode('normal');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [mode]);

  if (mode === 'closed') {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setMode('normal')}
        className="px-6 py-3 rounded-lg border border-zinc-700 bg-zinc-900 font-mono text-sm text-emerald-400 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all"
      >
        {'>'} reopen terminal
      </motion.button>
    );
  }

  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'relative overflow-hidden border border-zinc-700 dark:border-zinc-700 bg-zinc-950 shadow-2xl dark:shadow-emerald-500/5',
        mode === 'fullscreen'
          ? 'fixed inset-0 z-[100] rounded-none'
          : 'w-full max-w-3xl mx-auto rounded-lg',
      )}
      onClick={focusInput}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
        <div className="flex gap-1.5">
          <button
            onClick={(e) => { e.stopPropagation(); setMode('closed'); }}
            className="group w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center"
            aria-label="Close terminal"
          >
            <svg className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 8 8" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 1l6 6M7 1l-6 6" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setMode('minimized'); }}
            className="group w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors flex items-center justify-center"
            aria-label="Minimize terminal"
          >
            <svg className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 8 8" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 4h6" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setMode(mode === 'fullscreen' ? 'normal' : 'fullscreen'); }}
            className="group w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors flex items-center justify-center"
            aria-label="Toggle fullscreen"
          >
            <svg className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 8 8" stroke="currentColor" strokeWidth="1.5" fill="none">
              {mode === 'fullscreen' ? (
                <>
                  <path d="M5 1v2h2" />
                  <path d="M3 7V5H1" />
                </>
              ) : (
                <>
                  <path d="M1 3V1h2" />
                  <path d="M7 5v2H5" />
                </>
              )}
            </svg>
          </button>
        </div>
        <span className="text-xs text-zinc-500 font-mono ml-2">
          bruno@portfolio — zsh
        </span>
      </div>

      {/* Terminal body */}
      <AnimatePresence initial={false}>
        {mode !== 'minimized' && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div
              ref={scrollRef}
              className={cn(
                'p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700',
                mode === 'fullscreen' ? 'h-[calc(100vh-41px)]' : 'h-[400px] md:h-[480px]',
              )}
            >
              {/* Boot sequence */}
              <AnimatePresence>
                {isBooting && (
                  <div className="space-y-1">
                    {bootLines.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.3 }}
                        className="font-mono text-sm text-emerald-400"
                      >
                        {line}
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>

              {/* Command output */}
              {!isBooting && (
                <>
                  <div className="mb-2 font-mono text-sm text-emerald-400">
                    {bootLines.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                  <TerminalOutput lines={lines} />
                  <div className="mt-3">
                    <TerminalInput
                      onSubmit={runCommand}
                      onNavigateHistory={navigateHistory}
                      inputRef={inputRef as any}
                    />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CRT scanline overlay (dark mode only) */}
      <div className="pointer-events-none absolute inset-0 hidden dark:block bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
    </motion.div>
  );
}
