import { useState } from 'react'
import { useStore } from 'zustand'
import { createTodoDetailActions } from '@/features/todo/actions/todoDetail.actions'
import {
  createTodoDetailStore,
  type TodoDetailStore,
} from '@/features/todo/store/todoDetail.store'
import { createTodoDetailPageWorkflow } from './todoDetailPage.workflow'

function createTodoDetailPageContext() {
  const store = createTodoDetailStore()
  const actions = createTodoDetailActions(store)
  const workflow = createTodoDetailPageWorkflow(actions)

  return {
    actions: workflow,
    store,
  }
}

export function useTodoDetailPageVM() {
  const [{ actions, store }] = useState<{
    actions: ReturnType<typeof createTodoDetailPageWorkflow>
    store: TodoDetailStore
  }>(createTodoDetailPageContext)

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
