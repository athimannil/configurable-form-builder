import { useState, type FormEvent } from 'react';

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
  // console.log('--------useFormPreview fields--------');
  // console.log(fields);
  const [values, setValues] = useState({});
  const [showError, setShowError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (fieldId: string, value: string | number) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldId]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowError(true);
    // const errors = showError ? validateFields(fields, values) : {};
    const errorList = validateFields(fields, values);
    if (Object.keys(errorList).length > 0) {
      setSubmitted(false);
    } else {
      setSubmitted(true);
    }
  };

  function handleReset() {
    const leafFieldIds = getLeafFieldIds(fields);
    const resetValues = leafFieldIds.reduce(
      (acc, id) => {
        acc[id] = '';
        return acc;
      },
      {} as Record<string, string>
    );
    setValues(resetValues);
    setShowError(false);
    setSubmitted(false);
  }

  const errors = showError ? validateFields(fields, values) : {};

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
