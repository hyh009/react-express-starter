export const todoStatuses = ['todo', 'in-progress', 'done'] as const;
export const todoPriorities = ['low', 'medium', 'high'] as const;

export type TodoStatus = (typeof todoStatuses)[number];
export type TodoPriority = (typeof todoPriorities)[number];

export type TodoEntity = {
  id: string;
  title: string;
  description?: string | null;
  status: TodoStatus;
  priority: TodoPriority;
  owner_name: string;
};
