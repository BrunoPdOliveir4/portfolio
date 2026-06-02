'use client';

import { useState, useMemo, type KeyboardEvent, type RefObject } from 'react';
import { getCommandSuggestions } from './commands';

type Props = {
  onSubmit: (input: string) => void;
  onNavigateHistory: (direction: 'up' | 'down') => string;
  inputRef: RefObject<HTMLInputElement>;
};

export function TerminalInput({ onSubmit, onNavigateHistory, inputRef }: Props) {
  const [value, setValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(() => getCommandSuggestions(value.trim()), [value]);
  const ghostText = suggestions.length > 0 ? suggestions[0].slice(value.trim().length) : '';

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit(value);
      setValue('');
      setShowSuggestions(false);
    } else if (e.key === 'ArrowRight' && ghostText && inputRef.current?.selectionStart === value.length) {
      e.preventDefault();
      setValue(suggestions[0]);
      setShowSuggestions(false);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length === 1) {
        setValue(suggestions[0]);
        setShowSuggestions(false);
      } else if (suggestions.length > 1) {
        setShowSuggestions(true);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = onNavigateHistory('up');
      setValue(prev);
      setShowSuggestions(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = onNavigateHistory('down');
      setValue(next);
      setShowSuggestions(false);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      onSubmit('clear');
      setValue('');
      setShowSuggestions(false);
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <div>
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
          {ghostText && (
            <span
              className="pointer-events-none absolute top-0 left-0 text-zinc-600 whitespace-pre"
              aria-hidden="true"
            >
              <span className="invisible">{value}</span>
              {ghostText}
            </span>
          )}
        </div>
      </div>
      {showSuggestions && suggestions.length > 1 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 pl-4 font-mono text-sm text-zinc-500">
          {suggestions.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      )}
    </div>
  );
}
