import { useState } from 'react'
import { useStore } from 'zustand'
import { createTodoDetailActions } from '@/features/todo/actions/todoDetail.actions'
import { createTodoDetailStore } from '@/features/todo/store/todoDetail.store'
import { createTodoDetailPageWorkflow } from './todoDetailPage.workflow'
import { feedbackVM } from '@/app/viewModel/feedback.vm'

import type {
  LoadTodoFailureReason,
  LoadTodoResult,
} from './todoDetailPage.workflow'

function showLoadTodoToast(result: LoadTodoResult) {
  if (result.status === 'loaded') {
    return
  }

  if (result.status === 'not-found') {
    feedbackVM.toast({
      tone: 'info',
      title: 'Todo not found',
      message: 'This todo may have been deleted or moved.',
    })
    return
  }

  const messageByReason: Record<LoadTodoFailureReason, string> = {
    network: 'Check that the API server is running, then try again.',
    server: 'The todo service is temporarily unavailable.',
    'invalid-response': 'The API returned data this page cannot read.',
    unknown: 'Try again in a moment.',
  }

  feedbackVM.toast({
    tone: 'error',
    title: 'Could not load todo',
    message: messageByReason[result.reason],
  })
}

type TodoDetailPageContext = ReturnType<typeof createTodoDetailPageContext>

function createTodoDetailPageContext() {
  const store = createTodoDetailStore()
  const actions = createTodoDetailActions(store)
  const workflow = createTodoDetailPageWorkflow(actions)

  return {
    actions: {
      async loadTodo(todoId: string) {
        const result = await workflow.loadTodo(todoId)

        showLoadTodoToast(result)
      },
    },
    store,
  }
}

export function useTodoDetailPageVM() {
  const [{ actions, store }] = useState<TodoDetailPageContext>(
    createTodoDetailPageContext,
  )

  const todo = useStore(store, (state) => state.todo)
  const isLoading = useStore(store, (state) => state.isLoading)
  const error = useStore(store, (state) => state.error)

  return {
    todo,
    isLoading,
    error,
    actions,
  }
}
