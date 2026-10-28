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

  it('lists the project demos as bookmarks', () => {
    render(<BrowserApp />);
    expect(screen.getByRole('button', { name: 'Projeto R' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Interactive OBS Overlay' })).toBeInTheDocument();
  });
});
