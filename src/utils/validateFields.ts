import type { FormField, GroupField, NumberField } from '@/types/fields';

const validateFields = (
  fields: FormField[],
  values: Record<string, string>
): Record<string, string> => {
  const errs: Record<string, string> = {};

  for (const field of fields) {
    if (field.type === 'group') {
      const childErrors = validateFields(
        (field as GroupField).children,
        values
      );
      Object.assign(errs, childErrors);
      continue;
    }

    const value = values[field.id] ?? '';

    if (field.required && value.trim() === '') {
      // errs[field.id] = `"${field.label || field.type}" is required.`;
      errs[field.id] = 'This field is required.';
      continue;
    }

    if (field.type === 'number' && value !== '') {
      const num = Number(value);
      if (isNaN(num)) {
        errs[field.id] = 'Must be a valid number.';
        continue;
      }
      const numberField = field as NumberField;
      if (numberField.min !== undefined && num < numberField.min) {
        errs[field.id] = `Must be ≥ ${numberField.min}.`;
        continue;
      }
      if (numberField.max !== undefined && num > numberField.max) {
        errs[field.id] = `Must be ≤ ${numberField.max}.`;
        continue;
      }
    }
  }

  return errs;
};

export default validateFields;
