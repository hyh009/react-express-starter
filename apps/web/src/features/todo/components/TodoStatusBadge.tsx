import { todoModel } from '@/models/todo.model'
import type { TodoStatus } from '@/models/todo.types'

type TodoStatusBadgeProps = {
  status: TodoStatus
}

export function TodoStatusBadge({ status }: TodoStatusBadgeProps) {
  return (
    <span className={`status-badge status-badge-${status}`}>
      {todoModel.getStatusLabel(status)}
    </span>
  )
}
