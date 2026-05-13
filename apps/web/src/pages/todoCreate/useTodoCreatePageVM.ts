import { useCallback, useState } from 'react'
import { feedbackVM } from '@/app/viewModel/feedback.vm'
import {
  createTodoCreatePageCommands,
  type CreateTodoFailureReason,
  type CreateTodoResult,
} from './todoCreatePage.commands'
import { useTodoCreateForm } from './useTodoCreateForm'

type TodoCreatePageContext = ReturnType<typeof createTodoCreatePageContext>

type UseTodoCreatePageVMOptions = {
  onCreated: (todoId: string) => void
}

function showCreateTodoToast(result: CreateTodoResult) {
  if (result.status === 'created') {
    feedbackVM.toast({
      tone: 'success',
      title: 'Todo created',
      message: 'The new todo is ready to edit.',
    })
    return
  }

  const messageByReason: Record<CreateTodoFailureReason, string> = {
    network: 'Check that the API server is running, then try again.',
    server: 'The todo service is temporarily unavailable.',
    'invalid-response': 'The API returned data this page cannot read.',
    unknown: 'Check the form and try again.',
  }

  feedbackVM.toast({
    tone: 'error',
    title: 'Could not create todo',
    message: messageByReason[result.reason],
  })
}

function createTodoCreatePageContext() {
  const commands = createTodoCreatePageCommands()

  return {
    commands,
  }
}

export function useTodoCreatePageVM({
  onCreated,
}: UseTodoCreatePageVMOptions) {
  const [{ commands }] = useState<TodoCreatePageContext>(
    createTodoCreatePageContext,
  )
  const form = useTodoCreateForm()
  const {
    reset,
    setSubmitError,
    validate,
    values,
  } = form
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createTodo = useCallback(async function createTodo() {
    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    const result = await commands.createTodo({
      ...values,
      description: values.description.trim(),
      ownerName: values.ownerName.trim(),
      title: values.title.trim(),
    })

    setIsSubmitting(false)
    showCreateTodoToast(result)

    if (result.status === 'created') {
      reset()
      onCreated(result.todoId)
      return
    }

    setSubmitError('Could not create todo.')
  }, [commands, onCreated, reset, setSubmitError, validate, values])

  return {
    createTodo,
    form,
    isSubmitting,
  }
}
