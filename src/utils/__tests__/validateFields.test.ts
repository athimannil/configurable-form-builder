import validateFields from '../validateFields';

import type { FormField } from '@/types/fields';

const textField: FormField = {
  id: 't1',
  type: 'text',
  label: 'Text',
  required: true,
};

const numberField: FormField = {
  id: 'n1',
  type: 'number',
  label: 'Number',
  required: true,
  min: 5,
  max: 10,
};

const groupField: FormField = {
  id: 'g1',
  type: 'group',
  label: 'Group',
  required: false,
  children: [textField, numberField],
};

describe('validateFields', () => {
  it('returns error for required text field', () => {
    const errors = validateFields([textField], { t1: '' });
    expect(errors.t1).toBe('This field is required.');
  });

  it('returns error for required number field', () => {
    const errors = validateFields([numberField], { n1: '' });
    expect(errors.n1).toBe('This field is required.');
  });

  it('returns error for invalid number', () => {
    const errors = validateFields([numberField], { n1: 'abc' });
    expect(errors.n1).toBe('Must be a valid number.');
  });

  it('returns error for number below min', () => {
    const errors = validateFields([numberField], { n1: '4' });
    expect(errors.n1).toBe('Must be ≥ 5.');
  });

  it('returns error for number above max', () => {
    const errors = validateFields([numberField], { n1: '11' });
    expect(errors.n1).toBe('Must be ≤ 10.');
  });

  it('returns no error for valid number', () => {
    const errors = validateFields([numberField], { n1: '7' });
    expect(errors.n1).toBeUndefined();
  });

  it('validates nested group fields', () => {
    const errors = validateFields([groupField], { t1: '', n1: 'abc' });
    expect(errors.t1).toBe('This field is required.');
    expect(errors.n1).toBe('Must be a valid number.');
  });

  it('returns empty object for valid fields', () => {
    const errors = validateFields([groupField], { t1: 'hello', n1: '7' });
    expect(errors).toEqual({});
  });
});
