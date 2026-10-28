import { render, screen } from '@/test-utils/render';
import { ContactSection } from '../ContactSection';

describe('ContactSection', () => {
  it('links to email, LinkedIn and the CV', () => {
    render(<ContactSection />);
    expect(screen.getByRole('link', { name: /Send email/ })).toHaveAttribute('href', 'mailto:dev.bpedroso@gmail.com');
    expect(screen.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', 'https://www.linkedin.com/in/b-pedroso');
    expect(screen.getByRole('link', { name: /Download CV/ })).toHaveAttribute('download');
  });
});
