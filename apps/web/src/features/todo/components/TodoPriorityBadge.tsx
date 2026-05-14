import { todoModel } from '@/models/todo.model';
import { cn } from '@/shared/utils/cn';
import type { TodoPriority } from '@/models/todo.types';

type TodoPriorityBadgeProps = {
  priority: TodoPriority;
};

const priorityClassName: Record<TodoPriority, string> = {
  low: 'border-secondary bg-secondary text-secondary-foreground',
  medium: 'border-accent bg-accent text-accent-foreground',
  high: 'border-destructive/30 bg-destructive/10 text-destructive',
};

export function TodoPriorityBadge({ priority }: TodoPriorityBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-2.5 py-1 text-xs leading-none font-bold whitespace-nowrap',
        priorityClassName[priority],
      )}
    >
      {todoModel.getPriorityLabel(priority)}
    </span>
  );
}
