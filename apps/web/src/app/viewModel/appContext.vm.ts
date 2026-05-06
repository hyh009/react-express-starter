import { appContextStore } from '../stores/appContext.store'

class AppContextVM {
  getApiBaseUrl() {
    return appContextStore.getState().apiBaseUrl
  }
}

export const appContextVM = new AppContextVM()
