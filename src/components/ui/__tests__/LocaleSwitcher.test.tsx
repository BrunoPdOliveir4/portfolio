import { render, screen } from '@testing-library/react';
import { LocaleSwitcher } from '../LocaleSwitcher';

describe('LocaleSwitcher', () => {
  it('renders a button for each locale', () => {
    render(<LocaleSwitcher />);
    expect(screen.getByRole('button', { name: 'PT' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument();
  });

  it('marks the active locale with aria-current', () => {
    render(<LocaleSwitcher />);
    // The next-intl mock reports the active locale as 'en'.
    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('button', { name: 'PT' })).not.toHaveAttribute('aria-current');
  });
});
