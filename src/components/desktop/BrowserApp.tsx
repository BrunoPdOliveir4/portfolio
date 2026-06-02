'use client';

import { useState, useCallback, type KeyboardEvent } from 'react';

const BOOKMARKS = [
  { name: 'GitHub', url: 'https://github.com/BrunoPdOliveir4' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/b-pedroso' },
];

function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/.test(trimmed)) return `https://${trimmed}`;
  return `https://www.google.com/search?igu=1&q=${encodeURIComponent(trimmed)}`;
}

export function BrowserApp() {
  const [url, setUrl] = useState('https://github.com/BrunoPdOliveir4');
  const [inputValue, setInputValue] = useState('https://github.com/BrunoPdOliveir4');
  const [history, setHistory] = useState<string[]>(['https://github.com/BrunoPdOliveir4']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useCallback((newUrl: string) => {
    const normalized = normalizeUrl(newUrl);
    if (!normalized) return;
    setUrl(normalized);
    setInputValue(normalized);
    setIsLoading(true);
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), normalized]);
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  const goBack = useCallback(() => {
    if (historyIndex <= 0) return;
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    setUrl(history[newIndex]);
    setInputValue(history[newIndex]);
    setIsLoading(true);
  }, [history, historyIndex]);

  const goForward = useCallback(() => {
    if (historyIndex >= history.length - 1) return;
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    setUrl(history[newIndex]);
    setInputValue(history[newIndex]);
    setIsLoading(true);
  }, [history, historyIndex]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(inputValue);
    }
  };

  const reload = () => {
    setIsLoading(true);
    setUrl((prev) => prev);
    // Force iframe reload by briefly clearing src
    const iframe = document.querySelector<HTMLIFrameElement>('#browser-iframe');
    if (iframe) {
      const src = iframe.src;
      iframe.src = '';
      iframe.src = src;
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-900 -m-4">
      {/* Browser toolbar */}
      <div className="flex flex-col border-b border-zinc-700/50 shrink-0">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800">
          {/* Navigation buttons */}
          <div className="flex gap-0.5">
            <button
              onClick={goBack}
              disabled={historyIndex <= 0}
              className="w-7 h-7 rounded flex items-center justify-center text-zinc-500 hover:bg-zinc-700 hover:text-zinc-300 transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-500"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2L4 8l6 6" />
              </svg>
            </button>
            <button
              onClick={goForward}
              disabled={historyIndex >= history.length - 1}
              className="w-7 h-7 rounded flex items-center justify-center text-zinc-500 hover:bg-zinc-700 hover:text-zinc-300 transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-500"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2l6 6-6 6" />
              </svg>
            </button>
            <button
              onClick={reload}
              className="w-7 h-7 rounded flex items-center justify-center text-zinc-500 hover:bg-zinc-700 hover:text-zinc-300 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 8a7 7 0 0113.3-3M15 8a7 7 0 01-13.3 3" />
                <path d="M14 1v4h-4M2 15v-4h4" />
              </svg>
            </button>
          </div>

          {/* URL bar */}
          <div className="flex-1 flex items-center bg-zinc-900 rounded-lg px-3 py-1.5 border border-zinc-700 focus-within:border-emerald-500/50 transition-colors">
            {isLoading ? (
              <div className="w-3 h-3 mr-2 shrink-0 border-2 border-zinc-600 border-t-emerald-400 rounded-full animate-spin" />
            ) : (
              <svg className="w-3 h-3 text-emerald-500 mr-2 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="7" width="10" height="7" rx="1" />
                <path d="M5 7V5a3 3 0 016 0v2" />
              </svg>
            )}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={(e) => e.target.select()}
              className="w-full bg-transparent text-xs text-zinc-300 outline-none placeholder:text-zinc-600"
              placeholder="Search or enter URL"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Bookmarks bar */}
        <div className="flex items-center gap-1 px-3 py-1 bg-zinc-800/50">
          {BOOKMARKS.map((bm) => (
            <button
              key={bm.name}
              onClick={() => navigate(bm.url)}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50 transition-colors"
            >
              <svg className="w-3 h-3 text-zinc-500" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="8" cy="8" r="6" />
                <path d="M2 8h12M8 2c-2 2-2 10 0 12M8 2c2 2 2 10 0 12" />
              </svg>
              {bm.name}
            </button>
          ))}
        </div>
      </div>

      {/* Browser viewport */}
      <div className="flex-1 relative bg-white">
        <iframe
          id="browser-iframe"
          src={url}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          onLoad={() => setIsLoading(false)}
          title="Browser"
        />
      </div>
    </div>
  );
}
