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

type AlbumProps = {
  id: string
  title: string
  release: string
}

const Reviews = () => {
  const { auth } = useContext(AuthContext) as AuthContextProps

  const [album, setAlbum] = useState({
    title: '',
    release: ''
  })

  const [albums, setAlbums] = useState([] as AlbumProps[])

  const [isOpen, setIsOpen] = useState(false)

  const { setState } = useInputValue(setAlbum)
  const { pushToast } = useToast()
  const { prefix, setPrefix, search } = useSearch()

  const toggleModal = () => setIsOpen(!isOpen)

  // ADD ALBUM

  const addAlbum = async (e: any) => {
    e.preventDefault()

    try {
      const { data } = await axiosInstance.post('/albums', album, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
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

        <Input
          type="search"
          value={prefix}
          onChange={({ target }) => (
            setPrefix(target.value)
          )}
        />
      </div>

      {auth?.isAdmin && isOpen
        && (
          <Modal title="Add Album" toggle={toggleModal}>
            <form onSubmit={addAlbum}>
              <Input
                label="Album title"
                value={album.title}
                name="title"
                onChange={setState}
                autoFocus={true}
              />

              <Input
                type="date"
                label="Release date"
                value={album.release}
                name="release"
                onChange={setState}
              />

              <Button>Add album</Button>
            </form>
          </Modal>
        )}

      <div className="album-reviews-container">
        {search(albums).map(album => (
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