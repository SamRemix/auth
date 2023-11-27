import './styles.scss'

import useToast from '../../hooks/useToast'

import { XMarkIcon } from '@heroicons/react/24/outline'

const Toasts = () => {
  const { toasts, removeToast } = useToast()

  return (
    <div className="toast-container">
      {toasts.map(({ id, text, type, duration }) => (
        <div
          key={id.toString()}
          className={type === 'error' ? 'toast-error' : 'toast'}>
          <p className="toast-content">{text}</p>

          <XMarkIcon
            className="remove"
            width="1.5rem"
            strokeWidth={1}
            onClick={() => removeToast(id)}
          />

          <div className="indicator" style={{ animationDuration: `${duration}s` }} />
        </div>
      ))}
    </div>
  )
}

export default Toasts