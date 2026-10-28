import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { BrandMark } from '@/components/brand/BrandMark';
import { Wordmark } from '@/components/brand/Wordmark';
import { cv } from '@/data/cv';
import { pick } from '@/lib/cv-i18n';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const ctas = [
  { label: 'downloadCv', href: `${basePath}/curriculum.pdf`, download: true, primary: true },
  { label: 'LinkedIn', href: `https://www.linkedin.com/in/${cv.contact.linkedin}`, external: true },
  { label: 'GitHub', href: `https://github.com/${cv.contact.github}`, external: true },
  { label: 'Email', href: `mailto:${cv.contact.email}` },
] as const;

// Production figures from the NextIA experience in src/data/cv.ts.
const metrics = [
  { value: '~50', label: 'metricCompanies' },
  { value: '~6k', label: 'metricRequests' },
  { value: '<1 s', label: 'metricLatency' },
] as const;

export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Subtle grid backdrop, faded out towards the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(94,242,166,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(94,242,166,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28 md:grid md:grid-cols-[1fr_auto] md:gap-12">
        <div>
          <p className="font-mono text-sm text-muted-foreground">{t('greeting')}</p>
          <h1 className="mt-3 text-5xl md:text-7xl">
            <span className="sr-only">Bruno Pedroso</span>
            <span aria-hidden="true">
              <Wordmark />
            </span>
          </h1>
          {/* Items stay whole when the line wraps on small screens. */}
          <p className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs md:text-sm tracking-[0.3em] text-zinc-400">
            {t('tagline')
              .split(' · ')
              .map((item, i) => (
                <span key={item} className="whitespace-nowrap">
                  {i > 0 && <span aria-hidden="true" className="mr-3 text-brand-500">·</span>}
                  {item}
                </span>
              ))}
          </p>
          <p className="mt-8 text-xl md:text-2xl font-mono text-foreground">
            {pick(locale, cv.title, cv.titleEn)}
          </p>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            {t('pitch')}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {ctas.map((cta) => (
              <a
                key={cta.label}
                href={cta.href}
                {...('download' in cta ? { download: 'Bruno_Pedroso_Curriculum.pdf' } : {})}
                {...('external' in cta ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={
                  'primary' in cta
                    ? 'rounded-lg bg-brand-500 px-4 py-2 font-mono text-sm font-medium text-zinc-950 transition-colors hover:bg-brand-400'
                    : 'rounded-lg border border-border px-4 py-2 font-mono text-sm text-muted-foreground transition-colors hover:border-brand-500/50 hover:text-foreground'
                }
              >
                {'primary' in cta ? t('downloadCv') : cta.label}
              </a>
            ))}
        </div>

        <p className="mt-14 mb-3 font-mono text-xs tracking-widest text-zinc-500">
          {`// ${t('metricsTitle')}`}
        </p>
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-lg border border-border bg-card/60 dark:bg-zinc-900/40 px-4 py-3 backdrop-blur-sm">
              <dt className="sr-only">{t(metric.label)}</dt>
              <dd>
                <span className="block font-mono text-2xl font-bold text-brand-600 dark:text-brand-400">
                  {metric.value}
                </span>
                <span aria-hidden="true" className="mt-1 block text-xs text-muted-foreground">
                  {t(metric.label)}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <Link
          href="/terminal"
          className="mt-10 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-brand-500"
        >
          <span className="text-brand-500">{'>_'}</span>
          {t('openTerminal')} →
        </Link>
        </div>

        <div aria-hidden="true" className="hidden md:flex items-start justify-center pt-10">
          <BrandMark label={null} className="w-[300px] lg:w-[360px] drop-shadow-[0_0_40px_rgba(94,242,166,0.18)]" />
        </div>
      </div>
    </section>
  );
}
