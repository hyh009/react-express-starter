import { apiUrl } from '@/services/apiClient'

export function getHealthUrl() {
  return apiUrl('/api/v1/health')
}
