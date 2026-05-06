import { useEffect } from 'react'
import { TodoStatusBadge } from '@/features/todo/components/TodoStatusBadge'
import { LoadingState } from '@/shared/components/LoadingState'
import { useTodoOverviewPageVM } from './useTodoOverviewPageVM'

type TodoOverviewPageProps = {
  onOpenTodo: (todoId: string) => void
}

export function TodoOverviewPage({ onOpenTodo }: TodoOverviewPageProps) {
  const vm = useTodoOverviewPageVM()

  useEffect(() => {
    void vm.actions.loadTodos()
  }, [vm.actions])

  if (vm.isLoading && vm.todos.length === 0) {
    return <LoadingState label="Loading todos" />
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Frontend architecture demo</p>
        <h1>Todo overview</h1>
        <p className="lead">
          This page uses a page VM hook, feature-level Zustand store, Todo VM,
          feature actions, and domain service.
        </p>
      </div>

      {vm.error ? <p className="error-message">{vm.error}</p> : null}

      <div className="todo-list" aria-label="Todo list">
        {vm.todos.map((todo) => (
          <button
            className="todo-row"
            key={todo.id}
            onClick={() => {
              onOpenTodo(todo.id)
            }}
            type="button"
          >
            <span>
              <strong>{todo.title}</strong>
              <small>{todo.owner}</small>
            </span>
            <TodoStatusBadge status={todo.status} />
          </button>
        ))}
      </div>
    </section>
  )
}
