import { useEffect, useState } from 'react'
import { apiUrl } from '@/api'
import { healthPaths } from '@/api/paths/health.paths'
import { useAppContextVM } from '@/app/viewModel/useAppContextVM'
import { useFeedbackVM } from '@/app/viewModel/useFeedbackVM'
import { TodoDetailPage } from '@/pages/todoDetail/TodoDetailPage'
import { TodoOverviewPage } from '@/pages/todoOverview/TodoOverviewPage'
import { ModalHost } from '@/shared/components/feedback/ModalHost'
import { ToastHost } from '@/shared/components/feedback/ToastHost'
import { AppShell } from '@/shared/components/layout/AppShell'

type AppRoute =
  | {
      name: 'todo-overview'
    }
  | {
      name: 'todo-detail'
      todoId: string
    }

function getRouteFromLocation(): AppRoute {
  const detailMatch = window.location.pathname.match(/^\/todos\/([^/]+)$/)

  if (detailMatch?.[1]) {
    return {
      name: 'todo-detail',
      todoId: detailMatch[1],
    }
  }

  return {
    name: 'todo-overview',
  }
}

export function App() {
  const appContext = useAppContextVM()
  const feedback = useFeedbackVM()
  const [route, setRoute] = useState(getRouteFromLocation)

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRouteFromLocation())
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  function navigateToOverview() {
    window.history.pushState(null, '', '/')
    setRoute({
      name: 'todo-overview',
    })
  }

  function navigateToTodo(todoId: string) {
    window.history.pushState(null, '', `/todos/${todoId}`)
    setRoute({
      name: 'todo-detail',
      todoId,
    })
  }

  return (
    <AppShell
      appName={appContext.appName}
      healthUrl={apiUrl(healthPaths.status)}
      swaggerUrl={`${appContext.apiBaseUrl}/docs`}
    >
      {route.name === 'todo-detail' ? (
        <TodoDetailPage onBack={navigateToOverview} todoId={route.todoId} />
      ) : (
        <TodoOverviewPage onOpenTodo={navigateToTodo} />
      )}
      <ToastHost
        onDismiss={feedback.actions.dismissToast}
        toasts={feedback.toasts}
      />
      <ModalHost
        modal={feedback.modal}
        onCancel={() => {
          feedback.actions.closeModal(false)
        }}
        onConfirm={() => {
          feedback.actions.closeModal(true)
        }}
      />
    </AppShell>
  )
}
