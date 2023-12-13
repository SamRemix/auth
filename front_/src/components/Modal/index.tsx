import './styles.scss'

import Button from '../Button'

type ModalProps = {
  children?: React.ReactNode
  title: string
  toggle: () => void
  deleteAction?: () => void
}

const Modal = ({ children, title, toggle, deleteAction }: ModalProps) => {
  return (
    <div className="modal-container">
      <div className="backdrop" onClick={toggle} />

      <div className="modal">
        <h2 className="modal-title">{title}</h2>

        {deleteAction
          ? (
            <div className="delete-confirmation">
              <p>This process cannot be undone</p>

              <div className="delete-confirmation-buttons">
                <Button onClick={toggle}>Cancel</Button>

                <Button type="delete" onClick={deleteAction}>Delete</Button>
              </div>
            </div>
          )
          : children}
      </div>
    </div>
  )
}

export default Modal