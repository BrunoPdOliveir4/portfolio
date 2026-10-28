import { render, screen } from '@/test-utils/render';
import { ExperienceSection } from '../ExperienceSection';

describe('ExperienceSection', () => {
  it('renders the section title', () => {
    render(<ExperienceSection />);
    expect(screen.getByText('Professional Experience')).toBeInTheDocument();
  });

  it('renders experience cards', () => {
    render(<ExperienceSection />);
    expect(screen.getByText('Senior Software Engineer / Tech Lead')).toBeInTheDocument();
    expect(screen.getByText('NextIA')).toBeInTheDocument();
  });
});
