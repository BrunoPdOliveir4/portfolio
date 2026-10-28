import { render, screen, fireEvent, within } from '@/test-utils/render';
import { ProjectsSection } from '../ProjectsSection';

describe('ProjectsSection', () => {
  it('renders the section title', () => {
    render(<ProjectsSection />);
    expect(screen.getByText('Featured Projects')).toBeInTheDocument();
  });

  it('renders only featured projects', () => {
    render(<ProjectsSection />);
    expect(screen.getByRole('heading', { name: 'Projeto R' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Interactive OBS Overlay' })).toBeInTheDocument();
    expect(screen.queryByText('Lead Message Automation API')).not.toBeInTheDocument();
  });

  it('links each project to its live demo in a new tab', () => {
    render(<ProjectsSection />);
    const demoHrefs = screen
      .getAllByRole('link', { name: /View live demo/ })
      .map((link) => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        return link.getAttribute('href');
      });
    expect(demoHrefs).toEqual([
      'https://projeto-r.vercel.app',
      'https://obs-interactivescreen.onrender.com/',
    ]);
  });

  it('links each project to its case study', () => {
    render(<ProjectsSection />);
    const caseStudyHrefs = screen
      .getAllByRole('link', { name: /Read case study/ })
      .map((link) => link.getAttribute('href'));
    expect(caseStudyHrefs).toEqual(['/projects/projeto-r', '/projects/obs-interactive']);
  });

  it('shows the cold-start notice for the OBS demo', () => {
    render(<ProjectsSection />);
    expect(screen.getByText(/The server may take about 50 s to wake up/)).toBeInTheDocument();
  });

  it('falls back to a placeholder when the screenshot fails to load', () => {
    render(<ProjectsSection />);
    fireEvent.error(screen.getByAltText('Projeto R'));
    const placeholder = screen.getByTestId('project-screenshot-placeholder');
    expect(within(placeholder).getByText('Projeto R')).toBeInTheDocument();
  });
});
