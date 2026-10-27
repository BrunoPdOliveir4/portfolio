import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { ProjectCard } from './ProjectCard';
import { cv } from '@/data/cv';

const featuredProjects = cv.projects.filter((project) => project.featured);

export function ProjectsSection() {
  const t = useTranslations('projects');

  return (
    <Section id="projects" title={t('title')}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
