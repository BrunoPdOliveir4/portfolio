import { render, screen } from '@/test-utils/render';
import { Hero } from '../Hero';

describe('Hero', () => {
  it('leads with name and title, keeping availability for the About page', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1, name: 'Bruno Pedroso de Oliveira' })).toBeInTheDocument();
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    expect(screen.queryByText(/Open to remote/)).not.toBeInTheDocument();
  });

  it('attributes the production metrics to NextIA', () => {
    render(<Hero />);
    expect(screen.getByText('// In production at NextIA')).toBeInTheDocument();
  });

  it('offers the CV as a download', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: 'Download CV' })).toHaveAttribute(
      'download',
      'Bruno_Pedroso_Curriculum.pdf',
    );
  });

  it('opens external profiles in a new tab', () => {
    render(<Hero />);
    for (const name of ['LinkedIn', 'GitHub']) {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('labels each metric for screen readers', () => {
    render(<Hero />);
    expect(screen.getByText('companies served by the agent platform', { selector: 'dt' })).toBeInTheDocument();
    expect(screen.getByText('~50')).toBeInTheDocument();
  });

  it('links to the terminal page as an optional extra', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /open interactive terminal/ })).toHaveAttribute('href', '/terminal');
  });
});
