import { afterEach, describe, expect, it, vi } from 'vitest'
import { apiJson } from '.'

describe('apiJson', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns parsed JSON for successful responses', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ status: 'success', data: { id: '1' } }), {
          status: 200,
        }),
      ),
    )

    await expect(apiJson('/todos/1')).resolves.toEqual({
      status: 'success',
      data: { id: '1' },
    })
  })

  it('throws an ApiError with backend response fields for failed responses', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            status: 'error',
            statusCode: 404,
            code: 'TODO_NOT_FOUND',
            message: 'Todo not found',
          }),
          { status: 404 },
        ),
      ),
    )

    await expect(apiJson('/todos/missing')).rejects.toMatchObject({
      name: 'ApiError',
      statusCode: 404,
      code: 'TODO_NOT_FOUND',
      message: 'Todo not found',
    })
  })

  it('preserves validation details for failed validation responses', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            status: 'error',
            statusCode: 400,
            code: 'VALIDATION_ERROR',
            message: 'Invalid request body',
            details: [{ path: 'title', message: 'Required' }],
          }),
          { status: 400 },
        ),
      ),
    )

    await expect(apiJson('/todos')).rejects.toMatchObject({
      name: 'ApiError',
      statusCode: 400,
      code: 'VALIDATION_ERROR',
      message: 'Invalid request body',
      details: [{ path: 'title', message: 'Required' }],
    })
  })

  it('throws an invalid-response ApiError when JSON cannot be parsed', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('not-json', { status: 200 })),
    )

    await expect(apiJson('/todos')).rejects.toMatchObject({
      name: 'ApiError',
      statusCode: 200,
      code: 'INVALID_API_RESPONSE',
      message: 'The API returned an invalid response.',
    })
  })

  it('throws a network ApiError when fetch rejects', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new TypeError('Failed to fetch')),
    )

    await expect(apiJson('/todos')).rejects.toMatchObject({
      name: 'ApiError',
      statusCode: 0,
      code: 'NETWORK_ERROR',
      message: 'Unable to reach the API.',
    })
  })
})
