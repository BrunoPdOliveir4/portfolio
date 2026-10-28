import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Playground } from '@/components/playground/Playground';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'terminalPage' });
  return pageMetadata({ locale, path: '/terminal', title: t('title'), description: t('description') });
}

function TerminalPageContent() {
  const t = useTranslations('terminalPage');

  return (
    <main className="pt-14">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <Link href="/" className="font-mono text-xs text-muted-foreground transition-colors hover:text-emerald-500">
          ← {t('back')}
        </Link>
        <h1 className="mt-6 text-2xl md:text-3xl font-bold font-mono">
          <span className="text-emerald-500">{'>_'}</span> {t('title')}
        </h1>
        <p className="mt-2 mb-8 font-mono text-sm text-muted-foreground">{t('hint')}</p>
        <Playground />
      </div>
    </main>
  );
}

export default function TerminalPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <TerminalPageContent />;
}
