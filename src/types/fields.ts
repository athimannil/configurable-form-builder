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
  children: FormField[];
}

export type FormField = TextField | NumberField | GroupField;

export type FormBuilderAction =
  | {
      type: 'ADD_FIELD';
      payload: { field: FormField; parentId: string | null };
    }
  | { type: 'DELETE_FIELD'; payload: { fieldId: string } }
  | {
      type: 'UPDATE_FIELD';
      payload: {
        fieldId: string;
        updates: Partial<FormField>;
      };
    }
  | {
      type: 'MOVE_FIELD';
      payload: { fieldId: string; direction: 'up' | 'down' };
    }
  | { type: 'IMPORT_CONFIG'; payload: { fields: FormField[] } };
