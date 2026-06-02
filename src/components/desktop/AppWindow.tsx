'use client';

import { useRef, useCallback, useState, type ReactNode, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DesktopWindow } from '@/types/desktop';

type Props = {
  window: DesktopWindow;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onFocus: () => void;
  onMove: (pos: { x: number; y: number }) => void;
  onResize: (size: { width: number; height: number }) => void;
};

type ResizeEdge = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export function AppWindow({
  window: win,
  title,
  children,
  onClose,
  onMinimize,
  onToggleMaximize,
  onFocus,
  onMove,
  onResize,
}: Props) {
  const dragRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  const handleDragStart = useCallback(
    (e: MouseEvent) => {
      if (win.isMaximized) return;
      e.preventDefault();
      onFocus();
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        originX: win.position.x,
        originY: win.position.y,
      };

      const handleMouseMove = (ev: globalThis.MouseEvent) => {
        if (!dragRef.current) return;
        const dx = ev.clientX - dragRef.current.startX;
        const dy = ev.clientY - dragRef.current.startY;
        onMove({
          x: dragRef.current.originX + dx,
          y: dragRef.current.originY + dy,
        });
      };

      const handleMouseUp = () => {
        dragRef.current = null;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [win.isMaximized, win.position, onFocus, onMove],
  );

  const handleResizeStart = useCallback(
    (e: MouseEvent, edge: ResizeEdge) => {
      if (win.isMaximized) return;
      e.preventDefault();
      e.stopPropagation();
      onFocus();
      setIsResizing(true);

      const startX = e.clientX;
      const startY = e.clientY;
      const originW = win.size.width;
      const originH = win.size.height;
      const originX = win.position.x;
      const originY = win.position.y;

      const handleMouseMove = (ev: globalThis.MouseEvent) => {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;

        let newW = originW;
        let newH = originH;
        let newX = originX;
        let newY = originY;

        if (edge.includes('e')) newW = originW + dx;
        if (edge.includes('w')) { newW = originW - dx; newX = originX + dx; }
        if (edge.includes('s')) newH = originH + dy;
        if (edge.includes('n')) { newH = originH - dy; newY = originY + dy; }

        const clampedW = Math.max(newW, 320);
        const clampedH = Math.max(newH, 200);

        if (edge.includes('w') && clampedW !== newW) newX = originX + originW - 320;
        if (edge.includes('n') && clampedH !== newH) newY = originY + originH - 200;

        onResize({ width: clampedW, height: clampedH });
        onMove({ x: newX, y: newY });
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [win.isMaximized, win.size, win.position, onFocus, onResize, onMove],
  );

  const edgeSize = 5;

  const edges: { edge: ResizeEdge; style: React.CSSProperties; cursor: string }[] = [
    { edge: 'n', cursor: 'ns-resize', style: { top: 0, left: edgeSize, right: edgeSize, height: edgeSize } },
    { edge: 's', cursor: 'ns-resize', style: { bottom: 0, left: edgeSize, right: edgeSize, height: edgeSize } },
    { edge: 'e', cursor: 'ew-resize', style: { right: 0, top: edgeSize, bottom: edgeSize, width: edgeSize } },
    { edge: 'w', cursor: 'ew-resize', style: { left: 0, top: edgeSize, bottom: edgeSize, width: edgeSize } },
    { edge: 'nw', cursor: 'nwse-resize', style: { top: 0, left: 0, width: edgeSize * 2, height: edgeSize * 2 } },
    { edge: 'ne', cursor: 'nesw-resize', style: { top: 0, right: 0, width: edgeSize * 2, height: edgeSize * 2 } },
    { edge: 'sw', cursor: 'nesw-resize', style: { bottom: 0, left: 0, width: edgeSize * 2, height: edgeSize * 2 } },
    { edge: 'se', cursor: 'nwse-resize', style: { bottom: 0, right: 0, width: edgeSize * 2, height: edgeSize * 2 } },
  ];

  return (
    <AnimatePresence>
      {!win.isMinimized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onMouseDown={onFocus}
          className="absolute"
          style={
            win.isMaximized
              ? { inset: '28px 0 52px 0', zIndex: win.zIndex }
              : {
                  left: win.position.x,
                  top: win.position.y,
                  width: win.size.width,
                  height: win.size.height,
                  zIndex: win.zIndex,
                }
          }
        >
          {/* Resize handles */}
          {!win.isMaximized && edges.map(({ edge, style, cursor }) => (
            <div
              key={edge}
              onMouseDown={(e) => handleResizeStart(e, edge)}
              className="absolute z-10"
              style={{ ...style, cursor }}
            />
          ))}

          <div className="flex flex-col h-full rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900 shadow-2xl shadow-black/40">
            {/* Title bar */}
            <div
              onMouseDown={handleDragStart}
              onDoubleClick={onToggleMaximize}
              className="flex items-center gap-2 px-3 py-2 bg-zinc-800 border-b border-zinc-700/50 cursor-default select-none shrink-0"
            >
              <div className="flex gap-1.5">
                <button
                  onClick={(e) => { e.stopPropagation(); onClose(); }}
                  className="group w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center"
                >
                  <svg className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 8 8" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 1l6 6M7 1l-6 6" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                  className="group w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors flex items-center justify-center"
                >
                  <svg className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 8 8" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 4h6" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onToggleMaximize(); }}
                  className="group w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors flex items-center justify-center"
                >
                  <svg className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 8 8" stroke="currentColor" strokeWidth="1.5" fill="none">
                    {win.isMaximized ? (
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
              <span className="flex-1 text-center text-xs text-zinc-400 font-medium truncate">
                {title}
              </span>
              <div className="w-[52px]" />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-zinc-700">
              {/* Overlay to prevent iframe from capturing mouse during resize/drag */}
              {isResizing && (
                <div className="absolute inset-0 z-20" />
              )}
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
