import { createContext, useEffect, useState } from 'react'

export type AuthContextProps = {
  auth: any | null,
  register: (auth: any) => void,
  logOut: () => void
}

export const AuthContext = createContext<AuthContextProps | null>(null)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState(null) as any

  const register = ({ user, token }: any) => {
    const isAdmin = user.role === 'ADMIN' ? true : false

    localStorage.setItem('auth', JSON.stringify({ user: user.id, isAdmin, token }))

    return setAuth({ user: user.id, isAdmin, token })
  }

  const logOut = () => {
    localStorage.removeItem('auth')

    return setAuth(null)
  }

  const store = localStorage.getItem('auth')

  useEffect(() => {
    if (!store) {
      return
    }

    setAuth(JSON.parse(store))
  }, [store])

  console.log('AUTH_CONTEXT', auth)

  return (
    <AuthContext.Provider value={{ auth, register, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider