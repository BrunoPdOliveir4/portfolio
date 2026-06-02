'use client';

import { useEffect, useState } from 'react';

type Props = {
  focusedAppName?: string;
  onBackToSite: () => void;
};

export function MenuBar({ focusedAppName, onBackToSite }: Props) {
  const [time, setTime] = useState('');

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
      );
    }
    updateTime();
    const interval = setInterval(updateTime, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between h-7 px-4 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800/50 text-xs text-zinc-300 select-none z-50">
      <div className="flex items-center gap-4">
        <button
          onClick={onBackToSite}
          className="text-sm font-medium hover:text-white transition-colors"
          title="Back to site"
        >

        </button>
        <span className="font-semibold">{focusedAppName || 'Finder'}</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onBackToSite}
          className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          Back to Site
        </button>
        <span className="text-zinc-400">{time}</span>
      </div>
    </div>
  );
}
