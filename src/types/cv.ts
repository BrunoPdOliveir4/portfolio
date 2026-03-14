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

export interface Project {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  technologies: string[];
  github?: string;
}

export interface Education {
  institution: string;
  degree: string;
  degreeEn: string;
  period: string;
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
  skills: SkillCategory[];
}
