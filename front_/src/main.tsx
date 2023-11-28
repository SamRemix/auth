import './styles/globals.scss'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'

import App from './App'

import AuthProvider from './contexts/AuthContext'
import ToastProvider from './contexts/ToastContext'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
)
