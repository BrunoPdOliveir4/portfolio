import { render, screen } from '@/test-utils/render';
import { BrowserApp } from '../BrowserApp';

describe('BrowserApp', () => {
  it('opens on the GitHub profile by default', () => {
    render(<BrowserApp />);
    expect(screen.getByTitle('Browser')).toHaveAttribute('src', 'https://github.com/BrunoPdOliveir4');
  });

  it('opens on the given initial URL', () => {
    render(<BrowserApp initialUrl="https://projeto-r.vercel.app" />);
    expect(screen.getByTitle('Browser')).toHaveAttribute('src', 'https://projeto-r.vercel.app');
    expect(screen.getByRole('textbox')).toHaveValue('https://projeto-r.vercel.app');
  });

  it('offers the current page in a new tab', () => {
    render(<BrowserApp initialUrl="https://obs-interactivescreen.onrender.com/" />);
    const newTabLink = screen.getByRole('link', { name: 'Open in new tab' });
    expect(newTabLink).toHaveAttribute('href', 'https://obs-interactivescreen.onrender.com/');
    expect(newTabLink).toHaveAttribute('target', '_blank');
  });

  it('shows the notice when one is given', () => {
    render(<BrowserApp notice="Login only works in a new tab." />);
    expect(screen.getByRole('note')).toHaveTextContent('Login only works in a new tab.');
  });

  it('omits the notice by default', () => {
    render(<BrowserApp />);
    expect(screen.queryByRole('note')).not.toBeInTheDocument();
  });

  it('lists the project demos as bookmarks', () => {
    render(<BrowserApp />);
    expect(screen.getByRole('button', { name: 'Projeto R' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Interactive OBS Overlay' })).toBeInTheDocument();
  });
});
