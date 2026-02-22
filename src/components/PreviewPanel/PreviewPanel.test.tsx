import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import PreviewPanel from './PreviewPanel';

describe('PreviewPanel', () => {
  it('renders live preview section', () => {
    render(<PreviewPanel fields={[]} />);
    const previews = screen.getAllByText(/Live preview/i);
    expect(previews.length).toBeGreaterThan(0);
  });
});
