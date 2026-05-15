import { useCallback, useState } from 'react';
import { tDefault } from '@/app/i18n';
import { feedbackVM } from '@/app/viewModel/feedback.vm';
import {
  createTodoCreatePageCommands,
  type CreateTodoFailureReason,
  type CreateTodoResult,
} from './todoCreatePage.commands';
import { useTodoCreateForm } from './useTodoCreateForm';

type TodoCreatePageContext = ReturnType<typeof createTodoCreatePageContext>;

type UseTodoCreatePageVMOptions = {
  onCreated: (todoId: string) => void;
};

function showCreateTodoToast(result: CreateTodoResult) {
  if (result.status === 'created') {
    feedbackVM.toast({
      tone: 'success',
      title: tDefault('todo.toast.created.title', 'Todo created'),
      message: tDefault(
        'todo.toast.created.message',
        'The new todo is ready to edit.',
      ),
    });
    return;
  }

  const messageByReason: Record<CreateTodoFailureReason, string> = {
    network: tDefault(
      'common.errors.checkApiServer',
      'Check that the API server is running, then try again.',
    ),
    server: tDefault(
      'common.errors.apiServerUnavailable',
      'The todo service is temporarily unavailable.',
    ),
    'invalid-response': tDefault(
      'common.errors.apiInvalidResponse',
      'The API returned data this page cannot read.',
    ),
    unknown: tDefault(
      'todo.toast.validationFailed',
      'Check the form and try again.',
    ),
  };

  feedbackVM.toast({
    tone: 'error',
    title: tDefault('todo.toast.createFailed.title', 'Could not create todo'),
    message: messageByReason[result.reason],
  });
}

function createTodoCreatePageContext() {
  const commands = createTodoCreatePageCommands();

  return {
    commands,
  };
}

export function useTodoCreatePageVM({ onCreated }: UseTodoCreatePageVMOptions) {
  const [{ commands }] = useState<TodoCreatePageContext>(
    createTodoCreatePageContext,
  );
  const form = useTodoCreateForm();
  const { reset, setSubmitError, validate } = form;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createTodo = useCallback(
    async function createTodo() {
      const validation = validate();

      if (!validation.success) {
        setSubmitError(
          tDefault(
            'todo.create.validationError',
            'Check the highlighted fields and try again.',
          ),
        );
        return;
      }

      setIsSubmitting(true);

      const result = await commands.createTodo(validation.todo);

      setIsSubmitting(false);
      showCreateTodoToast(result);

      if (result.status === 'created') {
        reset();
        onCreated(result.todoId);
        return;
      }

      setSubmitError(
        tDefault('todo.create.submitError', 'Could not create todo.'),
      );
    },
    [commands, onCreated, reset, setSubmitError, validate],
  );

  return {
    createTodo,
    form,
    isSubmitting,
  };
}
