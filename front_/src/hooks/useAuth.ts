import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext, AuthContextProps } from '../contexts/AuthContext'

import useToast from './useToast'

const useAuth = () => {
  const navigate = useNavigate()

  const { setAuth } = useContext(AuthContext) as AuthContextProps

  const { pushToast } = useToast()

  return {
    register: ({ user, token, message }: any) => {
      const isAdmin = user.role.includes('ADMIN') ? true : false
      const isSuperAdmin = user.role === 'SUPER_ADMIN' ? true : false

      const auth = {
        user: user.id,
        isAdmin,
        isSuperAdmin,
        token
      }

      localStorage.setItem('auth', JSON.stringify(auth))

      setAuth(auth)

      pushToast({ text: message })

      navigate(isAdmin ? '/admin' : '/')
    },
    logOut: () => {
      localStorage.removeItem('auth')

      setAuth(null)

      navigate('/login')
    }
  }
}

export default useAuth