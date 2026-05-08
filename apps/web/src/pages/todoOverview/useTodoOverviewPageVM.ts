import { useState } from 'react'
import { useStore } from 'zustand'
import { createTodoOverviewActions } from '@/features/todo/actions/todoOverview.actions'
import { createTodoOverviewStore } from '@/features/todo/store/todoOverview.store'
import { feedbackVM } from '@/app/viewModel/feedback.vm'
import { createTodoOverviewPageWorkflow } from './todoOverviewPage.workflow'
import type {
  LoadTodosFailureReason,
  LoadTodosResult,
} from './todoOverviewPage.workflow'

function showLoadTodosToast(result: LoadTodosResult) {
  if (result.status === 'loaded') {
    return
  }

  const messageByReason: Record<LoadTodosFailureReason, string> = {
    network: 'Check that the API server is running, then try again.',
    server: 'The todo service is temporarily unavailable.',
    'invalid-response': 'The API returned data this page cannot read.',
    unknown: 'Try again in a moment.',
  }

  feedbackVM.toast({
    tone: 'error',
    title: 'Could not load todos',
    message: messageByReason[result.reason],
  })
}

type TodoOverviewPageContext = ReturnType<typeof createTodoOverviewPageContext>

function createTodoOverviewPageContext() {
  const store = createTodoOverviewStore()
  const actions = createTodoOverviewActions(store)
  const workflow = createTodoOverviewPageWorkflow(actions)

  return {
    actions: {
      async loadTodos() {
        const result = await workflow.loadTodos()

        showLoadTodosToast(result)
      },
    },
    store,
  }
}

export function useTodoOverviewPageVM() {
  const [{ actions, store }] = useState<TodoOverviewPageContext>(
    createTodoOverviewPageContext,
  )

  const todos = useStore(store, (state) => state.todos)
  const isLoading = useStore(store, (state) => state.isLoading)
  const error = useStore(store, (state) => state.error)

  return {
    todos,
    isLoading,
    error,
    actions,
  }
}
