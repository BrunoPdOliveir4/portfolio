import { render, screen } from '@/test-utils/render';
import { Terminal } from '../Terminal';

describe('Terminal', () => {
  it('renders the title bar', () => {
    render(<Terminal />);
    expect(screen.getByText('bruno@portfolio — zsh')).toBeInTheDocument();
  });

  it('renders window control buttons', () => {
    render(<Terminal />);
    expect(screen.getByLabelText('Close terminal')).toBeInTheDocument();
    expect(screen.getByLabelText('Minimize terminal')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle fullscreen')).toBeInTheDocument();
  });

  it('renders boot text', () => {
    render(<Terminal />);
    expect(screen.getByText('Initializing portfolio v2.0...')).toBeInTheDocument();
  });
});
