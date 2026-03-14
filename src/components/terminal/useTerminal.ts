'use client';

import { useState, useCallback, useRef } from 'react';
import { executeCommand } from './commands';
import type { TerminalLine } from '@/types/terminal';

let lineId = 0;

export function useTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isBooting, setIsBooting] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const addLine = useCallback((line: TerminalLine) => {
    setLines((prev) => [...prev, line]);
  }, []);

  const runCommand = useCallback(
    (input: string) => {
      const { command, output } = executeCommand(input);

      if (command === 'clear' || input.trim().toLowerCase() === 'clear') {
        setLines([]);
        return;
      }

      if (!command) return;

      const newLine: TerminalLine = {
        id: `line-${++lineId}`,
        command,
        output,
        timestamp: Date.now(),
      };

      addLine(newLine);
      setHistory((prev) => [command, ...prev]);
      setHistoryIndex(-1);
    },
    [addLine]
  );

  const navigateHistory = useCallback(
    (direction: 'up' | 'down') => {
      if (history.length === 0) return '';

      let newIndex: number;
      if (direction === 'up') {
        newIndex = Math.min(historyIndex + 1, history.length - 1);
      } else {
        newIndex = Math.max(historyIndex - 1, -1);
      }

      setHistoryIndex(newIndex);
      return newIndex >= 0 ? history[newIndex] : '';
    },
    [history, historyIndex]
  );

  const finishBoot = useCallback(() => {
    setIsBooting(false);
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return {
    lines,
    isBooting,
    runCommand,
    navigateHistory,
    finishBoot,
    focusInput,
    inputRef,
  };
}
