import './styles.scss'

import { useContext, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { animation } from './motion.config'

import { XMarkIcon } from '@heroicons/react/24/outline'

import { ToastContext, ToastProps, ToastPropsWId } from '../../contexts/ToastContext'

const Toasts = () => {
  const [toasts, setToasts] = useState([] as ToastPropsWId[])
  const { pushToastRef } = useContext(ToastContext)

  pushToastRef.current = ({ ...props }: ToastProps) => {
    const toast = {
      ...props,
      id: Date.now(),
      duration: props.type === 'error' ? 5 : 3
    }

    setToasts(toasts => [...toasts, toast])

    setTimeout(() => {
      setToasts(toasts => (
        toasts.filter(({ id }) => id !== toast.id)
      ))
    }, toast.duration * 1000)
  }

  const removeToast = (id: number) => {
    setToasts(toasts => (
      toasts.filter(toast => toast.id !== id)
    ))
  }

  return (
    <motion.div className="toasts-container">
      <AnimatePresence mode="popLayout">
        {toasts.map(({ id, text, type = '', duration }) => (
          <motion.div
            key={id.toString()}
            layoutId={id.toString()}
            className={type === 'error' ? 'toast-error' : 'toast'}
            {...animation}>
            <p className="toast-content">{text}</p>

            <XMarkIcon
              className="remove"
              width="1.5rem"
              strokeWidth={1}
              onClick={() => removeToast(id)}
            />

            <div className="indicator" style={{ animationDuration: `${duration}s` }} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default Toasts