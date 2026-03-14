'use client';

import { useState, type KeyboardEvent, type RefObject } from 'react';

type Props = {
  onSubmit: (input: string) => void;
  onNavigateHistory: (direction: 'up' | 'down') => string;
  inputRef: RefObject<HTMLInputElement>;
};

export function TerminalInput({ onSubmit, onNavigateHistory, inputRef }: Props) {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit(value);
      setValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = onNavigateHistory('up');
      setValue(prev);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = onNavigateHistory('down');
      setValue(next);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      onSubmit('clear');
      setValue('');
    }
  };

  return (
    <div className="flex items-center gap-2 font-mono text-sm">
      <span className="text-emerald-400 shrink-0">bruno@portfolio</span>
      <span className="text-zinc-500">:</span>
      <span className="text-blue-400">~</span>
      <span className="text-zinc-500">$</span>
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-zinc-200 outline-none caret-emerald-400"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
