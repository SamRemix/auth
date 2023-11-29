import { createContext, useRef } from 'react'

import Toasts from '../components/Toasts'

export type ToastProps = {
  text: string
  type?: string
}

export type ToastPropsWId = ToastProps & { id: number, duration: number }

const defaultPush = (_toast: ToastProps) => { }

const defaultValue = {
  pushToastRef: {
    current: defaultPush
  }
}

export const ToastContext = createContext(defaultValue)

const ToastProvider = ({ children }: React.PropsWithChildren) => {
  const pushToastRef = useRef(defaultPush)

  return (
    <ToastContext.Provider value={{ pushToastRef }}>
      <Toasts />

      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider