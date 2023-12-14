import { useEffect, useState } from 'react'

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'Red')

  useEffect(() => {
    localStorage.setItem('theme', theme)

    document.documentElement.setAttribute('theme', theme)
  }, [theme])

  return { theme, setTheme }
}

export default useTheme