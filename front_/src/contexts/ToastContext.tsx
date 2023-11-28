import { createContext, useState } from 'react'

export type ToastProps = {
  id: Number
  text: String
  type: String
  duration: Number
}

export type ToastContextProps = {
  toasts: Array<ToastProps>
  setToasts: (toasts: any) => void
}

const init = {
  toasts: [],
  setToasts: (_toasts) => { }
} as ToastContextProps

export const ToastContext = createContext<ToastContextProps | null>(init)

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState(Array<ToastProps>)

  console.log('TOASTS', toasts)

  return (
    <ToastContext.Provider value={{ toasts, setToasts }}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider