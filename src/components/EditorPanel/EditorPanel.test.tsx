import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import EditorPanel from './EditorPanel';

describe('EditorPanel', () => {
  it('renders the builder title', () => {
    render(<EditorPanel fields={[]} />);
    expect(screen.getByText(/Builder/i)).toBeInTheDocument();
  });

  it('renders export and import buttons', () => {
    render(<EditorPanel fields={[]} />);
    expect(screen.getByText(/Export JSON/i)).toBeInTheDocument();
    expect(screen.getByText(/Import JSON/i)).toBeInTheDocument();
  });

  it('renders the FieldList component', () => {
    render(<EditorPanel fields={[]} />);
    // You can check for a FieldList element or its content
    expect(screen.getByRole('list')).toBeInTheDocument(); // If FieldList renders a <div role="list">
  });
});
