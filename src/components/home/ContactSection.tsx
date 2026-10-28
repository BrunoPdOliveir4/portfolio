import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { cv } from '@/data/cv';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function ContactSection({ index }: { index?: number }) {
  const t = useTranslations('contact');

  return (
    <Section id="contact" title={t('title')} subtitle={t('subtitle')} index={index}>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${cv.contact.email}`}
          className="rounded-lg bg-brand-500 px-5 py-2.5 font-mono text-sm font-medium text-zinc-950 transition-colors hover:bg-brand-400"
        >
          {t('email')} — {cv.contact.email}
        </a>
        <a
          href={`https://www.linkedin.com/in/${cv.contact.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border px-5 py-2.5 font-mono text-sm text-muted-foreground transition-colors hover:border-brand-500/50 hover:text-foreground"
        >
          {t('linkedin')} ↗
        </a>
        <a
          href={`${basePath}/curriculum.pdf`}
          download="Bruno_Pedroso_Curriculum.pdf"
          className="rounded-lg border border-border px-5 py-2.5 font-mono text-sm text-muted-foreground transition-colors hover:border-brand-500/50 hover:text-foreground"
        >
          {t('downloadCv')} ↓
        </a>
      </div>
    </Section>
  );
}
