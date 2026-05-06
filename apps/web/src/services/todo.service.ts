import type { Todo } from '@/models/todo.types'

const todos: Todo[] = [
  {
    id: 'design-frontend-architecture',
    title: 'Design frontend architecture',
    description:
      'Document the React, Zustand, VM hook, store, and service boundaries for future agents.',
    status: 'done',
    priority: 'high',
    owner: 'Frontend',
  },
  {
    id: 'build-todo-overview',
    title: 'Build Todo overview page',
    description:
      'Create a small domain feature that demonstrates page VM hooks and feature-level state.',
    status: 'in-progress',
    priority: 'medium',
    owner: 'Frontend',
  },
  {
    id: 'connect-health-api',
    title: 'Keep API health link available',
    description:
      'Expose the API base URL and health endpoint from the frontend API layer.',
    status: 'todo',
    priority: 'low',
    owner: 'Full stack',
  },
]

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export const todoService = {
  async listTodos() {
    await wait(180)
    return todos
  },

  async getTodo(todoId: string) {
    await wait(120)
    return todos.find((todo) => todo.id === todoId) ?? null
  },
}
