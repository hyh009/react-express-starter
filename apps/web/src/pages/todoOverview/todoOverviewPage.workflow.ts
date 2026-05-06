import { todoService } from '@/services/todo.service'
import type { TodoOverviewActions } from '@/features/todo/actions/todoOverview.actions'

class TodoOverviewPageWorkflow {
  private readonly todoOverviewActions: TodoOverviewActions

  constructor(todoOverviewActions: TodoOverviewActions) {
    this.todoOverviewActions = todoOverviewActions
  }

  async loadTodos() {
    this.todoOverviewActions.startLoading()

    try {
      const todos = await todoService.listTodos()

      this.todoOverviewActions.loadSuccess(todos)
    } catch {
      this.todoOverviewActions.loadFailed('Failed to load todos.')
    }
  }
}

export function createTodoOverviewPageWorkflow(actions: TodoOverviewActions) {
  return new TodoOverviewPageWorkflow(actions)
}
