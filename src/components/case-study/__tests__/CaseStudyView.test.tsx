import { render, screen, within } from '@/test-utils/render';
import { CaseStudyView } from '../CaseStudyView';
import { caseStudies, findCaseStudy } from '@/data/case-studies';
import { cv } from '@/data/cv';
import type { Project } from '@/types/cv';

function project(id: string): Project {
  const found = cv.projects.find((p) => p.id === id);
  if (!found) throw new Error(`missing project ${id}`);
  return found;
}

describe('case study data', () => {
  it('has exactly one case study per featured project', () => {
    const featuredIds = cv.projects.filter((p) => p.featured).map((p) => p.id);
    expect(caseStudies.map((study) => study.projectId).sort()).toEqual([...featuredIds].sort());
  });

  it('marks only the last architecture step as having no outgoing arrow', () => {
    for (const study of caseStudies) {
      const withoutVia = study.architecture.filter((step) => !step.via);
      expect(withoutVia).toEqual([study.architecture[study.architecture.length - 1]]);
    }
  });
});

describe('CaseStudyView', () => {
  const study = findCaseStudy('projeto-r')!;

  it('renders the project header with demo and source links', () => {
    render(<CaseStudyView project={project('projeto-r')} study={study} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Projeto R' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View live demo/ })).toHaveAttribute('href', 'https://projeto-r.vercel.app');
    expect(screen.getByRole('link', { name: /Source code/ })).toHaveAttribute(
      'href',
      'https://github.com/BrunoPdOliveir4/Projeto-R',
    );
  });

  it('renders the architecture as an ordered list of steps', () => {
    render(<CaseStudyView project={project('projeto-r')} study={study} />);
    const flow = screen.getByRole('heading', { name: '> Architecture' }).nextElementSibling as HTMLElement;
    const steps = within(flow).getAllByRole('listitem');
    expect(steps).toHaveLength(study.architecture.length);
    expect(within(steps[0]).getByText('zod-validated commands')).toBeInTheDocument();
  });

  it('pairs each result value with its label', () => {
    render(<CaseStudyView project={project('projeto-r')} study={study} />);
    const label = screen.getByText('on the server with 2 players');
    expect(label.tagName).toBe('DT');
    expect(label.parentElement).toHaveTextContent('60 FPS');
  });

  it('renders the gallery only when there are images', () => {
    const { rerender } = render(<CaseStudyView project={project('projeto-r')} study={study} />);
    expect(screen.getByAltText('Tyrant class portrait')).toBeInTheDocument();

    rerender(<CaseStudyView project={project('obs-interactive')} study={findCaseStudy('obs-interactive')!} />);
    expect(screen.queryByRole('heading', { name: '> Images' })).not.toBeInTheDocument();
  });

  it('links to the next project when given', () => {
    render(<CaseStudyView project={project('projeto-r')} study={study} nextProject={project('obs-interactive')} />);
    expect(screen.getByRole('link', { name: /Interactive OBS Overlay/ })).toHaveAttribute('href', '/projects/obs-interactive');
  });
});
