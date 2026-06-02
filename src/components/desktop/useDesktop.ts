'use client';

import { useState, useCallback } from 'react';
import type { DesktopWindow } from '@/types/desktop';

let windowId = 0;
let topZ = 10;

const DEFAULT_SIZE = { width: 560, height: 400 };
const MIN_SIZE = { width: 320, height: 200 };

function centerPosition(index: number) {
  return {
    x: 120 + index * 30,
    y: 80 + index * 30,
  };
}

export function useDesktop() {
  const [windows, setWindows] = useState<DesktopWindow[]>([]);

  const openApp = useCallback((appId: string) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.appId === appId && !w.isMinimized);
      if (existing) {
        topZ++;
        return prev.map((w) =>
          w.id === existing.id ? { ...w, zIndex: topZ, isMinimized: false } : w,
        );
      }

      const minimized = prev.find((w) => w.appId === appId && w.isMinimized);
      if (minimized) {
        topZ++;
        return prev.map((w) =>
          w.id === minimized.id ? { ...w, isMinimized: false, zIndex: topZ } : w,
        );
      }

      topZ++;
      const size = appId === 'browser'
        ? { width: 900, height: 600 }
        : DEFAULT_SIZE;

      const newWindow: DesktopWindow = {
        id: `win-${++windowId}`,
        appId,
        position: centerPosition(prev.length),
        size,
        isMaximized: false,
        isMinimized: false,
        zIndex: topZ,
      };
      return [...prev, newWindow];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
    topZ++;
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: topZ } : w)),
    );
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
    );
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w,
      ),
    );
  }, []);

  const moveWindow = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position } : w)),
    );
  }, []);

  const resizeWindow = useCallback((id: string, size: { width: number; height: number }) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              size: {
                width: Math.max(size.width, MIN_SIZE.width),
                height: Math.max(size.height, MIN_SIZE.height),
              },
            }
          : w,
      ),
    );
  }, []);

  const isAppOpen = useCallback(
    (appId: string) => windows.some((w) => w.appId === appId),
    [windows],
  );

  return {
    windows,
    openApp,
    closeWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximize,
    moveWindow,
    resizeWindow,
    isAppOpen,
  };
}
