import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest';

import JsonPanel from './JsonPanel';

import { FormBuilderContext } from '@/context/FormBuilderContext';
import type { FormField } from '@/types/fields';

const mockDispatch = vi.fn();

const renderWithContext = (fields: FormField[] = []) => {
  return render(
    <FormBuilderContext.Provider
      value={{ state: { fields }, dispatch: mockDispatch }}
    >
      <JsonPanel fields={fields} />
    </FormBuilderContext.Provider>
  );
};

describe('JsonPanel', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders Export and Import buttons', () => {
    renderWithContext();
    expect(screen.getByText('Export JSON')).toBeInTheDocument();
    expect(screen.getByText('Import JSON')).toBeInTheDocument();
  });

  it('shows export textarea with JSON when Export JSON is clicked', () => {
    renderWithContext([
      { id: '1', type: 'text', label: 'Test', required: false } as FormField,
    ]);
    fireEvent.click(screen.getByText('Export JSON'));
    expect(screen.getByText('Current configuration')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue(
      JSON.stringify(
        { fields: [{ id: '1', type: 'text', label: 'Test', required: false }] },
        null,
        2
      )
    );
  });

  it('copies JSON to clipboard when Copy is clicked', async () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    renderWithContext([
      { id: '1', type: 'text', label: 'Test', required: false } as FormField,
    ]);
    fireEvent.click(screen.getByText('Export JSON'));
    fireEvent.click(screen.getByText('Copy'));
    await waitFor(() =>
      expect(screen.getByText('✓ Copied')).toBeInTheDocument()
    );
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('shows import textarea when Import JSON is clicked', () => {
    renderWithContext();
    fireEvent.click(screen.getByText('Import JSON'));
    expect(screen.getByText('Import configuration')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Paste your JSON here...')
    ).toBeInTheDocument();
  });

  it('shows error for invalid JSON structure', () => {
    renderWithContext();
    fireEvent.click(screen.getByText('Import JSON'));
    fireEvent.change(screen.getByPlaceholderText('Paste your JSON here...'), {
      target: { value: '{ "foo": [] }' },
    });
    fireEvent.click(screen.getByText('Apply Configuration'));
    expect(
      screen.getByText('Invalid JSON structure: "fields" array is missing')
    ).toBeInTheDocument();
  });

  it('dispatches IMPORT_CONFIG on valid import', () => {
    renderWithContext();
    fireEvent.click(screen.getByText('Import JSON'));
    const validJson = JSON.stringify({
      fields: [{ id: '1', type: 'text', label: 'Test', required: false }],
    });
    fireEvent.change(screen.getByPlaceholderText('Paste your JSON here...'), {
      target: { value: validJson },
    });
    fireEvent.click(screen.getByText('Apply Configuration'));
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'IMPORT_CONFIG',
        payload: expect.anything(),
      })
    );
  });
});
