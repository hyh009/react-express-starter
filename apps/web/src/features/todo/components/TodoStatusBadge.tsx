import type { TodoStatus } from '@/models/todo.types'

type TodoStatusBadgeProps = {
  status: TodoStatus
}

const statusLabel: Record<TodoStatus, string> = {
  todo: 'Todo',
  'in-progress': 'In progress',
  done: 'Done',
}

export function TodoStatusBadge({ status }: TodoStatusBadgeProps) {
  return (
    <span className={`status-badge status-badge-${status}`}>
      {statusLabel[status]}
    </span>
  )
}
