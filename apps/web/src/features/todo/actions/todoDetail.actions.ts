import type { Todo } from '@/models/todo.types'
import type { TodoDetailStore } from '../store/todoDetail.store'

export function createTodoDetailActions(todoDetailStore: TodoDetailStore) {
  return {
    startLoading() {
      todoDetailStore.setState({
        todo: null,
        isLoading: true,
        error: null,
      })
    },

    loadSuccess(todo: Todo | null) {
      todoDetailStore.setState({
        todo,
        error: todo ? null : 'Todo item was not found.',
        isLoading: false,
      })
    },

    loadFailed(message: string) {
      todoDetailStore.setState({
        error: message,
        isLoading: false,
      })
    },
  }
}

export type TodoDetailActions = ReturnType<typeof createTodoDetailActions>
