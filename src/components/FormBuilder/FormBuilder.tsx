import { useState } from 'react';

import Header from '@/components/Header';
import type { FormField } from '@/types/fields';
import EditorPanel from '@/components/EditorPanel';
import PreviewPanel from '@/components/PreviewPanel';

import './FormBuilder.css';

const FormBuilder = () => {
  const [config, setConfig] = useState<FormField[]>([]);

  return (
    <div className="form-builder">
      <Header />
      <main className="form-builder-main">
        <EditorPanel />
        <PreviewPanel />
      </main>
    </div>
  );
};

export default FormBuilder;
