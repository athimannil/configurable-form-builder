import { useContext, useState, type ChangeEvent, type FC } from 'react';

import './JsonPanel.css';
import type { FormField } from '@/types/fields';
import { assignNewIds } from '@/utils/fieldOperations';
import { FormBuilderContext } from '@/context/FormBuilderContext';

const JsonPanel: FC<{ fields: FormField[] }> = ({ fields }) => {
  const [mode, setMode] = useState<'export' | 'import' | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [importText, setImportText] = useState<string>('');
  const [importError, setImportError] = useState<string>('');
  const { dispatch } = useContext(FormBuilderContext)!;

  const handleExport = () => {
    setMode(mode === 'export' ? null : 'export');
  };

  const handleImport = () => {
    setMode(mode === 'import' ? null : 'import');
  };

  const exportData = JSON.stringify({ fields }, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(exportData).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleImportText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setImportText(event.target.value);
    setImportError('');
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(importText);
      if (!parsed.fields || !Array.isArray(parsed.fields)) {
        throw new Error('Invalid JSON structure: "fields" array is missing');
      }

      const newData = { fields: assignNewIds(parsed.fields) };
      dispatch({ type: 'IMPORT_CONFIG', payload: newData });

      setMode(null);
      setImportText('');
      setImportError('');
    } catch (error) {
      setImportError((error as Error).message);
    }
  };

  return (
    <div className="json-panel">
      <div className="json-panel__button-group">
        <button
          className={`json-panel__button ${mode === 'export' ? 'json-panel__button--active' : 'json-panel__button--inactive'}`}
          onClick={handleExport}
        >
          Export JSON
        </button>
        <button
          className={`json-panel__button ${mode === 'import' ? 'json-panel__button--active' : 'json-panel__button--inactive'}`}
          onClick={handleImport}
        >
          Import JSON
        </button>
      </div>

      {mode === 'export' && (
        <div className="json-panel__body">
          <div className="json-panel__body-header">
            <span className="json-panel__body-section-title">
              Current configuration
            </span>
            <button
              className="json-panel__export-copy-button"
              onClick={handleCopy}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            className="json-panel__textarea"
            value={exportData}
            rows={10}
            readOnly
          />
        </div>
      )}

      {mode === 'import' && (
        <div className="json-panel__body">
          <div className="json-panel__body-header">
            <span className="json-panel__body-section-title">
              Import configuration
            </span>
          </div>
          <textarea
            className="json-panel__textarea"
            placeholder="Paste your JSON here..."
            onChange={handleImportText}
            rows={10}
          />
          {importError && <p className="json-panel__error">{importError}</p>}
          <button
            className="json-panel__apply-button"
            onClick={handleImportJson}
          >
            Apply Configuration
          </button>
        </div>
      )}
    </div>
  );
};

export default JsonPanel;
