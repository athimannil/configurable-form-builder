import { memo, type FC } from 'react';

import type { FormField } from '@/types/fields';
import './PreviewField.css';

const PreviewField: FC<{
  field: FormField;
  values: Record<string, string>;
  errors: Record<string, string>;
  onChange: (id: string, value: string) => void;
}> = memo(({ field, values, errors, onChange }) => {
  if (field.type === 'group') {
    return (
      <div
        className="previewField-group"
        role="group"
        aria-label={field.label || 'Untitled Group'}
      >
        <div className="previewField-group--header">
          {field.label || 'Untitled Group'}
        </div>
        <div className="previewField-group--body">
          {field.children.length === 0 ? (
            <p>No fields in this group</p>
          ) : (
            field.children.map((child) => (
              <PreviewField
                key={child.id}
                field={child}
                values={values}
                errors={errors}
                onChange={onChange}
              />
            ))
          )}
        </div>
      </div>
    );
  }

  const value = values[field.id] || '';
  const error = errors[field.id];

  return (
    <div className="previewField">
      <label className="previewField-label" htmlFor={field.id}>
        {field.label || 'Untitled'}
        {field.required && (
          <span className="previewField-label-required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={field.id}
        type={field.type === 'text' ? 'text' : 'number'}
        className={`previewField-input${error ? ' previewField-input--error' : ''}`}
        value={value}
        onChange={({ target }) => onChange(field.id, target.value)}
        placeholder={`Enter ${field.label.toLowerCase() || 'value'}...`}
        min={field.type === 'number' ? field.min : undefined}
        max={field.type === 'number' ? field.max : undefined}
        aria-invalid={!!error}
        aria-describedby={error ? `${field.id}-error` : undefined}
        required={field.required}
      />
      {error && (
        <span
          className="previewField-error"
          id={`${field.id}-error`}
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
});

export default PreviewField;
