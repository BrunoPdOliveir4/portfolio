import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { IntlProvider } from '@/components/providers/IntlProvider';
import { JsonLd } from '@/components/seo/JsonLd';

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

type Props = {
  children: ReactNode;
  params: { locale: string };
};

// Origin only — Next prepends basePath to generated asset URLs (e.g. the OG
// image), so keeping `/portfolio` out of metadataBase avoids double-prefixing.
const SITE_ORIGIN = 'https://brunopdoliveir4.github.io';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const path = `${basePath}/${locale}`;

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: path,
      siteName: 'Bruno Pedroso',
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <ThemeProvider>
      <IntlProvider locale={locale} messages={messages}>
        <JsonLd locale={locale} />
        {children}
      </IntlProvider>
    </ThemeProvider>
  );
}
