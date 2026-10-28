import sitemap from '../sitemap';

describe('sitemap', () => {
  const urls = sitemap().map((entry) => entry.url);

  it.each(['pt', 'en'])('lists every page for %s', (locale) => {
    const base = `https://brunopdoliveir4.github.io/portfolio/${locale}`;
    expect(urls).toEqual(
      expect.arrayContaining([
        base,
        `${base}/projects/projeto-r`,
        `${base}/projects/obs-interactive`,
        `${base}/about`,
        `${base}/terminal`,
      ]),
    );
  });

  it('ranks the default-locale home page highest', () => {
    const top = sitemap().reduce((a, b) => ((a.priority ?? 0) >= (b.priority ?? 0) ? a : b));
    expect(top.url).toBe('https://brunopdoliveir4.github.io/portfolio/pt');
  });
});
