import { render, screen, within } from '@/test-utils/render';
import { PillarsSection } from '../PillarsSection';
import { pillars } from '@/data/pillars';
import { caseStudies } from '@/data/case-studies';

// Hashes of the home page sections and the static routes the site exports.
const HOME_SECTIONS = ['top', 'pillars', 'experience', 'projects', 'skills', 'github', 'contact'];
const ROUTES = ['/', '/about', '/terminal', ...caseStudies.map((study) => `/projects/${study.projectId}`)];

describe('pillars data', () => {
  it('covers backend, architecture, security, and AI', () => {
    expect(pillars.map((pillar) => pillar.id)).toEqual(['backend', 'architecture', 'security', 'ai']);
  });

  it('points every proof at an existing page or home section', () => {
    for (const proof of pillars.flatMap((pillar) => pillar.proofs)) {
      expect(ROUTES).toContain(proof.href.pathname);
      if (proof.href.hash) {
        expect(proof.href.pathname).toBe('/');
        expect(HOME_SECTIONS).toContain(proof.href.hash);
      }
    }
  });
});

describe('PillarsSection', () => {
  it('renders a card per pillar with its evidence links', () => {
    render(<PillarsSection />);
    const security = screen.getByRole('heading', { name: 'Security' }).parentElement as HTMLElement;
    expect(within(security).getByRole('link', { name: /Twitch OAuth/ })).toHaveAttribute('href', '/projects/obs-interactive');
    expect(within(security).getByRole('link', { name: /Ethical Hacking/ })).toHaveAttribute('href', '/about');
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4);
  });
});
