import { todoService } from '@/services/todo.service'
import type { TodoDetailActions } from '@/features/todo/actions/todoDetail.actions'

class TodoDetailPageWorkflow {
  private readonly todoDetailActions: TodoDetailActions

  constructor(todoDetailActions: TodoDetailActions) {
    this.todoDetailActions = todoDetailActions
  }

  async loadTodo(todoId: string) {
    this.todoDetailActions.startLoading()

    try {
      const todo = await todoService.getTodo(todoId)

      this.todoDetailActions.loadSuccess(todo)
    } catch {
      this.todoDetailActions.loadFailed('Failed to load todo item.')
    }
  }
}

export function createTodoDetailPageWorkflow(actions: TodoDetailActions) {
  return new TodoDetailPageWorkflow(actions)
}
