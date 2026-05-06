import { createStore } from 'zustand/vanilla'

export type AppContextState = {
  appName: string
  apiBaseUrl: string
}

export const appContextStore = createStore<AppContextState>(() => ({
  appName: 'React Express Starter',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:9000',
}))
