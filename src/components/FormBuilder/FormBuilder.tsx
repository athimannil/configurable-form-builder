import Header from '@/components/Header';
import EditorPanel from '@/components/EditorPanel';
import PreviewPanel from '@/components/PreviewPanel';

import './FormBuilder.css';

const FormBuilder = () => {
  return (
    <div className="form-builder">
      <Header />
      <main className="form-builder__main">
        <EditorPanel />
        <PreviewPanel />
      </main>
    </div>
  );
};

export default FormBuilder;
