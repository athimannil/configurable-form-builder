import { type FC } from 'react';

import FieldList from '@/components/FieldList';
import type { FormField } from '@/types/fields';
import './EditorPanel.css';

const EditorPanel: FC<{ fields: FormField[] }> = ({ fields }) => {
  return (
    <div className="editor-panel" role="list">
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
