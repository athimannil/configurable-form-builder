import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import FieldList from './FieldList';

import { FormBuilderProvider } from '@/context/FormBuilderContext';
import createField from '@/utils/fieldFactory';

describe('FieldList', () => {
  it('renders add field buttons', () => {
    render(
      <FormBuilderProvider>
        <FieldList fields={[]} />
      </FormBuilderProvider>
    );
    expect(screen.getByText('+ text')).toBeInTheDocument();
    expect(screen.getByText('+ number')).toBeInTheDocument();
    expect(screen.getByText('+ group')).toBeInTheDocument();
  });

  it('adds a new field when button is clicked', async () => {
    render(
      <FormBuilderProvider>
        <FieldList fields={[]} />
      </FormBuilderProvider>
    );
    await userEvent.click(screen.getByText('+ text'));
  });

  it('renders nested children for group', () => {
    const group = createField('group');
    render(
      <FormBuilderProvider>
        <FieldList fields={[group]} />
      </FormBuilderProvider>
    );

    const textButtons = screen.getAllByText('+ text');

    expect(textButtons.length).toBeGreaterThan(1);
  });

  it('hides group button at max depth', () => {
    render(
      <FormBuilderProvider>
        <FieldList fields={[]} depth={3} />
      </FormBuilderProvider>
    );
    expect(screen.getByText('+ text')).toBeInTheDocument();
    expect(screen.getByText('+ number')).toBeInTheDocument();
    expect(screen.queryByText('+ group')).not.toBeInTheDocument();
  });
});
