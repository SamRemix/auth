import './styles.scss'

import transition from '../../transition/transition'

import { useContext, useEffect, useState } from 'react'

import { AuthContext, AuthContextProps } from '../../contexts/AuthContext'

import useInputValue from '../../hooks/useInputValue'
import useToast from '../../hooks/useToast'
import useSearch from '../../hooks/useSearch'

import axiosInstance from '../../utils/axios'

import Container from '../../components/Container'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import Album from '../../components/Album'
import SearchBar from '../../components/SearchBar'

import { AlbumProps } from '../../@types/types'

type newAlbumProps = {
  title: string
  release: string,
  cover: File | undefined
}

const Reviews = () => {
  const { auth } = useContext(AuthContext) as AuthContextProps

  const [newAlbum, setNewAlbum] = useState<newAlbumProps>({
    title: '',
    release: '',
    cover: undefined
  })

  const [albums, setAlbums] = useState([] as AlbumProps[])

  const [isOpen, setIsOpen] = useState(false)

  const { setState } = useInputValue(setNewAlbum)
  const { pushToast } = useToast()
  const { prefix, setPrefix, search } = useSearch()

  const toggleModal = () => setIsOpen(!isOpen)

  // ADD ALBUM

  const addAlbum = async (e: any) => {
    e.preventDefault()

    try {
      if (typeof newAlbum.cover === 'undefined') {
        return toggleModal()
      }

      const formData = new FormData()

      formData.append('title', newAlbum.title)
      formData.append('release', newAlbum.release)
      formData.append('cover', newAlbum.cover)

      const { data } = await axiosInstance.post('/albums', formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })

      // reset fields
      setNewAlbum({
        title: '',
        release: '',
        cover: undefined
      })
      setAlbums(albums => [data.album, ...albums])

      toggleModal()

      pushToast({ text: data.message })
    } catch ({ response }: any) {
      pushToast({
        text: response.data.message,
        type: 'error'
      })
    }
  }

  // GET ALBUMS

  useEffect(() => {
    let controller = new AbortController()

    const getAlbums = async () => {
      try {
        const { data } = await axiosInstance.get('/albums', {
          signal: controller.signal
        })

        setAlbums(data)
      } catch ({ response }: any) {
        if (response) {
          pushToast({
            text: response.data.message,
            type: 'error'
          })
        }
      }
    }

    getAlbums()

    return () => controller.abort()
  }, [])

  // DELETE ALBUM

  const deleteAlbum = async (id: string) => {
    try {
      const { data } = await axiosInstance.delete(`/albums/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })

      setAlbums(albums => albums.filter(album => album.id !== id))

      pushToast({ text: data.message })
    } catch ({ response }: any) {
      pushToast({
        text: response.data.message,
        type: 'error'
      })
    }
  }

  return (
    <Container title="Album Reviews">
      <div className="album-reviews-header">
        {auth?.isAdmin && <Button onClick={toggleModal}>Add album</Button>}

        <SearchBar
          label="Search album"
          prefix={prefix}
          setPrefix={setPrefix}
        />
      </div>

      {auth?.isAdmin && isOpen
        && (
          <Modal title="Add Album" toggle={toggleModal}>
            <form onSubmit={addAlbum}>
              <Input
                label="Album title"
                value={newAlbum.title}
                name="title"
                onChange={setState}
                autoFocus={true}
              />

              <Input
                type="date"
                label="Release date"
                value={newAlbum.release}
                name="release"
                onChange={setState}
              />

              <Input
                type="file"
                label="Album cover"
                name="cover"
                onChange={setState}
                file={newAlbum.cover?.name}
              />

              <Button>Add album</Button>
            </form>
          </Modal>
        )}

      <div className="album-reviews-container">
        {search(albums, 'title').map(album => (
          <Album
            key={album.id}
            {...album}
            deleteAlbum={deleteAlbum}
          />
        ))}
      </div>
    </Container>
  )
}

export default transition(Reviews)