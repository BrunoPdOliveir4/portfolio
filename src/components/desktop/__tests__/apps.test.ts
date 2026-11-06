import { allDockApps, demoProjects, desktopApps } from '../apps';

describe('desktop apps', () => {
  it('keeps project demos off the desktop and the dock', () => {
    const projectIds = demoProjects.map((project) => project.id);
    const appIds = [...desktopApps, ...allDockApps].map((app) => app.id);
    expect(projectIds.some((id) => appIds.includes(id))).toBe(false);
  });

  it('keeps sites that refuse framing out of the desktop browser', () => {
    expect(demoProjects.map((project) => project.id)).not.toContain('bulwark');
  });

  it('lists every featured project that has an embeddable live demo', () => {
    expect(demoProjects.map((project) => project.demo.url)).toEqual([
      'https://projeto-r.vercel.app',
      'https://obs-interactivescreen.onrender.com/',
    ]);
  });
});
