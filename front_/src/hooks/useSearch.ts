import { useState } from 'react'

import { AlbumProps } from '../@types/types'


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