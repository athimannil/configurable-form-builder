import { memo, type FC } from 'react';

import PreviewField from '@/components/PreviewField';
import useFormPreview from '@/hooks/useFormPreview';
import type { FormField } from '@/types/fields';

import './PreviewPanel.css';

interface PreviewPanelProps {
  fields: FormField[];
  error?: string;
}

const PreviewPanel: FC<PreviewPanelProps> = memo(({ fields }) => {
  const { handleSubmit, handleChange, handleReset, values, errors, submitted } =
    useFormPreview(fields);

  if (fields.length === 0) {
    return (
      <section className="preview-panel" aria-label="Form preview">
        <div className="preview-panel__header">
          <h2 className="preview-panel__title-text">Live preview</h2>
          <span
            className="preview-panel__title-live"
            aria-label="Live indicator"
          />
        </div>
        <div className="preview-panel__content preview-panel__content--empty">
          <p className="preview-panel__empty-message">
            Add fields in the builder panel to see your form preview here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="preview-panel" aria-label="Form preview">
      <div className="preview-panel__header">
        <h3 className="preview-panel__title-text">Live preview</h3>
        <span
          className="preview-panel__title-live"
          aria-label="Live indicator"
        />
      </div>
      <div className="preview-panel__content">
        <form
          className="preview-panel__form"
          onSubmit={handleSubmit}
          noValidate
        >
          {fields.map((field) => (
            <PreviewField
              key={field.id}
              field={field}
              values={values}
              errors={errors}
              onChange={handleChange}
            />
          ))}

          {submitted && Object.keys(errors).length === 0 && (
            <div className="preview-panel__submit-success" role="status">
              Form submitted successfully!
            </div>
          )}

          <div className="preview-panel__submit-container">
            <button type="submit" className="preview-panel__submit-button">
              Submit
            </button>
            <button
              type="button"
              className="preview-panel__reset-button"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
});

PreviewPanel.displayName = 'PreviewPanel';

export default PreviewPanel;
