export interface ContactInfo {
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  roleEn: string;
  period: string;
  periodStart: string;
  periodEnd: string;
  bullets: string[];
  bulletsEn: string[];
  technologies: string[];
}

export interface ProjectDemo {
  url: string;
  notice?: string;
  noticeEn?: string;
}

export interface Project {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  technologies: string[];
  github?: string;
  featured?: boolean;
  screenshot?: string;
  highlights?: string[];
  highlightsEn?: string[];
  demo?: ProjectDemo;
}

export interface Education {
  institution: string;
  degree: string;
  degreeEn: string;
  period: string;
}

export interface SpokenLanguage {
  name: string;
  nameEn: string;
  level: string;
  levelEn: string;
}

export interface SkillCategory {
  category: string;
  categoryEn: string;
  skills: string[];
}

export interface CV {
  name: string;
  title: string;
  titleEn: string;
  profile: string;
  profileEn: string;
  contact: ContactInfo;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: string[];
  languages: SpokenLanguage[];
  skills: SkillCategory[];
}

/** One step of a case study's architecture flow, read left to right. */
export interface ArchitectureStep {
  label: string;
  labelEn: string;
  detail: string;
  detailEn: string;
  /** What travels from this step to the next one; omitted on the last step. */
  via?: string;
  viaEn?: string;
}

export interface CaseStudyDecision {
  topic: string;
  topicEn: string;
  choice: string;
  choiceEn: string;
  why: string;
  whyEn: string;
}

export interface CaseStudyMetric {
  value: string;
  /** English value when number formatting differs (e.g. "0,35" vs "0.35"). */
  valueEn?: string;
  label: string;
  labelEn: string;
}

export interface CaseStudyImage {
  src: string;
  alt: string;
  altEn: string;
}

/** Long-form write-up for a featured project, rendered at /projects/[id]. */
export interface CaseStudy {
  projectId: string;
  problem: string;
  problemEn: string;
  architecture: ArchitectureStep[];
  decisions: CaseStudyDecision[];
  results: CaseStudyMetric[];
  learnings: string[];
  learningsEn: string[];
  gallery: CaseStudyImage[];
}
