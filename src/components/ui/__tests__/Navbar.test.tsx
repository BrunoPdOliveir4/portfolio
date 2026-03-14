import { render, screen } from '@/test-utils/render';
import { Navbar } from '../Navbar';

describe('Navbar', () => {
  it('renders the brand link', () => {
    render(<Navbar />);
    expect(screen.getByText('dev.bpedroso')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Terminal')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
  });

  it('renders mobile menu toggle button', () => {
    render(<Navbar />);
    expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument();
  });
});
