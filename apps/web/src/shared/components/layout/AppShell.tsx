import type { ReactNode } from 'react'

type AppShellProps = {
  appName: string
  children: ReactNode
  healthUrl: string
  swaggerUrl: string
}

export function AppShell({
  appName,
  children,
  healthUrl,
  swaggerUrl,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <a className="brand" href="/">
          {appName}
        </a>
        <nav className="app-nav" aria-label="Main navigation">
          <a href="/">Todos</a>
          <a href={healthUrl}>API health</a>
          <a href={swaggerUrl}>Swagger docs</a>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}
