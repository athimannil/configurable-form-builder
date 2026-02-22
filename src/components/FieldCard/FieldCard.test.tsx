import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import FieldCard from './FieldCard';

import { FormBuilderProvider } from '@/context/FormBuilderContext';
import { createField } from '@/utils/fieldFactory';

describe('FieldCard', () => {
  it('renders text field and allows label editing', async () => {
    const field = createField('text');
    render(
      <FormBuilderProvider>
        <FieldCard field={field} index={0} total={1} depth={0} />
      </FormBuilderProvider>
    );
    const input = screen.getByPlaceholderText('Field label');
    expect(input).toBeInTheDocument();
    await userEvent.clear(input);
    await userEvent.type(input, 'My Label');
  });

  it('renders number field with min/max', () => {
    const field = createField('number');
    render(
      <FormBuilderProvider>
        <FieldCard field={field} index={0} total={1} depth={0} />
      </FormBuilderProvider>
    );
    expect(screen.getByPlaceholderText('Minimum value')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Maximum value')).toBeInTheDocument();
  });

  it('renders group field and its children', () => {
    const group = createField('group');
    render(
      <FormBuilderProvider>
        <FieldCard field={group} index={0} total={1} depth={0} />
      </FormBuilderProvider>
    );
    expect(screen.getByText(/Children/i)).toBeInTheDocument();
  });

  it('calls delete when delete button is clicked', async () => {
    const field = createField('text');
    render(
      <FormBuilderProvider>
        <FieldCard field={field} index={0} total={1} depth={0} />
      </FormBuilderProvider>
    );
    const btn = screen.getByTitle('Delete field');
    await userEvent.click(btn);
  });
});
