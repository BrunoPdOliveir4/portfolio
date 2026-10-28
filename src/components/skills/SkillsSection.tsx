import { useTranslations, useLocale } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { GlowCard } from '@/components/ui/GlowCard';
import { SkillChip } from './SkillChip';
import { pick } from '@/lib/cv-i18n';
import { cv } from '@/data/cv';

const highlightedSkills = ['Python', 'TypeScript', 'AI Agents', 'LangGraph', 'ADK', 'MCP', 'FastAPI', 'Node.js', 'RabbitMQ', 'PostgreSQL', 'Docker'];

export function SkillsSection({ index }: { index?: number }) {
  const t = useTranslations('skills');
  const locale = useLocale();

  return (
    <Section id="skills" title={t('title')} index={index}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cv.skills.map((category) => (
          <GlowCard key={category.category} className="space-y-3 p-5">
            <h3 className="text-sm font-mono font-bold text-emerald-500 dark:text-emerald-400">
              {'// '}{pick(locale, category.category, category.categoryEn)}
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
          </GlowCard>
        ))}
      </div>
    </Section>
  );
}
