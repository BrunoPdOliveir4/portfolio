import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { caseStudies } from '@/data/case-studies';

const SITE_URL = 'https://brunopdoliveir4.github.io/portfolio';

export const dynamic = 'force-static';

type Page = { path: string; priority: number };

const pages: Page[] = [
  { path: '', priority: 1 },
  ...caseStudies.map((study) => ({ path: `/projects/${study.projectId}`, priority: 0.8 })),
  { path: '/about', priority: 0.7 },
  { path: '/terminal', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${SITE_URL}/${locale}${page.path}`,
      changeFrequency: 'monthly' as const,
      // The default locale ranks a notch above its translation.
      priority: locale === routing.defaultLocale ? page.priority : Math.round(page.priority * 0.8 * 10) / 10,
    }))
  );
}
