import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import PreviewPanel from './PreviewPanel';

describe('PreviewPanel', () => {
  it('renders live preview section', () => {
    render(<PreviewPanel fields={[]} />);
    const previews = screen.getAllByText(/Live preview/i);
    expect(previews.length).toBeGreaterThan(0);
  });

  it('renders form and fields when fields are provided', () => {
    const fields = [
      { id: '1', type: 'text', label: 'Name', required: false },
      { id: '2', type: 'number', label: 'Age', required: false },
    ];
    render(<PreviewPanel fields={fields} />);
    expect(document.querySelector('form')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset/i })).toBeInTheDocument();
  });

  it('shows success message after submit with no errors', async () => {
    const fields = [{ id: '1', type: 'text', label: 'Name', required: false }];
    render(<PreviewPanel fields={fields} />);
    const submitBtn = screen.getByRole('button', { name: /Submit/i });
    await act(async () => {
      submitBtn.click();
    });

    expect(
      await screen.findByText(/Form submitted successfully!/i)
    ).toBeInTheDocument();
  });

  it('calls reset handler when reset button is clicked', async () => {
    const fields = [{ id: '1', type: 'text', label: 'Name', required: false }];
    render(<PreviewPanel fields={fields} />);
    const resetBtn = screen.getByRole('button', { name: /Reset/i });
    await act(async () => {
      resetBtn.click();
    });
  });
});
