'use client';

import { useEffect, useRef } from 'react';

export function MouseSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      animationFrameId = requestAnimationFrame(() => {
        spotlight.style.setProperty('--x', `${e.clientX}px`);
        spotlight.style.setProperty('--y', `${e.clientY}px`);
        spotlight.style.opacity = '1';
      });
    };

    const handleMouseLeave = () => {
      spotlight.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-300"
      style={{
        background:
          'radial-gradient(600px circle at var(--x, -100px) var(--y, -100px), rgba(16, 185, 129, 0.06), transparent 40%)',
      }}
    />
  );
}
