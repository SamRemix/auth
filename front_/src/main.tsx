import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

import './styles/globals.scss'

import AuthProvider from './contexts/AuthContext'
import ToastProvider from './contexts/ToastContext'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
)
