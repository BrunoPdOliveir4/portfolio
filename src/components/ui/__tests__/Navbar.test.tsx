import { render, screen, fireEvent } from '@/test-utils/render';
import { Navbar } from '../Navbar';

describe('Navbar', () => {
  it('links the brand to the home page', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: 'Bruno Pedroso — home' })).toHaveAttribute('href', '/');
  });

  it('links home sections by hash so they work from any page', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '/#experience');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/#projects');
    expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '/#skills');
  });

  it('links to the about and terminal pages', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: />_ Terminal/ })).toHaveAttribute('href', '/terminal');
  });

  it('offers the CV as a download', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: /CV/ })).toHaveAttribute('download');
  });

  it('opens the mobile menu', () => {
    render(<Navbar />);
    const toggle = screen.getByLabelText('Toggle menu');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getAllByRole('link', { name: /About/ })).toHaveLength(2);
  });
});
