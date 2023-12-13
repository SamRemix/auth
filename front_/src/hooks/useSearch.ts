import { useState } from 'react'


const useSearch = () => {
  const [prefix, setPrefix] = useState('')

  const format = (string: string) => (
    string.toLowerCase().startsWith(prefix.trim().toLowerCase())
  )

  return {
    prefix,
    setPrefix,
    search: (array: any[], field: string) => (
      array.filter(data => (
        format(data[field])
      ))
    )
  }
}

export default useSearch