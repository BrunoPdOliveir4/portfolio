import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { IntlProvider } from '@/components/providers/IntlProvider';

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
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
        {children}
      </IntlProvider>
    </ThemeProvider>
  );
}
