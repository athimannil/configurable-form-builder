import { useContext } from 'react';

import Header from '@/components/Header';
import PreviewPanel from '@/components/PreviewPanel';
import FieldList from '@/components/FieldList';
import JsonPanel from '@/components/JsonPanel';
import { FormBuilderContext } from '@/context/FormBuilderContext';

import './FormBuilder.css';

const FormBuilder = () => {
  const context = useContext(FormBuilderContext);
  const fields = context?.state.fields ?? [];

  return (
    <div className="form-builder">
      <Header />
      <main className="form-builder__main">
        <div className="editor-panel" role="list">
          <h2 className="editor-panel__title">Builder</h2>
          <div className="editor-panel__content">
            <FieldList fields={fields} />
          </div>
          <JsonPanel fields={fields} />
        </div>
        <PreviewPanel fields={fields} />
      </main>
    </div>
  );
};

export default FormBuilder;
