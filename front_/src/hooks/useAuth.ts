import { useContext } from 'react'

import { AuthContext, AuthContextProps } from '../contexts/AuthContext'

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext) as AuthContextProps

  const register = ({ user, token }: any) => {
    const isAdmin = user.role === 'ADMIN' ? true : false

    localStorage.setItem('auth', JSON.stringify({ user: user.id, isAdmin, token }))

    return setAuth({ user: user.id, isAdmin, token })
  }

  const logOut = () => {
    localStorage.removeItem('auth')

    return setAuth(null)
  }

  return { auth, register, logOut }
}

export default useAuth