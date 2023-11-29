import { useCallback, useContext } from 'react'

import { ToastContext, ToastProps } from '../contexts/ToastContext'

const useToast = () => {
  const { pushToastRef } = useContext(ToastContext)

  return {
    pushToast: useCallback((toast: ToastProps) => {
      pushToastRef.current(toast)
    }, [pushToastRef])
  }
}

export default useToast