type LoadingStateProps = {
  label: string
}

export function LoadingState({ label }: LoadingStateProps) {
  return (
    <section className="page-section">
      <div className="loading-state" role="status">
        {label}
      </div>
    </section>
  )
}
