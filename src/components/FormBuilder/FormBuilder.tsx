import { useContext } from 'react';

import Header from '@/components/Header';
import EditorPanel from '@/components/EditorPanel';
import PreviewPanel from '@/components/PreviewPanel';
import { FormBuilderContext } from '@/context/FormBuilderContext';
import './FormBuilder.css';

const FormBuilder = () => {
  const context = useContext(FormBuilderContext);
  const fields = context?.state.fields ?? [];

  return (
    <div className="form-builder">
      <Header />
      <main className="form-builder__main">
        <EditorPanel fields={fields} />
        <PreviewPanel fields={fields} />
      </main>
    </div>
  );
};

export default FormBuilder;
