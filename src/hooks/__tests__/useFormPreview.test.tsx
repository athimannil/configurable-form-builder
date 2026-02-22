import { render, waitFor, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useEffect, type FormEvent, type ReactNode } from 'react';

import useFormPreview from '../useFormPreview';

import { createField } from '@/utils/fieldFactory';
import type { FormField } from '@/types/fields';

type UseFormPreviewReturn = ReturnType<typeof useFormPreview>;

function HookTestComponent({
  fields,
  hookRef,
}: {
  fields: FormField[];
  hookRef: { current: UseFormPreviewReturn | null };
}): ReactNode {
  const hook = useFormPreview(fields);

  useEffect(() => {
    hookRef.current = hook;
  }, [hook, hookRef]);

  return null;
}

describe('useFormPreview', () => {
  const textField = createField('text');
  textField.required = true;
  textField.id = 'f1';

  const numberField = createField('number');
  numberField.required = false;
  numberField.id = 'f2';

  const fields = [textField, numberField];

  let hookRef: { current: UseFormPreviewReturn | null };

  beforeEach(() => {
    hookRef = { current: null };
    render(<HookTestComponent fields={fields} hookRef={hookRef} />);
  });

  it('initializes values and errors', () => {
    expect(hookRef.current!.values).toEqual({});
    expect(hookRef.current!.errors).toEqual({});
    expect(hookRef.current!.submitted).toBe(false);
  });

  it('updates values on handleChange', async () => {
    await act(async () => {
      hookRef.current!.handleChange('f1', 'hello');
    });
    await waitFor(() => {
      expect(hookRef.current!.values).toEqual({ f1: 'hello' });
    });
  });

  it('validates required fields on submit', async () => {
    await act(async () => {
      hookRef.current!.handleSubmit({
        preventDefault: () => {},
      } as FormEvent<HTMLFormElement>);
    });
    await waitFor(() => {
      expect(hookRef.current!.errors['f1']).toBeDefined();
      expect(hookRef.current!.submitted).toBe(false);
    });

    await act(async () => {
      hookRef.current!.handleChange('f1', 'world');
    });

    await act(async () => {
      hookRef.current!.handleSubmit({
        preventDefault: () => {},
      } as FormEvent<HTMLFormElement>);
    });
    await waitFor(() => {
      expect(hookRef.current!.errors).toEqual({});
      expect(hookRef.current!.submitted).toBe(true);
    });
  });

  it('resets values and state', async () => {
    await act(async () => {
      hookRef.current!.handleChange('f1', 'abc');
      hookRef.current!.handleReset();
    });
    await waitFor(() => {
      expect(hookRef.current!.values).toEqual({ f1: '', f2: '' });
      expect(hookRef.current!.errors).toEqual({});
      expect(hookRef.current!.submitted).toBe(false);
    });
  });
});
