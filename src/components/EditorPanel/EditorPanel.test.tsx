import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import EditorPanel from './EditorPanel';

import { FormBuilderProvider } from '@/context/FormBuilderContext';

describe('EditorPanel', () => {
  it('renders the builder title', () => {
    render(
      <FormBuilderProvider>
        <EditorPanel />
      </FormBuilderProvider>
    );
    expect(screen.getByText('Builder')).toBeInTheDocument();
  });

  it('renders export and import buttons', () => {
    render(
      <FormBuilderProvider>
        <EditorPanel />
      </FormBuilderProvider>
    );
    expect(screen.getByText('Export JSON')).toBeInTheDocument();
    expect(screen.getByText('Import JSON')).toBeInTheDocument();
  });

  it('renders the FieldList component', () => {
    render(
      <FormBuilderProvider>
        <EditorPanel />
      </FormBuilderProvider>
    );

    expect(screen.getByText('+ text')).toBeInTheDocument();
  });
});
