import { render, screen } from '@/test-utils/render';
import { AboutView } from '../AboutView';

describe('AboutView', () => {
  it('renders every section', () => {
    render(<AboutView />);
    for (const name of ['Story', "What I'm looking for", 'How I work', 'Education', 'Uses']) {
      expect(screen.getByRole('region', { name: `> ${name}` })).toBeInTheDocument();
    }
  });

  it('lists the target roles', () => {
    render(<AboutView />);
    expect(screen.getByText('Senior Backend Engineer')).toBeInTheDocument();
    expect(screen.getByText('Enterprise Solution Architect')).toBeInTheDocument();
    expect(screen.getByText('Security Architect')).toBeInTheDocument();
  });

  it('uses the English copy for the en locale', () => {
    render(<AboutView />);
    expect(screen.getByText(/Music came before code/)).toBeInTheDocument();
    expect(screen.getByText('MBA in Software Architecture with AI')).toBeInTheDocument();
  });
});
