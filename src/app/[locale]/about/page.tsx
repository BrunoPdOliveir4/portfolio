import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AboutView } from '@/components/about/AboutView';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about' });
  return pageMetadata({ locale, path: '/about', title: t('title'), description: t('metaDescription') });
}

export default function AboutPage({ params: { locale } }: Props) {
  setRequestLocale(locale);

  return (
    <main className="pt-14">
      <AboutView />
    </main>
  );
}
