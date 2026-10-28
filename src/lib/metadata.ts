import type { Metadata } from 'next';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

// Static OG image lives in public/ so GitHub Pages serves it with the correct
// image/png content-type (an extensionless dynamic route is served as
// octet-stream and rejected by some scrapers like LinkedIn).
export const ogImage = {
  url: `${basePath}/opengraph-image.png`,
  width: 1200,
  height: 630,
  alt: 'Bruno Pedroso — Back-End Engineer',
};

type PageMetadataInput = {
  locale: string;
  /** Path after the locale, starting with a slash (e.g. "/about"). */
  path: string;
  title: string;
  description: string;
};

/**
 * Metadata for a sub-page: its own title, description, canonical URL and
 * PT/EN alternates. Next replaces (not merges) nested openGraph objects, so
 * the shared fields are repeated here; metadataBase comes from the layout.
 */
export function pageMetadata({ locale, path, title, description }: PageMetadataInput): Metadata {
  const url = `${basePath}/${locale}${path}`;

  return {
    title: `${title} — Bruno Pedroso`,
    description,
    alternates: {
      canonical: url,
      languages: {
        pt: `${basePath}/pt${path}`,
        en: `${basePath}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Bruno Pedroso',
      locale,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
  };
}
