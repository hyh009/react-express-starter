import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiError } from '@/api/apiError'
import { todoService } from '@/services/todo.service'
import { createTodoDetailPageWorkflow } from './todoDetailPage.workflow'
import type { TodoDetailActions } from '@/features/todo/actions/todoDetail.actions'

vi.mock('@/services/todo.service', () => ({
  todoService: {
    getTodo: vi.fn(),
  },
}))

function createActions() {
  return {
    startLoading: vi.fn(),
    loadSuccess: vi.fn(),
    loadFailed: vi.fn(),
  } satisfies TodoDetailActions
}

describe('TodoDetailPageWorkflow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('maps TODO_NOT_FOUND into a not-found page result', async () => {
    const actions = createActions()
    const workflow = createTodoDetailPageWorkflow(actions)

    vi.mocked(todoService.getTodo).mockRejectedValue(
      new ApiError({
        statusCode: 404,
        code: 'TODO_NOT_FOUND',
        message: 'Todo not found',
      }),
    )

    await expect(workflow.loadTodo('missing')).resolves.toEqual({
      status: 'not-found',
    })
    expect(actions.startLoading).toHaveBeenCalledOnce()
    expect(actions.loadSuccess).toHaveBeenCalledWith(null)
    expect(actions.loadFailed).not.toHaveBeenCalled()
  })

  it('maps network errors into a failed result while storing the page error', async () => {
    const actions = createActions()
    const workflow = createTodoDetailPageWorkflow(actions)

    vi.mocked(todoService.getTodo).mockRejectedValue(
      new ApiError({
        statusCode: 0,
        code: 'NETWORK_ERROR',
        message: 'Unable to reach the API.',
      }),
    )

    await expect(workflow.loadTodo('todo-1')).resolves.toEqual({
      status: 'failed',
      reason: 'network',
    })
    expect(actions.loadFailed).toHaveBeenCalledWith('Failed to load todo item.')
    expect(actions.loadSuccess).not.toHaveBeenCalled()
  })
})
