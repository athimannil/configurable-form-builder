import { type FC } from 'react';

import PreviewField from '@/components/PreviewField';
import useFormPreview from '@/hooks/useFormPreview';
import type { FormField } from '@/types/fields';

import './PreviewPanel.css';

interface PreviewPanelProps {
  fields: FormField[];
  error?: string;
}

const PreviewPanel: FC<PreviewPanelProps> = ({ fields }) => {
  const { handleSubmit, handleChange, handleReset, values, errors, submitted } =
    useFormPreview(fields);

  console.log('------------PreviewPanel------------');
  console.log('errors: ', errors);
  console.log('values: ', values);
  console.log('submitted: ', submitted);

  if (fields.length === 0) {
    return (
      <section className="preview-panel">
        <div className="preview-panel__header">
          <h2 className="preview-panel__title-text">Live preview</h2>
          <span className="preview-panel__title-live" />
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
    <section className="preview-panel">
      <div className="preview-panel__header">
        <h3 className="preview-panel__title-text">Live preview</h3>
        <span className="preview-panel__title-live" />
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

          <div className="preview-panel__submit-container">
            <button type="submit" className="preview-panel__submit-button">
              Submit
            </button>
            <button
              type="reset"
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
};

export default PreviewPanel;
