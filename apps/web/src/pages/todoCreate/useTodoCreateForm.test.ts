import { describe, expect, it } from 'vitest';
import { validateTodoCreateForm } from './useTodoCreateForm';

describe('validateTodoCreateForm', () => {
  it('normalizes valid todo create values for submission', () => {
    expect(
      validateTodoCreateForm({
        description: ' Draft starter docs ',
        ownerName: ' Hsinyao ',
        priority: 'medium',
        status: 'todo',
        title: ' Write docs ',
      }),
    ).toEqual({
      success: true,
      todo: {
        description: 'Draft starter docs',
        ownerName: 'Hsinyao',
        priority: 'medium',
        status: 'todo',
        title: 'Write docs',
      },
    });
  });

  it('rejects blank required fields before submit commands run', () => {
    expect(
      validateTodoCreateForm({
        description: '',
        ownerName: ' ',
        priority: 'medium',
        status: 'todo',
        title: ' ',
      }),
    ).toMatchObject({
      fieldErrors: {
        ownerName: 'Owner is required.',
        title: 'Title is required.',
      },
      success: false,
    });
  });
});
