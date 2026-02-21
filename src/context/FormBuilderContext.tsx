import {
  createContext,
  useReducer,
  type Dispatch,
  type FC,
  type ReactNode,
} from 'react';

import type { FormBuilderAction, FormField } from '@/types/fields';
import {
  addField,
  deleteField,
  moveField,
  updateField,
} from '@/utils/fieldOperations';

export interface FormBuilderState {
  fields: FormField[];
}

interface FormBuilderContextType {
  state: FormBuilderState;
  dispatch: Dispatch<FormBuilderAction>;
}

const FormBuilderContext = createContext<FormBuilderContextType | null>(null);

const formBuilderReducer = (
  state: FormBuilderState,
  action: FormBuilderAction
): FormBuilderState => {
  switch (action.type) {
    case 'ADD_FIELD':
      return {
        ...state,
        fields: addField(
          state.fields,
          action.payload.parentId,
          action.payload.field
        ),
      };

    case 'DELETE_FIELD':
      return {
        ...state,
        fields: deleteField(state.fields, action.payload.fieldId),
      };

    case 'UPDATE_FIELD':
      return {
        ...state,
        fields: updateField(
          state.fields,
          action.payload.fieldId,
          action.payload.updates as Partial<Omit<FormField, 'id' | 'type'>>
        ),
      };

    case 'MOVE_FIELD':
      return {
        ...state,
        fields: moveField(
          state.fields,
          action.payload.fieldId,
          action.payload.direction
        ),
      };

    case 'IMPORT_CONFIG':
      return {
        ...state,
        fields: action.payload.fields,
      };

    default:
      return state;
  }
};

const FormBuilderProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(formBuilderReducer, {
    fields: [],
  });

  return (
    <FormBuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </FormBuilderContext.Provider>
  );
};

export { FormBuilderContext, FormBuilderProvider };
