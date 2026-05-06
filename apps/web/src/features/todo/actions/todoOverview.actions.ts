import type { Todo } from '@/models/todo.types'
import type { TodoOverviewStore } from '../store/todoOverview.store'

export function createTodoOverviewActions(todoOverviewStore: TodoOverviewStore) {
  return {
    startLoading() {
      todoOverviewStore.setState({
        isLoading: true,
        error: null,
      })
    },

    loadSuccess(todos: Todo[]) {
      todoOverviewStore.setState({
        todos,
        isLoading: false,
      })
    },

    loadFailed(message: string) {
      todoOverviewStore.setState({
        error: message,
        isLoading: false,
      })
    },
  }
}

export type TodoOverviewActions = ReturnType<typeof createTodoOverviewActions>
