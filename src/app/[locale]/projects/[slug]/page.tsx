import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { CaseStudyView } from '@/components/case-study/CaseStudyView';
import { caseStudies, findCaseStudy } from '@/data/case-studies';
import { cv } from '@/data/cv';
import { pick } from '@/lib/cv-i18n';
import { pageMetadata } from '@/lib/metadata';
import { routing } from '@/i18n/routing';

type Props = { params: { locale: string; slug: string } };

// Returns both segments: `next dev` with `output: export` rejects a nested
// dynamic route whose params omit the parent's locale.
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    caseStudies.map((study) => ({ locale, slug: study.projectId })),
  );
}

function findProject(slug: string) {
  return cv.projects.find((project) => project.id === slug);
}

export function generateMetadata({ params: { locale, slug } }: Props): Metadata {
  const project = findProject(slug);
  if (!project) return {};
  return pageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: pick(locale, project.name, project.nameEn),
    description: pick(locale, project.description, project.descriptionEn),
  });
}

export default function CaseStudyPage({ params: { locale, slug } }: Props) {
  setRequestLocale(locale);
  const project = findProject(slug);
  const study = findCaseStudy(slug);
  if (!project || !study) notFound();

  const index = caseStudies.indexOf(study);
  const next = findProject(caseStudies[(index + 1) % caseStudies.length].projectId);

  return (
    <main className="pt-14">
      <CaseStudyView project={project} study={study} nextProject={next?.id === slug ? undefined : next} />
    </main>
  );
}
