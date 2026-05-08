import { getApiFailureReason } from '@/api/apiError'
import { todoService } from '@/services/todo.service'
import type { TodoOverviewActions } from '@/features/todo/actions/todoOverview.actions'
import type { ApiFailureReason } from '@/api/apiError'

export type LoadTodosFailureReason = ApiFailureReason

export type LoadTodosResult =
  | {
      status: 'loaded'
    }
  | {
      status: 'failed'
      reason: LoadTodosFailureReason
    }

class TodoOverviewPageWorkflow {
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
}

function mapLoadTodosError(error: unknown): LoadTodosResult {
  return {
    status: 'failed',
    reason: getApiFailureReason(error),
  }
}

export function createTodoOverviewPageWorkflow(actions: TodoOverviewActions) {
  return new TodoOverviewPageWorkflow(actions)
}
