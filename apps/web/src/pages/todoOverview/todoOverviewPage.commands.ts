import {
  getApiFailureReason,
  hasApiErrorCode,
} from '@/api/apiError'
import { todoService } from '@/services/todo.service'
import type { TodoOverviewActions } from '@/features/todo/actions/todoOverview.actions'
import type { ApiFailureReason } from '@/api/apiError'
import type { Todo, TodoStatus } from '@/models/todo.types'

export type LoadTodosFailureReason = ApiFailureReason
export type UpdateTodoStatusFailureReason = ApiFailureReason
export type DeleteTodoFailureReason = ApiFailureReason

export type LoadTodosResult =
  | {
      status: 'loaded'
    }
  | {
      status: 'failed'
      reason: LoadTodosFailureReason
    }

export type UpdateTodoStatusResult =
  | {
      status: 'updated'
    }
  | {
      status: 'failed'
      reason: UpdateTodoStatusFailureReason
    }

export type DeleteTodoResult =
  | {
      status: 'deleted'
    }
  | {
      status: 'not-found'
    }
  | {
      status: 'failed'
      reason: DeleteTodoFailureReason
    }

class TodoOverviewPageCommands {
  private readonly todoOverviewActions: TodoOverviewActions

  constructor(todoOverviewActions: TodoOverviewActions) {
    this.todoOverviewActions = todoOverviewActions
  }

  async loadTodos(): Promise<LoadTodosResult> {
    this.todoOverviewActions.startLoading()

    try {
      const todos = await todoService.listTodos()

      this.todoOverviewActions.loadSuccess(todos)
      return {
        status: 'loaded',
      }
    } catch (error) {
      const result = mapLoadTodosError(error)

      this.todoOverviewActions.loadFailed('Failed to load todos.')
      return result
    }
  }

  async updateTodoStatus(
    todo: Todo,
    status: TodoStatus,
  ): Promise<UpdateTodoStatusResult> {
    try {
      const updatedTodo = await todoService.saveTodo({
        ...todo,
        status,
      })

      this.todoOverviewActions.updateTodo(updatedTodo)
      return {
        status: 'updated',
      }
    } catch (error) {
      return {
        status: 'failed',
        reason: getApiFailureReason(error),
      }
    }
  }

  async deleteTodo(todoId: string): Promise<DeleteTodoResult> {
    try {
      await todoService.deleteTodo(todoId)

      this.todoOverviewActions.removeTodo(todoId)
      return {
        status: 'deleted',
      }
    } catch (error) {
      if (hasApiErrorCode(error, 'TODO_NOT_FOUND')) {
        this.todoOverviewActions.removeTodo(todoId)
        return {
          status: 'not-found',
        }
      }

      return {
        status: 'failed',
        reason: getApiFailureReason(error),
      }
    }
  }
}

function mapLoadTodosError(error: unknown): LoadTodosResult {
  return {
    status: 'failed',
    reason: getApiFailureReason(error),
  }
}

export function createTodoOverviewPageCommands(actions: TodoOverviewActions) {
  return new TodoOverviewPageCommands(actions)
}
