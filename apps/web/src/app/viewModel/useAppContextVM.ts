import { useStore } from 'zustand'
import { appContextStore } from '../stores/appContext.store'
import { appContextVM } from './appContext.vm'

export function useAppContextVM() {
  const appName = useStore(appContextStore, (state) => state.appName)
  const apiBaseUrl = useStore(appContextStore, (state) => state.apiBaseUrl)

  return {
    appName,
    apiBaseUrl,
    actions: appContextVM,
  }
}
