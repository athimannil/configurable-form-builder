import { useContext } from 'react';

import { FormBuilderContext } from '@/context/FormBuilderContext';
import './FieldList.css';
import type { FieldType } from '@/types/fields';
import { createField } from '@/utils/fieldFactory';
import FieldCard from '@/components/FieldCard';

const fieldButtons: FieldType[] = ['text', 'number', 'group'];

const FieldList = ({
  fields,
  parentId,
  depth = 0,
}: {
  fields: FieldType[];
  parentId?: string;
  depth?: number;
}) => {
  const context = useContext(FormBuilderContext);

  if (!context) return null;
  const { dispatch } = context;

  const handleAddField = (type: FieldType) => {
    const newField = createField(type);
    dispatch({
      type: 'ADD_FIELD',
      payload: { field: newField, parentId: parentId || null },
    });
  };

  return (
    <div className="field-list">
      {fields.length > 0 &&
        fields.map((field, index) => (
          <FieldCard
            key={field.id}
            field={field}
            index={index}
            total={fields.length}
            parentId={parentId}
            depth={depth}
          />
        ))}

      <div className="field-list__actions">
        {fieldButtons.map((type) => (
          <button
            key={type}
            className="field-list__action-button"
            onClick={() => handleAddField(type)}
          >{`+ ${type}`}</button>
        ))}
      </div>
    </div>
  );
};

export default FieldList;
