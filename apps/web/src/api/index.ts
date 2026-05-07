import { normalizeApiError, normalizeNetworkError } from './apiError'

const defaultBaseUrl = 'http://localhost:9000'
const apiPathPrefix = '/api'

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? defaultBaseUrl

function joinApiPath(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return `${apiPathPrefix}${normalizedPath}`
}

export function apiUrl(path: string) {
  return new URL(joinApiPath(path), apiBaseUrl).toString()
}

async function parseJson(response: Response) {
  const text = await response.text()

  if (!text) {
    return null
  }

  return JSON.parse(text) as unknown
}

export async function apiJson<TData>(
  path: string,
  init?: RequestInit,
): Promise<TData> {
  try {
    const headers = new Headers(init?.headers)

    if (!headers.has('Accept')) {
      headers.set('Accept', 'application/json')
    }

    const response = await fetch(apiUrl(path), {
      ...init,
      headers,
    })
    const body = await parseJson(response)

    if (!response.ok) {
      throw normalizeApiError({
        response,
        body,
      })
    }

    return body as TData
  } catch (error) {
    throw normalizeNetworkError(error)
  }
}
