import type { FC } from 'react';

import './PreviewPanel.css';
import PreviewField from '@/components/PreviewField';
import type { FormField } from '@/types/fields';

const PreviewPanel: FC<{ fields: FormField[] }> = ({ fields }) => {
  // console.log('PreviewPanel fields:', fields);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log('validate fot the fields');
  };

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
        <form className="preview-panel__form" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <PreviewField key={field.id} field={field} />
          ))}

          <div className="preview-panel__submit-container">
            <button type="submit" className="preview-panel__submit-button">
              Submit
            </button>
            <button type="reset" className="preview-panel__reset-button">
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PreviewPanel;
