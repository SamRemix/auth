import { useContext } from 'react'

import { ToastContext, ToastContextProps, ToastProps } from '../contexts/ToastContext'

const useToast = () => {
  const { toasts, setToasts } = useContext(ToastContext) as ToastContextProps


  const addToast = (text: String, type = '') => {
    const toast = { id: Date.now(), text, type, duration: type === 'error' ? 5 : 3 }

    setToasts((toasts: ToastProps[]) => [...toasts, toast])

    setTimeout(() => {
      setToasts((toasts: ToastProps[]) => (
        toasts.filter(({ id }) => id !== toast.id)
      ))
    }, toast.duration * 1000)
  }

  const removeToast = (id: Number) => {
    setToasts((toasts: ToastProps[]) => (
      toasts.filter((toast: { id: Number }) => toast.id !== id)
    ))
  }

  return { toasts, addToast, removeToast }
}

export default useToast