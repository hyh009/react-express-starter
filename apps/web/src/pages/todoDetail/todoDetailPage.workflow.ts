import {
  getApiFailureReason,
  hasApiErrorCode,
} from '@/api/apiError'
import { todoService } from '@/services/todo.service'
import type { TodoDetailActions } from '@/features/todo/actions/todoDetail.actions'
import type { ApiFailureReason } from '@/api/apiError'

export type LoadTodoFailureReason = ApiFailureReason

export type LoadTodoResult =
  | {
      status: 'loaded'
    }
  | {
      status: 'not-found'
    }
  | {
      status: 'failed'
      reason: LoadTodoFailureReason
    }

class TodoDetailPageWorkflow {
  private readonly todoDetailActions: TodoDetailActions

  constructor(todoDetailActions: TodoDetailActions) {
    this.todoDetailActions = todoDetailActions
  }

  async loadTodo(todoId: string): Promise<LoadTodoResult> {
    this.todoDetailActions.startLoading()

    try {
      const todo = await todoService.getTodo(todoId)

      this.todoDetailActions.loadSuccess(todo)

      return {
        status: 'loaded',
      }
    } catch (error) {
      const result = mapLoadTodoError(error)

      if (result.status === 'not-found') {
        this.todoDetailActions.loadSuccess(null)
        return result
      }

      this.todoDetailActions.loadFailed('Failed to load todo item.')
      return result
    }
  }
}

function mapLoadTodoError(error: unknown): LoadTodoResult {
  if (hasApiErrorCode(error, 'TODO_NOT_FOUND')) {
    return {
      status: 'not-found',
    }
  }

  return {
    status: 'failed',
    reason: getApiFailureReason(error),
  }
}

export function createTodoDetailPageWorkflow(actions: TodoDetailActions) {
  return new TodoDetailPageWorkflow(actions)
}
