import type { FormField, FieldType } from '@/types/fields';

const maxDepth = 3;
const validTypes: FieldType[] = ['text', 'number', 'group'];

const validateConfig = (fields: unknown): fields is FormField[] => {
  if (!Array.isArray(fields)) return false;

  return fields.every((field) => validateField(field, 0));
};

function validateField(field: unknown, depth: number): field is FormField {
  if (typeof field !== 'object' || field === null) return false;

  const fieldData = field as Record<string, unknown>;

  if (typeof fieldData.id !== 'string' || fieldData.id.trim() === '')
    return false;
  if (typeof fieldData.label !== 'string') return false;
  if (!validTypes.includes(fieldData.type as FieldType)) return false;
  if (typeof fieldData.required !== 'boolean') return false;

  if (fieldData.type === 'number') {
    if (
      fieldData.min !== undefined &&
      fieldData.min !== null &&
      typeof fieldData.min !== 'number'
    )
      return false;
    if (
      fieldData.max !== undefined &&
      fieldData.max !== null &&
      typeof fieldData.max !== 'number'
    )
      return false;
    if (
      typeof fieldData.min === 'number' &&
      typeof fieldData.max === 'number' &&
      fieldData.min > fieldData.max
    ) {
      return false;
    }
  }

  if (fieldData.type === 'group') {
    if (depth >= maxDepth) return false;
    if (!Array.isArray(fieldData.children)) return false;
    return (fieldData.children as unknown[]).every((child) =>
      validateField(child, depth + 1)
    );
  }

  return true;
}

export default validateConfig;
