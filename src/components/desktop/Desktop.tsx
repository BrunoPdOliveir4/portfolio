'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { DesktopIcon } from './DesktopIcon';
import { AppWindow } from './AppWindow';
import { AppContent } from './AppContent';
import { BrowserApp } from './BrowserApp';
import { useDesktop } from './useDesktop';
import { desktopApps, allDockApps, browserApp } from './apps';
import { Terminal } from '@/components/terminal/Terminal';

type Props = {
  onSwitchToTerminal: () => void;
};

const allAppsLookup = [...desktopApps, browserApp, { id: 'terminal', name: 'Terminal', icon: '>_', command: '' }];

export function Desktop({ onSwitchToTerminal }: Props) {
  const {
    windows,
    openApp,
    closeWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximize,
    moveWindow,
    resizeWindow,
  } = useDesktop();

  const focusedWindow = useMemo(() => {
    const visible = windows.filter((w) => !w.isMinimized);
    if (visible.length === 0) return null;
    return visible.reduce((a, b) => (a.zIndex > b.zIndex ? a : b));
  }, [windows]);

  const focusedAppName = useMemo(() => {
    if (!focusedWindow) return 'Finder';
    const app = allAppsLookup.find((a) => a.id === focusedWindow.appId);
    return app?.name || 'Finder';
  }, [focusedWindow]);

  const openAppIds = useMemo(
    () => Array.from(new Set(windows.map((w) => w.appId))),
    [windows],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex flex-col bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900"
    >
      {/* Wallpaper noise texture */}
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC43NSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWx0ZXI9InVybCgjbikiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-50" />

      <MenuBar focusedAppName={focusedAppName} onBackToSite={onSwitchToTerminal} />

      {/* Desktop icons area */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute top-6 right-6 grid grid-cols-1 gap-2">
          {desktopApps.map((app) => (
            <DesktopIcon key={app.id} app={app} onOpen={openApp} />
          ))}
        </div>

        {/* App windows */}
        {windows.map((win) => {
          if (win.appId === 'terminal') {
            return (
              <AppWindow
                key={win.id}
                window={win}
                title="Terminal"
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                onToggleMaximize={() => toggleMaximize(win.id)}
                onFocus={() => focusWindow(win.id)}
                onMove={(pos) => moveWindow(win.id, pos)}
                onResize={(size) => resizeWindow(win.id, size)}
              >
                <div className="h-full -m-4">
                  <Terminal embedded />
                </div>
              </AppWindow>
            );
          }

          if (win.appId === 'browser') {
            return (
              <AppWindow
                key={win.id}
                window={win}
                title="Browser"
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                onToggleMaximize={() => toggleMaximize(win.id)}
                onFocus={() => focusWindow(win.id)}
                onMove={(pos) => moveWindow(win.id, pos)}
                onResize={(size) => resizeWindow(win.id, size)}
              >
                <BrowserApp />
              </AppWindow>
            );
          }

          const app = desktopApps.find((a) => a.id === win.appId);
          if (!app) return null;

          return (
            <AppWindow
              key={win.id}
              window={win}
              title={app.name}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onToggleMaximize={() => toggleMaximize(win.id)}
              onFocus={() => focusWindow(win.id)}
              onMove={(pos) => moveWindow(win.id, pos)}
              onResize={(size) => resizeWindow(win.id, size)}
            >
              <AppContent appId={app.id} />
            </AppWindow>
          );
        })}
      </div>

      <Dock apps={allDockApps} openAppIds={openAppIds} onOpen={openApp} />
    </motion.div>
  );
}
