import type { Todo, TodoDto, TodoRequest, TodoStatus } from './todo.types'

const statusLabel: Record<TodoStatus, string> = {
  todo: 'Todo',
  'in-progress': 'In progress',
  done: 'Done',
}

export const todoModel = {
  deserialize(dto: TodoDto): Todo {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description ?? '',
      status: dto.status,
      priority: dto.priority,
      ownerName: dto.owner_name,
    }
  },

  serialize(todo: Todo): TodoRequest {
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      status: todo.status,
      priority: todo.priority,
      owner_name: todo.ownerName,
    }
  },

  getStatusLabel(status: TodoStatus) {
    return statusLabel[status]
  },

  getOwnerLabel(todo: Todo) {
    return todo.ownerName
  },
}
