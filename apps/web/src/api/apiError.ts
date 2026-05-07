import type { ApiErrorResponse } from '@/models/apiError.types'

type ApiErrorInput = {
  statusCode: number
  code?: string
  message: string
  details?: unknown
  cause?: unknown
}

export class ApiError extends Error {
  readonly statusCode: number
  readonly code?: string
  readonly details?: unknown

  constructor(input: ApiErrorInput) {
    super(input.message)
    this.name = 'ApiError'
    this.statusCode = input.statusCode
    this.code = input.code
    this.details = input.details
    this.cause = input.cause
  }
}

export type ApiFailureReason = 'network' | 'server' | 'unknown'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  return (
    isRecord(value) &&
    value.status === 'error' &&
    typeof value.statusCode === 'number' &&
    typeof value.message === 'string'
  )
}

function getFallbackMessage(statusCode: number) {
  if (statusCode >= 500) {
    return 'The server could not complete the request.'
  }

  return 'The request could not be completed.'
}

export function normalizeApiError(input: {
  response: Response
  body: unknown
}): ApiError {
  const { response, body } = input

  if (isApiErrorResponse(body)) {
    return new ApiError({
      statusCode: body.statusCode,
      code: body.code,
      message: body.message,
      details: body.details,
    })
  }

  return new ApiError({
    statusCode: response.status,
    message: getFallbackMessage(response.status),
    details: body,
  })
}

export function normalizeNetworkError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error
  }

  return new ApiError({
    statusCode: 0,
    code: 'NETWORK_ERROR',
    message: 'Unable to reach the API.',
    cause: error,
  })
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

export function hasApiErrorCode(error: unknown, code: string) {
  return isApiError(error) && error.code === code
}

export function getApiFailureReason(error: unknown): ApiFailureReason {
  if (!isApiError(error)) {
    return 'unknown'
  }

  if (error.statusCode === 0) {
    return 'network'
  }

  if (error.statusCode >= 500) {
    return 'server'
  }

  return 'unknown'
}
