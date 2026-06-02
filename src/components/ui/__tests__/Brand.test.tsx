import { render, screen, fireEvent } from '@testing-library/react';
import { Brand } from '../Brand';

describe('Brand', () => {
  it('renders the logo image by default', () => {
    render(<Brand />);
    expect(screen.getByAltText('Bruno Pedroso')).toBeInTheDocument();
  });

  it('falls back to the wordmark when the logo fails to load', () => {
    render(<Brand />);
    fireEvent.error(screen.getByAltText('Bruno Pedroso'));
    expect(screen.getByText('dev.bpedroso')).toBeInTheDocument();
    expect(screen.queryByAltText('Bruno Pedroso')).not.toBeInTheDocument();
  });
});
