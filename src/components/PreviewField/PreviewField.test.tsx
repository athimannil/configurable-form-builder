import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import PreviewField from './PreviewField';

import type { FormField } from '@/types/fields';

const textField: FormField = {
  id: '1',
  type: 'text',
  label: 'Name',
  required: true,
};

const numberField: FormField = {
  id: '2',
  type: 'number',
  label: 'Age',
  required: false,
  min: 18,
  max: 99,
};

const groupField: FormField = {
  id: '3',
  type: 'group',
  label: 'Group',
  required: false,
  children: [textField, numberField],
};

describe('PreviewField', () => {
  it('renders text field with required indicator', () => {
    render(
      <PreviewField
        field={textField}
        values={{}}
        errors={{}}
        onChange={vi.fn()}
      />
    );
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter name/i)).toBeInTheDocument();
  });

  it('renders number field with min/max', () => {
    render(
      <PreviewField
        field={numberField}
        values={{}}
        errors={{}}
        onChange={vi.fn()}
      />
    );
    const input = screen.getByLabelText(/Age/);
    expect(input).toHaveAttribute('type', 'number');
    expect(input).toHaveAttribute('min', '18');
    expect(input).toHaveAttribute('max', '99');
  });

  it('calls onChange when input changes', () => {
    const handleChange = vi.fn();
    render(
      <PreviewField
        field={textField}
        values={{}}
        errors={{}}
        onChange={handleChange}
      />
    );
    fireEvent.change(screen.getByLabelText(/Name/), {
      target: { value: 'John' },
    });
    expect(handleChange).toHaveBeenCalledWith('1', 'John');
  });

  it('shows error message', () => {
    render(
      <PreviewField
        field={textField}
        values={{}}
        errors={{ '1': 'Required' }}
        onChange={vi.fn()}
      />
    );
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('renders group field and its children', () => {
    render(
      <PreviewField
        field={groupField}
        values={{}}
        errors={{}}
        onChange={vi.fn()}
      />
    );
    expect(screen.getByText('Group')).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/)).toBeInTheDocument();
  });

  it('shows message for empty group', () => {
    render(
      <PreviewField
        field={{ ...groupField, children: [] }}
        values={{}}
        errors={{}}
        onChange={vi.fn()}
      />
    );
    expect(screen.getByText(/No fields in this group/)).toBeInTheDocument();
  });
});
