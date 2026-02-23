import { useState, useCallback, useMemo, type FormEvent } from 'react';

import type { FormField, GroupField } from '@/types/fields';
import validateFields from '@/utils/validateFields';

const getLeafFieldIds = (fields: FormField[]): string[] => {
  let ids: string[] = [];
  for (const field of fields) {
    if (field.type === 'group') {
      ids = ids.concat(getLeafFieldIds((field as GroupField).children));
    } else {
      ids.push(field.id);
    }
  }
  return ids;
};

const useFormPreview = (fields: FormField[]) => {
  const [rawValues, setRawValues] = useState<Record<string, string>>({});
  const [showError, setShowError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const currentIds = useMemo(() => new Set(getLeafFieldIds(fields)), [fields]);

  const values = useMemo(() => {
    const cleaned: Record<string, string> = {};
    for (const id of Object.keys(rawValues)) {
      if (currentIds.has(id)) {
        cleaned[id] = rawValues[id];
      }
    }
    return cleaned;
  }, [rawValues, currentIds]);

  const handleChange = useCallback(
    (fieldId: string, value: string | number) => {
      setRawValues((prevValues) => ({
        ...prevValues,
        [fieldId]: String(value),
      }));
      setSubmitted(false);
    },
    []
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setShowError(true);

      const errorList = validateFields(fields, values);
      if (Object.keys(errorList).length > 0) {
        setSubmitted(false);
      } else {
        setSubmitted(true);
      }
    },
    [fields, values]
  );

  const handleReset = useCallback(() => {
    const leafFieldIds = getLeafFieldIds(fields);
    const resetValues = leafFieldIds.reduce(
      (acc, id) => {
        acc[id] = '';
        return acc;
      },
      {} as Record<string, string>
    );
    setRawValues(resetValues);
    setShowError(false);
    setSubmitted(false);
  }, [fields]);

  const errors = useMemo(
    () => (showError ? validateFields(fields, values) : {}),
    [showError, fields, values]
  );

  return {
    handleChange,
    handleSubmit,
    handleReset,
    submitted,
    values,
    errors,
  };
};

export default useFormPreview;
