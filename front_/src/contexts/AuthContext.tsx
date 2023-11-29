import { createContext, useEffect, useState } from 'react'

export type AuthContextProps = {
  auth: any | null
  setAuth: (user: any) => void
}

export const AuthContext = createContext<AuthContextProps | null>(null)

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [auth, setAuth] = useState(null) as any

  const store = localStorage.getItem('auth')

  useEffect(() => {
    if (!store) {
      return
    }

    setAuth(JSON.parse(store))
  }, [store])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider