import { todoModel } from '@/models/todo.model';
import { cn } from '@/shared/utils/cn';
import type { TodoStatus } from '@/models/todo.types';

type TodoStatusBadgeProps = {
  status: TodoStatus;
};

const statusClassName: Record<TodoStatus, string> = {
  todo: 'bg-secondary text-secondary-foreground',
  'in-progress': 'bg-accent text-accent-foreground',
  done: 'bg-primary/10 text-primary',
};

export function TodoStatusBadge({ status }: TodoStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-1 text-xs leading-none font-bold whitespace-nowrap',
        statusClassName[status],
      )}
    >
      {todoModel.getStatusLabel(status)}
    </span>
  );
}
