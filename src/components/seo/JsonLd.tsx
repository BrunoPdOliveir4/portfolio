import { cv } from '@/data/cv';

const SITE_URL = 'https://brunopdoliveir4.github.io/portfolio';

/**
 * Person structured data so search engines (and LinkedIn/Google rich results)
 * recognize this as a professional's profile page.
 */
export function JsonLd({ locale }: { locale: string }) {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: cv.name,
    jobTitle: cv.titleEn,
    url: `${SITE_URL}/${locale}`,
    email: `mailto:${cv.contact.email}`,
    sameAs: [
      `https://github.com/${cv.contact.github}`,
      `https://www.linkedin.com/in/${cv.contact.linkedin}`,
    ],
    knowsAbout: cv.skills.flatMap((group) => group.skills),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bertioga',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- trusted, build-time structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
    />
  );
}
