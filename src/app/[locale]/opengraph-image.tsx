import { ImageResponse } from 'next/og';
import { routing } from '@/i18n/routing';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Bruno Pedroso — Back-End Engineer';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Terminal-styled social share card, generated at build time for the static
// export. This is the first thing a recruiter sees when the link is shared.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#09090b',
          padding: 64,
          fontFamily: 'monospace',
        }}
      >
        {/* window chrome */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 48 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: '#ef4444' }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: '#eab308' }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: '#22c55e' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', fontSize: 40, color: '#52525b' }}>
          <span style={{ color: '#34d399' }}>bruno@portfolio</span>
          <span style={{ margin: '0 8px' }}>:</span>
          <span style={{ color: '#60a5fa' }}>~</span>
          <span style={{ margin: '0 12px' }}>$</span>
          <span style={{ color: '#e4e4e7' }}>whoami</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 40 }}>
          <div style={{ fontSize: 96, fontWeight: 700, color: '#fafafa', lineHeight: 1.1 }}>
            Bruno Pedroso
          </div>
          <div style={{ fontSize: 40, color: '#a1a1aa', marginTop: 16 }}>
            Back-End Engineer
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, marginTop: 'auto', flexWrap: 'wrap' }}>
          {['TypeScript', 'Python', 'Distributed Systems', 'AI Orchestration'].map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: 28,
                color: '#34d399',
                border: '1px solid #34d39955',
                borderRadius: 10,
                padding: '8px 20px',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
