const defaultBaseUrl = 'http://localhost:9000'

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? defaultBaseUrl

export function apiUrl(path: string) {
  return new URL(path, apiBaseUrl).toString()
}
