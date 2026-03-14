import { render, screen } from '@/test-utils/render';
import { SkillsSection } from '../SkillsSection';

describe('SkillsSection', () => {
  it('renders the section title', () => {
    render(<SkillsSection />);
    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
  });

  it('renders skill categories', () => {
    render(<SkillsSection />);
    expect(screen.getByText('// Languages')).toBeInTheDocument();
    expect(screen.getByText('// Back-End')).toBeInTheDocument();
  });

  it('renders individual skills', () => {
    render(<SkillsSection />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
  });
});
