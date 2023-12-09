import './styles.scss'

type ModalProps = {
  children: React.ReactNode
  title: string
  toggle: () => void
}

const Modal = ({ children, title, toggle }: ModalProps) => {
  return (
    <div className="modal-container">
      <div className="backdrop" onClick={toggle} />

      <div className="modal">
        <h2 className="modal-title">{title}</h2>

        {children}
      </div>
    </div>
  )
}

export default Modal