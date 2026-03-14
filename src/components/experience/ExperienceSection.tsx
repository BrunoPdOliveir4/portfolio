import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { ExperienceCard } from './ExperienceCard';
import { cv } from '@/data/cv';

export function ExperienceSection() {
  const t = useTranslations('experience');

  return (
    <Section id="experience" title={t('title')}>
      <div className="relative md:ml-8 md:border-l-2 md:border-zinc-200 dark:md:border-zinc-800 space-y-8 md:pl-8">
        {cv.experience.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </Section>
  );
}
