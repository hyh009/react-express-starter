import { useEffect, useState } from 'react'
import { apiUrl } from '@/api'
import { healthPaths } from '@/api/paths/health.paths'
import { useAppContextVM } from '@/app/viewModel/useAppContextVM'
import { TodoDetailPage } from '@/pages/todoDetail/TodoDetailPage'
import { TodoOverviewPage } from '@/pages/todoOverview/TodoOverviewPage'
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
    </AppShell>
  )
}
