import { useContext, useCallback, memo } from 'react';

import { FormBuilderContext } from '@/context/FormBuilderContext';
import './FieldList.css';
import type { FieldType, FormField } from '@/types/fields';
import createField from '@/utils/fieldFactory';
import FieldCard from '@/components/FieldCard';

const maxDepth = 3;

const fieldButtons: FieldType[] = ['text', 'number', 'group'];

const FieldList = memo(
  ({
    fields,
    parentId,
    depth = 0,
  }: {
    fields: FormField[];
    parentId?: string;
    depth?: number;
  }) => {
    const { dispatch } = useContext(FormBuilderContext)!;

    const handleAddField = useCallback(
      (type: FieldType) => {
        const newField = createField(type);
        dispatch({
          type: 'ADD_FIELD',
          payload: { field: newField, parentId: parentId || null },
        });
      },
      [dispatch, parentId]
    );

    const allowedButtons =
      depth >= maxDepth
        ? fieldButtons.filter((type) => type !== 'group')
        : fieldButtons;

    return (
      <div className="field-list" role="list">
        {fields.map((field, index) => (
          <div role="listitem" key={field.id}>
            <FieldCard
              field={field}
              index={index}
              total={fields.length}
              parentId={parentId}
              depth={depth}
            />
          </div>
        ))}

        <div className="field-list__actions">
          {allowedButtons.map((type) => (
            <button
              key={type}
              className="field-list__action-button"
              onClick={() => handleAddField(type)}
            >{`+ ${type}`}</button>
          ))}
        </div>
      </div>
    );
  }
);

FieldList.displayName = 'FieldList';

export default FieldList;
