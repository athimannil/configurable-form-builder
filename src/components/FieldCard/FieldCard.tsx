import { useContext, type FC } from 'react';

import FieldList from '../FieldList';

import { FormBuilderContext } from '@/context/FormBuilderContext';
import './FieldCard.css';
import type { FormField, GroupField } from '@/types/fields';

interface FieldCardProps {
  field: FormField;
  index: number;
  total: number;
  parentId?: string;
  depth: number;
}

const FieldCard: FC<FieldCardProps> = ({ field, index, total, depth = 0 }) => {
  const { dispatch } = useContext(FormBuilderContext)!;

  const isGroup = field.type === 'group';
  const isNumber = field.type === 'number';

  const handMoveField = (fieldId: string, direction: 'up' | 'down') => {
    dispatch({ type: 'MOVE_FIELD', payload: { fieldId, direction } });
  };

  const handDeleteField = (fieldId: string) => {
    dispatch({ type: 'DELETE_FIELD', payload: { fieldId } });
  };

  const handleFieldChange = (fieldId: string, changes: Partial<FormField>) => {
    dispatch({ type: 'UPDATE_FIELD', payload: { fieldId, updates: changes } });
  };

  return (
    <div className={`field-card${isGroup ? ' field-card--group' : ''}`}>
      <div className="field-card__header">
        <div className="field-card__header-left">
          <span
            className={`field-card__badge field-card__badge--${field.type}`}
          >
            {field.type}
          </span>
          <span className="field-card__title">
            {field.label || (
              <span className="field-card__title--empty">untitled</span>
            )}
          </span>
        </div>

        <div className="field-card__header-actions">
          <button
            className="field-card__btn-sm"
            disabled={index === 0}
            title="Move up"
            onClick={() => handMoveField(field.id, 'up')}
          >
            ↑
          </button>
          <button
            className="field-card__btn-sm"
            disabled={index === total - 1}
            title="Move down"
            onClick={() => handMoveField(field.id, 'down')}
          >
            ↓
          </button>
          <button
            className="field-card__btn-sm field-card__btn-sm--delete"
            title="Delete field"
            onClick={() => handDeleteField(field.id)}
          >
            ✕
          </button>
        </div>
      </div>

      <div className="field-card__body">
        <div className="field-card__row">
          <label className="field-card__label">Label</label>
          <input
            type="text"
            className="field-card__input"
            value={field.label}
            placeholder="Field label"
            onChange={({ target }) =>
              handleFieldChange(field.id, { label: target.value })
            }
          />
        </div>
        <div className="field-card__row">
          <label className="field-card__checkbox-label">
            <span className="field-card__checkbox-text">
              {field.required ? 'Required' : 'Optional'}
            </span>
            <input
              type="checkbox"
              className="field-card__checkbox"
              checked={field.required}
              onChange={() =>
                handleFieldChange(field.id, { required: !field.required })
              }
            />
          </label>
        </div>
        {isNumber && (
          <>
            <div className="field-card__row">
              <label className="field-card__label">Min</label>
              <input
                type="number"
                className="field-card__input"
                value={field.min ?? ''}
                placeholder="Minimum value"
                onChange={({ target }) =>
                  handleFieldChange(field.id, {
                    min: target.value ? Number(target.value) : undefined,
                  })
                }
              />
            </div>
            <div className="field-card__row">
              <label className="field-card__label">Max</label>
              <input
                type="number"
                className="field-card__input"
                value={field.max ?? ''}
                placeholder="Maximum value"
                onChange={({ target }) =>
                  handleFieldChange(field.id, {
                    max: target.value ? Number(target.value) : undefined,
                  })
                }
              />
            </div>
          </>
        )}
      </div>

      {isGroup && (
        <div className="field-card__children">
          <p className="field-card__children-title">Children</p>

          <FieldList
            fields={(field as GroupField).children}
            parentId={field.id}
            depth={depth + 1}
          />
        </div>
      )}
    </div>
  );
};

export default FieldCard;
