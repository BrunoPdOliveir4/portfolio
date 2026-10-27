import { cv } from '@/data/cv';
import type { Project, ProjectDemo } from '@/types/cv';
import type { DesktopApp } from '@/types/desktop';

const PROJECT_ICONS: Record<string, string> = {
  'projeto-r': '🎮',
  'obs-interactive': '📺',
};

const DEFAULT_PROJECT_ICON = '🚀';

type DemoProject = Project & { demo: ProjectDemo };

function isDemoProject(project: Project): project is DemoProject {
  return Boolean(project.featured && project.demo);
}

export const demoProjects: DemoProject[] = cv.projects.filter(isDemoProject);

const projectApps: DesktopApp[] = demoProjects.map((project) => ({
  id: project.id,
  name: project.nameEn,
  icon: PROJECT_ICONS[project.id] ?? DEFAULT_PROJECT_ICON,
  command: '',
  url: project.demo.url,
}));

export const desktopApps: DesktopApp[] = [
  { id: 'whoami', name: 'About Me', icon: '👤', command: 'whoami' },
  { id: 'experience', name: 'Experience', icon: '💼', command: 'experience' },
  { id: 'education', name: 'Education', icon: '🎓', command: 'education' },
  { id: 'skills', name: 'Skills', icon: '🛠️', command: 'skills' },
  { id: 'projects', name: 'Projects', icon: '📁', command: 'projects' },
  { id: 'contact', name: 'Contact', icon: '📧', command: 'contact' },
  { id: 'curriculum', name: 'Resume', icon: '📄', command: 'curriculum' },
  { id: 'secret', name: 'Secret', icon: '🔮', command: 'secret' },
  ...projectApps,
];

export const browserApp: DesktopApp = {
  id: 'browser',
  name: 'Browser',
  icon: '🌐',
  command: '',
};

export const terminalApp: DesktopApp = {
  id: 'terminal',
  name: 'Terminal',
  icon: '>_',
  command: '',
};

export const allDockApps: DesktopApp[] = [...desktopApps, browserApp, terminalApp];

export function isBrowserApp(appId: string): boolean {
  return appId === browserApp.id || projectApps.some((app) => app.id === appId);
}
