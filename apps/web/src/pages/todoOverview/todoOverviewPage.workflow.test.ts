import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiError } from '@/api/apiError'
import { todoService } from '@/services/todo.service'
import { createTodoOverviewPageWorkflow } from './todoOverviewPage.workflow'
import type { TodoOverviewActions } from '@/features/todo/actions/todoOverview.actions'

vi.mock('@/services/todo.service', () => ({
  todoService: {
    listTodos: vi.fn(),
  },
}))

function createActions() {
  return {
    startLoading: vi.fn(),
    loadSuccess: vi.fn(),
    loadFailed: vi.fn(),
  } satisfies TodoOverviewActions
}

describe('TodoOverviewPageWorkflow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('maps server errors into a failed result while storing the page error', async () => {
    const actions = createActions()
    const workflow = createTodoOverviewPageWorkflow(actions)

    vi.mocked(todoService.listTodos).mockRejectedValue(
      new ApiError({
        statusCode: 500,
        message: 'Internal server error',
      }),
    )

    await expect(workflow.loadTodos()).resolves.toEqual({
      status: 'failed',
      reason: 'server',
    })
    expect(actions.startLoading).toHaveBeenCalledOnce()
    expect(actions.loadFailed).toHaveBeenCalledWith('Failed to load todos.')
    expect(actions.loadSuccess).not.toHaveBeenCalled()
  })
})
