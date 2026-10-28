import { useId } from 'react';
import { cn } from '@/lib/utils';

const MINT = '#5ef2a6';
const WHITE = '#f4f4f5';
const KEYHOLE = '#050807';

type Props = {
  className?: string;
  /** Soft mint glow around the "P"; turn off at favicon-like sizes. */
  glow?: boolean;
  /** Accessible name; pass `null` when the mark sits inside a labelled link. */
  label?: string | null;
};

/**
 * The "BP" brand mark: a white "B" whose stem is a server rack, joined to a
 * mint "P" that holds a keyhole shield and circuit traces (backend, security,
 * AI). Inline SVG so it stays sharp at any size and needs no network request.
 */
export function BrandMark({ className, glow = true, label = 'Bruno Pedroso' }: Props) {
  const id = useId();
  const glowId = `${id}-glow`;
  const metalId = `${id}-metal`;

  return (
    <svg
      viewBox="6 8 190 148"
      className={cn('h-auto', className)}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    >
      <defs>
        <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={metalId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={WHITE} />
          <stop offset="1" stopColor="#a1a1aa" />
        </linearGradient>
      </defs>

      {/* B: outline whose left stem gives way to three server bars */}
      <path
        d="M22 46 V20 H80 L98 38 V58 L86 72 L102 86 V120 L84 140 H22 V114 M86 72 H58"
        fill="none"
        stroke={WHITE}
        strokeWidth="14"
        strokeLinejoin="miter"
      />
      <rect x="15" y="54" width="48" height="10" fill={`url(#${metalId})`} />
      <rect x="15" y="72" width="40" height="10" fill={`url(#${metalId})`} />
      <rect x="15" y="90" width="48" height="10" fill={`url(#${metalId})`} />
      <g fill={MINT}>
        <circle cx="22" cy="59" r="2.6" />
        <circle cx="30" cy="59" r="2.6" />
        <circle cx="22" cy="95" r="2.6" />
        <circle cx="30" cy="95" r="2.6" />
      </g>

      {/* P: mint octagonal bowl, keyhole shield and circuit traces */}
      <g filter={glow ? `url(#${glowId})` : undefined} stroke={MINT} fill="none" strokeLinejoin="miter">
        <path d="M114 64 V22 H158 L182 46 V84 L164 102" strokeWidth="10" />
        <path d="M150 48 L168 56 V70 Q168 84 150 92 Q132 84 132 70 V56 Z" fill={MINT} stroke="none" />
        <path d="M166 56 V70 L142 100 V124" strokeWidth="4" strokeLinecap="round" />
        <path d="M136 90 L120 108 V140" strokeWidth="4" strokeLinecap="round" />
        <circle cx="166" cy="50" r="5" strokeWidth="3.5" />
        <circle cx="142" cy="130" r="6.5" fill={MINT} stroke="none" />
        <circle cx="120" cy="146" r="5" strokeWidth="3.5" />
      </g>
      <circle cx="150" cy="66" r="5" fill={KEYHOLE} />
      <path d="M147.5 68 H152.5 L154 80 H146 Z" fill={KEYHOLE} />
    </svg>
  );
}
