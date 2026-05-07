export type TodoStatus = 'todo' | 'in-progress' | 'done'

export type TodoPriority = 'low' | 'medium' | 'high'

export type Todo = {
  id: string
  title: string
  description: string
  status: TodoStatus
  priority: TodoPriority
  ownerName: string
}

export type TodoDto = {
  id: string
  title: string
  description?: string | null
  status: TodoStatus
  priority: TodoPriority
  owner_name: string
}

export type TodoRequest = {
  id: string
  title: string
  description: string
  status: TodoStatus
  priority: TodoPriority
  owner_name: string
}
