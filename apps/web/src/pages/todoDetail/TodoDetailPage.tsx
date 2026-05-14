import { useCallback } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router';
import { todoPriorities, todoStatuses } from '@repo/shared';
import { TodoStatusBadge } from '@/features/todo/components/TodoStatusBadge';
import { todoModel } from '@/models/todo.model';
import { LoadingState } from '@/shared/components/LoadingState';
import { Field } from '@/shared/components/form/Field';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { useTodoDetailPageVM } from './useTodoDetailPageVM';

export function TodoDetailPage() {
  const navigate = useNavigate();
  const { todoId } = useParams();
  const handleDeleted = useCallback(() => {
    navigate('/');
  }, [navigate]);
  const vm = useTodoDetailPageVM({
    onDeleted: handleDeleted,
    todoId,
  });

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    void vm.saveTodo();
  }

  async function handleDelete() {
    await vm.deleteTodo();
  }

  if (vm.isLoading) {
    return <LoadingState label="Loading todo detail" />;
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-8 md:px-8">
      <div className="mb-6">
        <Button
          onClick={() => {
            navigate('/');
          }}
          type="button"
          variant="ghost"
        >
          Back to overview
        </Button>
      </div>

      {vm.error ? (
        <p className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
          {vm.error}
        </p>
      ) : null}

      {vm.todo ? (
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_20rem]">
          <form
            className="grid gap-5 rounded-lg border border-border bg-card p-5 shadow-sm"
            onSubmit={handleSave}
          >
            <div>
              <p className="mb-2 text-xs font-bold tracking-[0.08em] text-primary uppercase">
                Todo detail
              </p>
              <h1 className="mb-3 text-3xl leading-tight font-bold text-foreground md:text-4xl">
                {vm.todo.title}
              </h1>
            </div>

            <Field label="Title" error={vm.formErrors.title} required>
              <Input
                value={vm.form.title}
                onChange={(event) => {
                  vm.setField('title', event.target.value);
                }}
              />
            </Field>

            <Field label="Owner" error={vm.formErrors.ownerName} required>
              <Input
                value={vm.form.ownerName}
                onChange={(event) => {
                  vm.setField('ownerName', event.target.value);
                }}
              />
            </Field>

            <Field label="Description">
              <Textarea
                value={vm.form.description}
                onChange={(event) => {
                  vm.setField('description', event.target.value);
                }}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium text-foreground">
                Status
                <select
                  className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm"
                  value={vm.form.status}
                  onChange={(event) => {
                    vm.setStatus(event.target.value);
                  }}
                >
                  {todoStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1.5 text-sm font-medium text-foreground">
                Priority
                <select
                  className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm"
                  value={vm.form.priority}
                  onChange={(event) => {
                    vm.setPriority(event.target.value);
                  }}
                >
                  {todoPriorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="submit">Save changes</Button>
              <Button
                onClick={handleDelete}
                type="button"
                variant="destructive"
              >
                Delete
              </Button>
            </div>
          </form>

          <aside className="self-start rounded-lg border border-border bg-card p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="m-0 text-lg font-semibold">Summary</h2>
              <TodoStatusBadge status={vm.todo.status} />
            </div>
            <dl className="grid gap-4 text-sm">
              <div className="border-t border-border pt-4">
                <dt className="font-semibold text-muted-foreground">Owner</dt>
                <dd className="m-0">{todoModel.getOwnerLabel(vm.todo)}</dd>
              </div>
              <div className="border-t border-border pt-4">
                <dt className="font-semibold text-muted-foreground">
                  Priority
                </dt>
                <dd className="m-0">{vm.todo.priority}</dd>
              </div>
              <div className="border-t border-border pt-4">
                <dt className="font-semibold text-muted-foreground">
                  Description
                </dt>
                <dd className="m-0">
                  {vm.todo.description || 'No description'}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      ) : null}
    </section>
  );
}
