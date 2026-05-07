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

export const todoService = {
  async listTodos() {
    return todoRepository.list();
  },

  async getTodo(todoId: string) {
    const todo = await todoRepository.findById(todoId);

    if (!todo) {
      throw createTodoNotFoundError();
    }

    return todo;
  },

  async createTodo(input: CreateTodoInput) {
    return todoRepository.create(input);
  },

  async updateTodo(todoId: string, input: UpdateTodoInput) {
    const todo = await todoRepository.update(todoId, input);

    if (!todo) {
      throw createTodoNotFoundError();
    }

    return todo;
  },

  async deleteTodo(todoId: string) {
    const deletedTodo = await todoRepository.delete(todoId);

    if (!deletedTodo) {
      throw createTodoNotFoundError();
    }

    return deletedTodo;
  },
};
