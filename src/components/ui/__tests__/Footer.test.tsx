import { render, screen } from '@/test-utils/render';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('renders GitHub link', () => {
    render(<Footer />);
    const link = screen.getByText('GitHub');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/BrunoPdOliveir4');
  });

  it('renders LinkedIn link', () => {
    render(<Footer />);
    const link = screen.getByText('LinkedIn');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://linkedin.com/in/b-pedroso');
  });

  it('renders Email link', () => {
    render(<Footer />);
    const link = screen.getByText('Email');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'mailto:dev.bpedroso@gmail.com');
  });
});
