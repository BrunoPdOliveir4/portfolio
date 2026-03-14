import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { SkillChip } from './SkillChip';
import { cv } from '@/data/cv';

const highlightedSkills = ['TypeScript', 'Python', 'FastAPI', 'Node.js', 'RabbitMQ', 'PostgreSQL', 'Docker', 'ADK', 'MCP'];

export function SkillsSection() {
  const t = useTranslations('skills');

  return (
    <Section id="skills" title={t('title')}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cv.skills.map((category) => (
          <div key={category.category} className="space-y-3">
            <h3 className="text-sm font-mono font-bold text-emerald-500 dark:text-emerald-400">
              {'// '}{category.categoryEn}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <SkillChip
                  key={skill}
                  name={skill}
                  highlighted={highlightedSkills.includes(skill)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
