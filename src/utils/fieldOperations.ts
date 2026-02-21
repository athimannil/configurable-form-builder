import type { FormField } from '@/types/fields';

export function findFieldById(
  fields: FormField[],
  id: string
): FormField | undefined {
  for (const field of fields) {
    if (field.id === id) {
      return field;
    }

    if (field.type === 'group') {
      const found = findFieldById(field.children, id);
      if (found) {
        return found;
      }
    }
  }

  return undefined;
}

export function addField(
  fields: FormField[],
  parentId: string | null,
  newField: FormField
): FormField[] {
  if (parentId === null) {
    return [...fields, newField];
  }

  return fields.map((field) => {
    if (field.id === parentId && field.type === 'group') {
      return {
        ...field,
        children: [...field.children, newField],
      };
    }

    if (field.type === 'group') {
      return {
        ...field,
        children: addField(field.children, parentId, newField),
      };
    }

    return field;
  });
}

export function deleteField(fields: FormField[], fieldId: string): FormField[] {
  const result = fields.reduce<FormField[]>((acc, field) => {
    if (field.id === fieldId) {
      return acc;
    }

    if (field.type === 'group') {
      const newChildren = deleteField(field.children, fieldId);
      acc.push({ ...field, children: newChildren });
    } else {
      acc.push(field);
    }

    return acc;
  }, []);

  return result;
}

export function updateField(
  fields: FormField[],
  fieldId: string,
  changes: Partial<Omit<FormField, 'id' | 'type'>>
): FormField[] {
  return fields.map((field) => {
    if (field.id === fieldId) {
      return { ...field, ...changes };
    }

    if (field.type === 'group') {
      return {
        ...field,
        children: updateField(field.children, fieldId, changes),
      };
    }

    return field;
  });
}

export function moveField(
  fields: FormField[],
  fieldId: string,
  direction: 'up' | 'down'
): FormField[] {
  const fieldIndex = fields.findIndex((field) => field.id === fieldId);

  if (fieldIndex !== -1) {
    const newIndex = direction === 'up' ? fieldIndex - 1 : fieldIndex + 1;

    if (newIndex < 0 || newIndex >= fields.length) {
      return fields.slice();
    }

    const newFields = [...fields];
    [newFields[fieldIndex], newFields[newIndex]] = [
      newFields[newIndex],
      newFields[fieldIndex],
    ];
    return newFields;
  }

  return fields.map((field) => {
    if (field.type === 'group') {
      return {
        ...field,
        children: moveField(field.children, fieldId, direction),
      };
    }
    return field;
  });
}
