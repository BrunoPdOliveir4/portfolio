'use client';

import { cv } from '@/data/cv';

type Props = {
  appId: string;
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold text-zinc-100 border-b border-zinc-700 pb-2 mb-4">
      {children}
    </h2>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2 py-0.5 text-[11px] font-medium bg-emerald-500/10 text-emerald-400 rounded">
      {children}
    </span>
  );
}

function WhoamiContent() {
  return (
    <div className="space-y-6">
      <div className="text-center pb-4 border-b border-zinc-700">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-white">
          BP
        </div>
        <h1 className="text-xl font-bold text-zinc-100">{cv.name}</h1>
        <p className="text-sm text-emerald-400 font-medium mt-1">{cv.titleEn}</p>
      </div>
      <div>
        <SectionTitle>Profile</SectionTitle>
        <p className="text-sm text-zinc-300 leading-relaxed">{cv.profileEn}</p>
      </div>
    </div>
  );
}

function ExperienceContent() {
  return (
    <div className="space-y-6">
      <SectionTitle>Professional Experience</SectionTitle>
      {cv.experience.map((exp) => (
        <div key={exp.id} className="space-y-2 pb-5 border-b border-zinc-800 last:border-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-zinc-100">{exp.roleEn}</h3>
              <p className="text-sm text-emerald-400">{exp.company}</p>
            </div>
            <span className="text-xs text-zinc-500 shrink-0 mt-1">{exp.period}</span>
          </div>
          <ul className="space-y-1.5">
            {exp.bulletsEn.map((b, i) => (
              <li key={i} className="text-sm text-zinc-300 leading-relaxed flex gap-2">
                <span className="text-emerald-500 shrink-0 mt-0.5">-</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {exp.technologies.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EducationContent() {
  return (
    <div className="space-y-6">
      <SectionTitle>Education</SectionTitle>
      {cv.education.map((edu, i) => (
        <div key={i} className="pb-4 border-b border-zinc-800 last:border-0">
          <h3 className="font-semibold text-zinc-100">{edu.institution}</h3>
          <p className="text-sm text-emerald-400 mt-0.5">{edu.degreeEn}</p>
          <p className="text-xs text-zinc-500 mt-1">{edu.period}</p>
        </div>
      ))}
    </div>
  );
}

function SkillsContent() {
  return (
    <div className="space-y-6">
      <SectionTitle>Technical Skills</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cv.skills.map((cat) => (
          <div key={cat.categoryEn} className="bg-zinc-800/50 rounded-lg p-3">
            <h3 className="text-sm font-semibold text-emerald-400 mb-2">{cat.categoryEn}</h3>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsContent() {
  return (
    <div className="space-y-6">
      <SectionTitle>Projects</SectionTitle>
      {cv.projects.map((proj) => (
        <div key={proj.id} className="pb-4 border-b border-zinc-800 last:border-0">
          <h3 className="font-semibold text-zinc-100">{proj.nameEn}</h3>
          <p className="text-sm text-zinc-300 leading-relaxed mt-1">{proj.descriptionEn}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {proj.technologies.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactContent() {
  return (
    <div className="space-y-6">
      <SectionTitle>Contact Information</SectionTitle>
      <div className="space-y-3">
        {[
          { label: 'Email', value: cv.contact.email, href: `mailto:${cv.contact.email}` },
          { label: 'Location', value: cv.contact.location },
          { label: 'GitHub', value: `github.com/${cv.contact.github}`, href: `https://github.com/${cv.contact.github}` },
          { label: 'LinkedIn', value: `linkedin.com/in/${cv.contact.linkedin}`, href: `https://linkedin.com/in/${cv.contact.linkedin}` },
          { label: 'Phone', value: cv.contact.phone, href: `https://wa.me/${cv.contact.phone.replace(/\D/g, '')}` },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-zinc-800/50">
            <span className="text-xs font-semibold text-zinc-500 uppercase w-20 shrink-0">{item.label}</span>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-400 hover:underline truncate">
                {item.value}
              </a>
            ) : (
              <span className="text-sm text-zinc-300 truncate">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SecretContent() {
  return (
    <div className="space-y-4 text-center py-8">
      <div className="text-4xl">🔓</div>
      <p className="text-sm text-zinc-400 italic leading-relaxed max-w-md mx-auto">
        &ldquo;Any sufficiently advanced technology is indistinguishable from magic.&rdquo;
      </p>
      <p className="text-xs text-zinc-500">— Arthur C. Clarke</p>
      <div className="pt-4 border-t border-zinc-800 mt-6">
        <p className="text-sm text-zinc-300 leading-relaxed max-w-md mx-auto">
          Fun fact: Before becoming a software engineer, I studied Music Education.
          The discipline of practicing scales translates surprisingly well to debugging
          production systems at 3 AM.
        </p>
      </div>
    </div>
  );
}

function CurriculumContent() {
  return (
    <div className="space-y-4 text-center py-8">
      <div className="text-4xl">📄</div>
      <p className="text-sm text-zinc-300">Download my resume as PDF</p>
      <button
        onClick={() => {
          const link = document.createElement('a');
          link.href = '/curriculum.pdf';
          link.download = 'Bruno_Pedroso_Curriculum.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-500/20 transition-colors"
      >
        Download PDF
      </button>
    </div>
  );
}

const contentMap: Record<string, () => JSX.Element> = {
  whoami: WhoamiContent,
  experience: ExperienceContent,
  education: EducationContent,
  skills: SkillsContent,
  projects: ProjectsContent,
  contact: ContactContent,
  secret: SecretContent,
  curriculum: CurriculumContent,
};

export function AppContent({ appId }: Props) {
  const Content = contentMap[appId];
  if (!Content) return null;

  return (
    <div className="font-sans text-sm bg-zinc-900 min-h-full">
      {/* PDF-reader top bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-1.5 bg-zinc-850 border-b border-zinc-800 bg-zinc-800/80 backdrop-blur-sm">
        <span className="text-[11px] text-zinc-500 font-medium">
          {appId}.pdf
        </span>
        <span className="text-[11px] text-zinc-600">
          Page 1 of 1
        </span>
      </div>

      {/* Document area */}
      <div className="flex justify-center p-6">
        <div className="w-full max-w-2xl bg-zinc-850 bg-zinc-800/40 rounded-lg border border-zinc-700/50 p-8 shadow-inner">
          <Content />
        </div>
      </div>
    </div>
  );
}
