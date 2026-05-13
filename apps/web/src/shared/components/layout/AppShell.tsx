import type { ReactNode } from 'react'
import { Link } from 'react-router'

type AppShellProps = {
  appName: string
  children: ReactNode
  healthUrl: string
  isAuthenticated: boolean
  onLogout: () => void
  onNavigateHome: () => void
  swaggerUrl: string
  username?: string
}

export function AppShell({
  appName,
  children,
  healthUrl,
  isAuthenticated,
  onLogout,
  onNavigateHome,
  swaggerUrl,
  username,
}: AppShellProps) {
  return (
    <div className="min-h-screen">
      <header className="flex min-h-16 items-center justify-between gap-4 border-b border-border bg-card px-5 py-3 md:px-8">
        <Link className="text-sm font-bold text-foreground" to="/">
          {appName}
        </Link>
        <nav
          className="flex flex-wrap items-center justify-end gap-3 text-sm font-semibold text-muted-foreground"
          aria-label="Main navigation"
        >
          {isAuthenticated ? (
            <button
              className="cursor-pointer border-0 bg-transparent p-0 font-semibold text-muted-foreground hover:text-primary"
              onClick={onNavigateHome}
              type="button"
            >
              Todos
            </button>
          ) : null}
          <a className="hover:text-primary" href={healthUrl}>
            API health
          </a>
          <a className="hover:text-primary" href={swaggerUrl}>
            Swagger docs
          </a>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {username ? (
                <span className="hidden text-foreground sm:inline">
                  {username}
                </span>
              ) : null}
              <button
                className="cursor-pointer border-0 bg-transparent p-0 font-semibold text-muted-foreground hover:text-primary"
                onClick={onLogout}
                type="button"
              >
                Logout
              </button>
            </div>
          ) : null}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}
