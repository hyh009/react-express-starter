import { toDeleteTodoResponse, toTodoDto } from '@src/models/todo/mapper';
import { todoRepository } from '@src/repositories/todo/repository';
import { ERROR_CODES } from '@src/utils/errorCode';
import { NotFoundError } from '@src/utils/errors';

import type {
  CreateTodoInput,
  UpdateTodoInput,
} from '@src/repositories/todo/repository';

function createTodoNotFoundError() {
  return new NotFoundError('Todo not found', ERROR_CODES.TODO_NOT_FOUND);
}

export class TodoService {
  public async listTodos() {
    const todos = await todoRepository.list();

    return todos.map(toTodoDto);
  }

  public async getTodo(todoId: string) {
    const todo = await todoRepository.findById(todoId);

    if (!todo) {
      throw createTodoNotFoundError();
    }

    return toTodoDto(todo);
  }

  public async createTodo(input: CreateTodoInput) {
    const todo = await todoRepository.create(input);

    return toTodoDto(todo);
  }

  public async updateTodo(todoId: string, input: UpdateTodoInput) {
    const todo = await todoRepository.update(todoId, input);

    if (!todo) {
      throw createTodoNotFoundError();
    }

    return toTodoDto(todo);
  }

  public async deleteTodo(todoId: string) {
    const deletedTodo = await todoRepository.delete(todoId);

    if (!deletedTodo) {
      throw createTodoNotFoundError();
    }

    return toDeleteTodoResponse(deletedTodo);
  }
}

export function createTodoService() {
  return new TodoService();
}

export const todoService = createTodoService();
