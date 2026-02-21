import generateId from './idGenerator';

import type { FieldType, FormField } from '@/types/fields';

export function createField(type: FieldType): FormField {
  const baseField = {
    id: generateId(),
    label: '',
    required: false,
  };

  switch (type) {
    case 'text':
      return {
        ...baseField,
        type: 'text',
      };

    case 'number':
      return {
        ...baseField,
        type: 'number',
        min: undefined,
        max: undefined,
      };

    case 'group':
      return {
        ...baseField,
        type: 'group',
        children: [],
      };

    default: {
      const _exhaustive: never = type;
      throw new Error(`Unknown field type: ${_exhaustive}`);
    }
  }
}
