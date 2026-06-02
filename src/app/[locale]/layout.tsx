import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/i18n/config';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { IntlProvider } from '@/components/providers/IntlProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import { HtmlLang } from '@/components/seo/HtmlLang';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: { locale: string };
};

function isLocale(locale: string): locale is Locale {
  return routing.locales.includes(locale as Locale);
}

// Origin only — Next prepends basePath to generated asset URLs (e.g. the OG
// image), so keeping `/portfolio` out of metadataBase avoids double-prefixing.
const SITE_ORIGIN = 'https://brunopdoliveir4.github.io';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

// Static OG image lives in public/ so GitHub Pages serves it with the correct
// image/png content-type (an extensionless dynamic route is served as
// octet-stream and rejected by some scrapers like LinkedIn).
const ogImage = {
  url: `${basePath}/opengraph-image.png`,
  width: 1200,
  height: 630,
  alt: 'Bruno Pedroso — Back-End Engineer',
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const path = `${basePath}/${locale}`;

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: path,
      languages: {
        pt: `${basePath}/pt`,
        en: `${basePath}/en`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: path,
      siteName: 'Bruno Pedroso',
      locale,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [ogImage.url],
    },
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!isLocale(locale)) {
    notFound();
  }

  // Enables next-intl static rendering for this locale during export.
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <ThemeProvider>
      <IntlProvider locale={locale} messages={messages}>
        <HtmlLang locale={locale} />
        <JsonLd locale={locale} />
        {children}
      </IntlProvider>
    </ThemeProvider>
  );
}
