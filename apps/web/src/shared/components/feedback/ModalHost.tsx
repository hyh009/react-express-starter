type ModalViewState = {
  title: string
  message: string
  confirmLabel: string
  cancelLabel: string
  tone: 'info' | 'success' | 'error'
}

type ModalHostProps = {
  modal: ModalViewState | null
  onCancel: () => void
  onConfirm: () => void
}

export function ModalHost({ modal, onCancel, onConfirm }: ModalHostProps) {
  if (!modal) {
    return null
  }

  return (
    <div aria-modal="true" className="modal-backdrop" role="dialog">
      <section className={`modal-panel modal-${modal.tone}`}>
        <div>
          <h2>{modal.title}</h2>
          <p>{modal.message}</p>
        </div>
        <div className="modal-actions">
          <button className="secondary-button" onClick={onCancel} type="button">
            {modal.cancelLabel}
          </button>
          <button className="primary-button" onClick={onConfirm} type="button">
            {modal.confirmLabel}
          </button>
        </div>
      </section>
    </div>
  )
}
