import { useState } from 'react'

type AlbumProps = {
  id: string
  title: string
  release: string
}

const useSearch = () => {
  const [prefix, setPrefix] = useState('')

  const format = (title: string) => (
    title.toLowerCase().startsWith(prefix.trim().toLowerCase())
  )

  return {
    prefix,
    setPrefix,
    search: (albums: AlbumProps[]) => (
      albums.filter(({ title }) => (
        format(title.startsWith('Pike')
          ? title.split(': ')[1]
          : title
        )
      ))
    )
  }
}

export default useSearch