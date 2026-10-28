import { render, screen } from '@testing-library/react';
import { Brand } from '../Brand';
import { BrandMark } from '@/components/brand/BrandMark';

describe('Brand', () => {
  it('shows the two-line wordmark', () => {
    render(<Brand />);
    expect(screen.getByText('Bruno')).toBeInTheDocument();
    expect(screen.getByText('Pedroso')).toBeInTheDocument();
  });

  it('hides the decorative mark from assistive tech', () => {
    const { container } = render(<Brand />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});

describe('BrandMark', () => {
  it('is a labelled image by default', () => {
    render(<BrandMark />);
    expect(screen.getByRole('img', { name: 'Bruno Pedroso' })).toBeInTheDocument();
  });

  it('gives each instance its own filter ids', () => {
    const { container } = render(
      <>
        <BrandMark />
        <BrandMark />
      </>,
    );
    const ids = Array.from(container.querySelectorAll('filter')).map((filter) => filter.id);
    expect(new Set(ids).size).toBe(2);
  });
});
