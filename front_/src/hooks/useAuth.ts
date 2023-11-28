import { useContext } from 'react'

import { useNavigate } from 'react-router-dom'

import { AuthContext, AuthContextProps } from '../contexts/AuthContext'

const useAuth = () => {
  const navigate = useNavigate()

  const { auth, setAuth } = useContext(AuthContext) as AuthContextProps

  const register = ({ user, token }: any) => {
    const isAdmin = user.role === 'ADMIN' ? true : false

    localStorage.setItem('auth', JSON.stringify({ user: user.id, isAdmin, token }))

    setAuth({ user: user.id, isAdmin, token })

    navigate(isAdmin ? '/admin' : '/')
  }

  const logOut = () => {
    localStorage.removeItem('auth')

    setAuth(null)

    navigate('/login')
  }

  return { auth, register, logOut }
}

export default useAuth