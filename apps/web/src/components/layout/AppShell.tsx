import type { ReactNode } from 'react'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <a className="brand" href="/">
          React Express Starter
        </a>
        <nav className="app-nav" aria-label="Main navigation">
          <a href="/#api">API</a>
          <a href="/#stack">Stack</a>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}
