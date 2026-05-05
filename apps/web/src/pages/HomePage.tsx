import { getHealthUrl } from '@/services/health'

const stackItems = ['React 19', 'Vite', 'TypeScript', 'Express API']

export function HomePage() {
  return (
    <section className="home-page">
      <div className="hero">
        <p className="eyebrow">Full-stack template</p>
        <h1>React frontend ready for your Express backend.</h1>
        <p className="lead">
          This web app is wired as a TypeScript Vite workspace package and set up
          with a small structure for pages, layout components, and API services.
        </p>
        <div className="actions">
          <a className="primary-link" href={getHealthUrl()}>
            API health
          </a>
          <a className="secondary-link" href="http://localhost:9000/docs">
            Swagger docs
          </a>
        </div>
      </div>

      <div className="info-grid" id="stack">
        {stackItems.map((item) => (
          <article className="info-card" key={item}>
            <h2>{item}</h2>
            <p>Configured in the `web` workspace package.</p>
          </article>
        ))}
      </div>

      <section className="api-panel" id="api">
        <div>
          <p className="eyebrow">Backend connection</p>
          <h2>Default API base URL</h2>
        </div>
        <code>{import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:9000'}</code>
      </section>
    </section>
  )
}
