import type { TodoDto } from '@repo/shared';
import type { TodoEntity } from '@src/models/todo/model';

export function toTodoDto(todo: TodoEntity): TodoDto {
  return {
    id: todo.id,
    title: todo.title,
    description: todo.description ?? null,
    status: todo.status,
    priority: todo.priority,
    owner_name: todo.owner_name,
  };
}
