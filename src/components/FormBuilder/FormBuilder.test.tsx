import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import FormBuilder from './FormBuilder';

import { FormBuilderProvider } from '@/context/FormBuilderContext';

describe('FormBuilder', () => {
  it('renders header, editor, and preview panels', () => {
    render(
      <FormBuilderProvider>
        <FormBuilder />
      </FormBuilderProvider>
    );
    expect(screen.getByText('Configurable Form Builder')).toBeInTheDocument();
    expect(screen.getByText('Builder')).toBeInTheDocument();

    const previews = screen.getAllByText(/Live preview/i);
    expect(previews.length).toBeGreaterThan(0);
  });
});
