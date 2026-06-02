import type { DesktopApp } from '@/types/desktop';

export const desktopApps: DesktopApp[] = [
  { id: 'whoami', name: 'About Me', icon: '👤', command: 'whoami' },
  { id: 'experience', name: 'Experience', icon: '💼', command: 'experience' },
  { id: 'education', name: 'Education', icon: '🎓', command: 'education' },
  { id: 'skills', name: 'Skills', icon: '🛠️', command: 'skills' },
  { id: 'projects', name: 'Projects', icon: '📁', command: 'projects' },
  { id: 'contact', name: 'Contact', icon: '📧', command: 'contact' },
  { id: 'curriculum', name: 'Resume', icon: '📄', command: 'curriculum' },
  { id: 'secret', name: 'Secret', icon: '🔮', command: 'secret' },
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
