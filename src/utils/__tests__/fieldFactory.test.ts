import { describe, it, expect } from 'vitest';

import createField from '@/utils/fieldFactory';
import type { FieldType } from '@/types/fields';

describe('fieldFactory', () => {
  it('creates text field with correct defaults', () => {
    const field = createField('text');

    expect(field).toEqual({
      id: expect.any(String),
      type: 'text',
      label: '',
      required: false,
    });
    expect(field.id).toHaveLength(36);
  });

  it('creates number field with correct defaults', () => {
    const field = createField('number');

    expect(field).toEqual({
      id: expect.any(String),
      type: 'number',
      label: '',
      required: false,
      min: undefined,
      max: undefined,
    });
  });

  it('creates group field with correct defaults', () => {
    const field = createField('group');

    expect(field).toEqual({
      id: expect.any(String),
      type: 'group',
      label: '',
      required: false,
      children: [],
    });
  });

  it('generates unique IDs for each field', () => {
    const field1 = createField('text');
    const field2 = createField('text');

    expect(field1.id).not.toBe(field2.id);
  });

  it('throws error for unknown field type', () => {
    expect(() => createField('unknown' as FieldType)).toThrow(
      'Unknown field type: unknown'
    );
  });
});
