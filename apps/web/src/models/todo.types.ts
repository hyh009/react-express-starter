export type TodoStatus = 'todo' | 'in-progress' | 'done'

export type TodoPriority = 'low' | 'medium' | 'high'

export type Todo = {
  id: string
  title: string
  description: string
  status: TodoStatus
  priority: TodoPriority
  owner: string
}
