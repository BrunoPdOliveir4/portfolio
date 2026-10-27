import { allDockApps, desktopApps, isBrowserApp } from '../apps';

describe('desktop apps', () => {
  it('adds a browser shortcut for each featured project demo', () => {
    const projectApps = desktopApps.filter((app) => app.url);
    expect(projectApps.map(({ id, url }) => ({ id, url }))).toEqual([
      { id: 'projeto-r', url: 'https://projeto-r.vercel.app' },
      { id: 'obs-interactive', url: 'https://obs-interactivescreen.onrender.com/' },
    ]);
  });

  it('shows the project shortcuts in the dock', () => {
    const dockIds = allDockApps.map((app) => app.id);
    expect(dockIds).toEqual(expect.arrayContaining(['projeto-r', 'obs-interactive']));
  });

  describe('isBrowserApp', () => {
    it.each(['browser', 'projeto-r', 'obs-interactive'])('returns true for %s', (appId) => {
      expect(isBrowserApp(appId)).toBe(true);
    });

    it.each(['whoami', 'terminal', 'lead-automation'])('returns false for %s', (appId) => {
      expect(isBrowserApp(appId)).toBe(false);
    });
  });
});
