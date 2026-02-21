import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { useContext, useRef } from 'react';

import {
  FormBuilderProvider,
  FormBuilderContext,
} from '@/context/FormBuilderContext';
import { createField } from '@/utils/fieldFactory';

const TestConsumer = () => {
  const ctx = useContext(FormBuilderContext);
  const counter = useRef(0);
  if (!ctx) return null;
  const { state, dispatch } = ctx;

  return (
    <div>
      <span data-testid="count">{state.fields.length}</span>

      <button
        onClick={() => {
          const f = createField('text');
          counter.current += 1;
          f.label = `f-${counter.current}`;
          dispatch({
            type: 'ADD_FIELD',
            payload: { parentId: null, field: f },
          });
        }}
      >
        add-root
      </button>

      <button
        onClick={() => {
          if (!state.fields[0]) return;
          dispatch({
            type: 'DELETE_FIELD',
            payload: { fieldId: state.fields[0].id },
          });
        }}
      >
        delete-first
      </button>

      <button
        onClick={() => {
          if (!state.fields[0]) return;
          dispatch({
            type: 'UPDATE_FIELD',
            payload: {
              fieldId: state.fields[0].id,
              updates: { label: 'updated', required: true },
            },
          });
        }}
      >
        update-first
      </button>

      <button
        onClick={() => {
          if (!state.fields[0]) return;
          dispatch({
            type: 'MOVE_FIELD',
            payload: { fieldId: state.fields[0].id, direction: 'down' },
          });
        }}
      >
        move-down-first
      </button>

      <button
        onClick={() => {
          const group = createField('group');
          group.label = 'import-group';
          dispatch({ type: 'IMPORT_CONFIG', payload: { fields: [group] } });
        }}
      >
        import-config
      </button>

      <div data-testid="fields">
        {state.fields.map((f) => (
          <div data-testid="field" key={f.id} data-id={f.id}>
            {f.label}
          </div>
        ))}
      </div>
    </div>
  );
};

describe('FormBuilderContext reducer integration', () => {
  it('handles ADD, DELETE, UPDATE, MOVE and IMPORT actions', async () => {
    render(
      <FormBuilderProvider>
        <TestConsumer />
      </FormBuilderProvider>
    );

    const user = userEvent.setup();

    expect(screen.getByTestId('count')).toHaveTextContent('0');

    await user.click(screen.getByRole('button', { name: 'add-root' }));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getAllByTestId('field')).toHaveLength(1);
    expect(screen.getByText('f-1')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'add-root' }));
    expect(screen.getByTestId('count')).toHaveTextContent('2');

    const before = screen.getAllByTestId('field').map((el) => el.textContent);
    await user.click(screen.getByRole('button', { name: 'move-down-first' }));
    const after = screen.getAllByTestId('field').map((el) => el.textContent);
    expect(after[0]).toBe(before[1]);

    await user.click(screen.getByRole('button', { name: 'update-first' }));
    expect(screen.getAllByTestId('field')[0]).toHaveTextContent('updated');

    await user.click(screen.getByRole('button', { name: 'delete-first' }));
    expect(Number(screen.getByTestId('count').textContent)).toBeLessThanOrEqual(
      1
    );

    await user.click(screen.getByRole('button', { name: 'import-config' }));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByText('import-group')).toBeInTheDocument();
  });
});
