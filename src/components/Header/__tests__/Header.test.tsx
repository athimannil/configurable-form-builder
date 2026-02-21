import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Header from '../Header';

describe('Header', () => {
  it('renders title, subtitle and field count', () => {
    render(<Header />);

    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveTextContent('Configurable Form Builder');

    const subtitle = screen.getByText('CloudFactory');
    expect(subtitle).toBeInTheDocument();

    const fieldCount = screen.getByText(/top-level field/);
    expect(fieldCount).toHaveTextContent('1 top-level field');
  });
});
