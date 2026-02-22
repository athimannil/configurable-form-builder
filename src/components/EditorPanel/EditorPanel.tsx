import { useContext } from 'react';

import FieldList from '@/components/FieldList';
import { FormBuilderContext } from '@/context/FormBuilderContext';

import './EditorPanel.css';

const EditorPanel = () => {
  const context = useContext(FormBuilderContext);
  const fields = context?.state.fields ?? [];

  return (
    <div className="editor-panel">
      <h2 className="editor-panel__title">Builder</h2>
      <div className="editor-panel__content">
        <FieldList fields={fields} />
      </div>
      <div className="json-panel">
        <button className="json-panel__button">Export JSON</button>
        <button className="json-panel__button">Import JSON</button>
      </div>
    </div>
  );
};

export default EditorPanel;
