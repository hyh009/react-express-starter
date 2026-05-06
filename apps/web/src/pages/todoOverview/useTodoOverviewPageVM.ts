import { useState } from 'react'
import { useStore } from 'zustand'
import { createTodoOverviewActions } from '@/features/todo/actions/todoOverview.actions'
import {
  createTodoOverviewStore,
  type TodoOverviewStore,
} from '@/features/todo/store/todoOverview.store'
import { createTodoOverviewPageWorkflow } from './todoOverviewPage.workflow'

function createTodoOverviewPageContext() {
  const store = createTodoOverviewStore()
  const actions = createTodoOverviewActions(store)
  const workflow = createTodoOverviewPageWorkflow(actions)

  return {
    actions: workflow,
    store,
  }
}

export function useTodoOverviewPageVM() {
  const [{ actions, store }] = useState<{
    actions: ReturnType<typeof createTodoOverviewPageWorkflow>
    store: TodoOverviewStore
  }>(createTodoOverviewPageContext)

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
