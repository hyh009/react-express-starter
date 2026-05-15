import { useCallback, useState } from 'react';
import { createTodoSchema, todoPriorities, todoStatuses } from '@repo/shared';
import { tDefault } from '@/app/i18n';
import type { TodoPriority, TodoStatus } from '@/models/todo.types';

export type TodoCreateFormValues = {
  description: string;
  ownerName: string;
  priority: TodoPriority;
  status: TodoStatus;
  title: string;
};

export type TodoCreateFieldErrors = Partial<
  Record<keyof TodoCreateFormValues, string>
>;

export type TodoCreateValidationResult =
  | {
      success: true;
      todo: TodoCreateFormValues;
    }
  | {
      success: false;
      fieldErrors: TodoCreateFieldErrors;
    };

const initialValues: TodoCreateFormValues = {
  description: '',
  ownerName: '',
  priority: 'medium',
  status: 'todo',
  title: '',
};

function getTodoCreateFieldName(path: PropertyKey) {
  if (path === 'owner_name') {
    return 'ownerName';
  }

  if (
    path === 'description' ||
    path === 'ownerName' ||
    path === 'priority' ||
    path === 'status' ||
    path === 'title'
  ) {
    return path;
  }

  return null;
}

function getTodoCreateFieldError(fieldName: keyof TodoCreateFormValues) {
  if (fieldName === 'title') {
    return tDefault('todo.validation.titleRequired', 'Title is required.');
  }

  if (fieldName === 'ownerName') {
    return tDefault('todo.validation.ownerRequired', 'Owner is required.');
  }

  if (fieldName === 'status') {
    return tDefault('todo.validation.statusInvalid', 'Choose a valid status.');
  }

  if (fieldName === 'priority') {
    return tDefault(
      'todo.validation.priorityInvalid',
      'Choose a valid priority.',
    );
  }

  return tDefault(
    'todo.validation.descriptionInvalid',
    'Enter a valid description.',
  );
}

export function validateTodoCreateForm(
  values: TodoCreateFormValues,
): TodoCreateValidationResult {
  const result = createTodoSchema.safeParse({
    description: values.description,
    owner_name: values.ownerName,
    priority: values.priority,
    status: values.status,
    title: values.title,
  });

  if (result.success) {
    return {
      success: true,
      todo: {
        description: result.data.description ?? '',
        ownerName: result.data.owner_name,
        priority: result.data.priority,
        status: result.data.status,
        title: result.data.title,
      },
    };
  }

  const errors: TodoCreateFieldErrors = {};

  for (const issue of result.error.issues) {
    const fieldName = getTodoCreateFieldName(issue.path[0]);

    if (fieldName) {
      errors[fieldName] ??= getTodoCreateFieldError(fieldName);
    }
  }

  return {
    fieldErrors: errors,
    success: false,
  };
}

export function useTodoCreateForm() {
  const [values, setValues] = useState<TodoCreateFormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<TodoCreateFieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setField = useCallback(function setField(
    name: keyof TodoCreateFormValues,
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
    setFieldErrors((current) => ({
      ...current,
      [name]: undefined,
    }));
    setSubmitError(null);
  }, []);

  const setStatus = useCallback(
    function setStatus(value: string) {
      if (todoStatuses.includes(value as TodoStatus)) {
        setField('status', value);
      }
    },
    [setField],
  );

  const setPriority = useCallback(
    function setPriority(value: string) {
      if (todoPriorities.includes(value as TodoPriority)) {
        setField('priority', value);
      }
    },
    [setField],
  );

  const validate = useCallback(
    function validate() {
      const validation = validateTodoCreateForm(values);

      if (!validation.success) {
        const fieldErrors = { ...validation.fieldErrors };

        if (!values.ownerName.trim()) {
          fieldErrors.ownerName = tDefault(
            'todo.validation.ownerRequired',
            'Owner is required.',
          );
        }

        if (!values.title.trim()) {
          fieldErrors.title = tDefault(
            'todo.validation.titleRequired',
            'Title is required.',
          );
        }

        setFieldErrors(fieldErrors);
        return validation;
      }

      setFieldErrors({});
      return validation;
    },
    [values],
  );

  const reset = useCallback(function reset() {
    setValues(initialValues);
    setFieldErrors({});
    setSubmitError(null);
  }, []);

  return {
    fieldErrors,
    reset,
    setField,
    setPriority,
    setStatus,
    setSubmitError,
    submitError,
    validate,
    values,
  };
}
