import type { FC } from 'react';

import type { FormField } from '@/types/fields';
import './PreviewField.css';

const PreviewField: FC<{
  field: FormField;
  onChange: (id: string, value: string) => void;
}> = ({ field, onChange }) => {
  console.log('-------field-----------');
  console.log(field);

  if (field.type === 'group') {
    return (
      <div className="previewField-group">
        <div className="previewField-group--header">
          {field.label || 'Untitled Group'}
        </div>
        <div className="previewField-group--body">
          {field.children.length === 0 ? (
            <p>No fields in this group</p>
          ) : (
            field.children.map((child) => {
              return <PreviewField key={child.id} field={child} />;
            })
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="previewField">
      <label className="previewField-label" htmlFor={field.id}>
        {field.label || 'Untitled'}
        {field.required && (
          <span className="previewField-label-required">*</span>
        )}
      </label>
      <input
        id={field.id}
        type={field?.type === 'text' ? 'text' : 'number'}
        className="previewField-input"
        onChange={({ target }) => onChange(field.id, target.value)}
        placeholder={`Enter ${field.label.toLowerCase() || 'value'}...`}
        min={field?.type === 'number' ? field.min : undefined}
        max={field?.type === 'number' ? field.max : undefined}
      />
    </div>
  );
};

export default PreviewField;
