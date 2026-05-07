type ToastItem = {
  id: string
  tone: 'info' | 'success' | 'error'
  message: string
  title?: string
}

type ToastHostProps = {
  toasts: ToastItem[]
  onDismiss: (toastId: string) => void
}

export function ToastHost({ toasts, onDismiss }: ToastHostProps) {
  if (toasts.length === 0) {
    return null
  }

  return (
    <div aria-live="polite" className="toast-host">
      {toasts.map((toast) => (
        <section className={`toast toast-${toast.tone}`} key={toast.id}>
          <div>
            {toast.title ? <strong>{toast.title}</strong> : null}
            <p>{toast.message}</p>
          </div>
          <button
            aria-label="Dismiss notification"
            className="icon-button"
            onClick={() => {
              onDismiss(toast.id)
            }}
            type="button"
          >
            x
          </button>
        </section>
      ))}
    </div>
  )
}
