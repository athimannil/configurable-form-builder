export type FieldType = 'text' | 'number' | 'group';

export interface BaseField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
}

export interface TextField extends BaseField {
  type: 'text';
  placeholder?: string;
}

export interface NumberField extends BaseField {
  type: 'number';
  placeholder?: string;
  min?: number;
  max?: number;
}

export interface GroupField extends BaseField {
  type: 'group';
  fields: FormField[];
}

export type FormField = TextField | NumberField | GroupField;
