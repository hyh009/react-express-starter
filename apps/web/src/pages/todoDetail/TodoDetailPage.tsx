import { useEffect } from 'react'
import { TodoStatusBadge } from '@/features/todo/components/TodoStatusBadge'
import { LoadingState } from '@/shared/components/LoadingState'
import { useTodoDetailPageVM } from './useTodoDetailPageVM'

type TodoDetailPageProps = {
  todoId: string
  onBack: () => void
}

export function TodoDetailPage({ todoId, onBack }: TodoDetailPageProps) {
  const vm = useTodoDetailPageVM()

  useEffect(() => {
    void vm.actions.loadTodo(todoId)
  }, [todoId, vm.actions])

  if (vm.isLoading) {
    return <LoadingState label="Loading todo detail" />
  }

  return (
    <section className="page-section">
      <button className="text-button" onClick={onBack} type="button">
        Back to overview
      </button>

      {vm.error ? <p className="error-message">{vm.error}</p> : null}

      {vm.todo ? (
        <article className="detail-panel">
          <div className="detail-header">
            <div>
              <p className="eyebrow">Todo detail</p>
              <h1>{vm.todo.title}</h1>
            </div>
            <TodoStatusBadge status={vm.todo.status} />
          </div>

          <dl className="detail-list">
            <div>
              <dt>Owner</dt>
              <dd>{vm.todo.owner}</dd>
            </div>
            <div>
              <dt>Priority</dt>
              <dd>{vm.todo.priority}</dd>
            </div>
            <div>
              <dt>Description</dt>
              <dd>{vm.todo.description}</dd>
            </div>
          </dl>
        </article>
      ) : null}
    </section>
  )
}
