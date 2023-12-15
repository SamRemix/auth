import { createContext, useEffect, useState } from 'react'

export type ThemeContextProps = {
  theme: string
  setTheme: (theme: string) => void
}

const defaultTheme = {
  theme: '',
  setTheme: (_theme: string) => { }
}

export const ThemeContext = createContext(defaultTheme)

const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'Red')

  useEffect(() => {
    localStorage.setItem('theme', theme)

    document.documentElement.setAttribute('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider