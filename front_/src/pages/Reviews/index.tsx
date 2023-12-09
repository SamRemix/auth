import './styles.scss'

import transition from '../../transition/transition'

import { useContext, useEffect, useState } from 'react'

import { AuthContext, AuthContextProps } from '../../contexts/AuthContext'

import useInputValue from '../../hooks/useInputValue'
import useToast from '../../hooks/useToast'

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

  const toggleModal = () => setIsOpen(!isOpen)

  const addAlbum = async (e: any) => {
    e.preventDefault()

    try {
      const { data } = await axiosInstance.post('/albums', album)

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

  useEffect(() => {
    let controller = new AbortController()

    const getAlbums = async () => {
      try {
        const { data } = await axiosInstance.get('/albums', {
          signal: controller.signal
        })

        setAlbums(data)

        console.log(data)
      } catch ({ response }: any) {
        pushToast({
          text: response.data.message,
          type: 'error'
        })
      }
    }

    getAlbums()

    return () => controller.abort()
  }, [])

  return (
    <Container title="Album Reviews">
      {auth?.isAdmin
        && (
          <>
            <Button onClick={toggleModal}>Add album</Button>

            {isOpen
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
          </>
        )}

      <div className="album-container">
        {albums.map(album => <Album {...album} />)}
      </div>
    </Container>
  )
}

export default transition(Reviews)