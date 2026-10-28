import { allDockApps, demoProjects, desktopApps } from '../apps';

describe('desktop apps', () => {
  it('keeps project demos off the desktop and the dock', () => {
    const projectIds = demoProjects.map((project) => project.id);
    const appIds = [...desktopApps, ...allDockApps].map((app) => app.id);
    expect(projectIds.some((id) => appIds.includes(id))).toBe(false);
  });

  it('lists every featured project that has a live demo', () => {
    expect(demoProjects.map((project) => project.demo.url)).toEqual([
      'https://projeto-r.vercel.app',
      'https://obs-interactivescreen.onrender.com/',
    ]);
  });
});
