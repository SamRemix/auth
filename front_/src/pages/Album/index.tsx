import transition from '../../transition/transition'

import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { AuthContext, AuthContextProps } from '../../contexts/AuthContext'

import useInputValue from '../../hooks/useInputValue'
import useToast from '../../hooks/useToast'

import axiosInstance from '../../utils/axios'
import formatDate from '../../utils/formatDate'

import Container from '../../components/Container'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Modal from '../../components/Modal'

import { AlbumProps } from '../../@types/types'

const Album = () => {
  let { id } = useParams()

  const { auth } = useContext(AuthContext) as AuthContextProps

  const [album, setAlbum] = useState({} as AlbumProps)
  const [updatedAlbum, setUpdatedAlbum] = useState({})

  const [isOpen, setIsOpen] = useState(false)

  const { setState } = useInputValue(setUpdatedAlbum)
  const { pushToast } = useToast()

  const toggleModal = () => setIsOpen(!isOpen)

  // GET ALBUM

  useEffect(() => {
    let controller = new AbortController()

    const getAlbum = async () => {
      try {
        const { data } = await axiosInstance.get(`/albums/${id}`, {
          signal: controller.signal
        })

        setAlbum(data)
      } catch ({ response }: any) {
        if (response) {
          pushToast({
            text: response.data.message,
            type: 'error'
          })
        }
      }
    }

    getAlbum()

    return () => controller.abort()
  }, [])

  // UPDATE ALBUM

  const updateAlbum = async (e: any) => {
    e.preventDefault()

    try {
      const { data } = await axiosInstance.patch(`/albums/${id}`, updatedAlbum, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })

      setAlbum(data.album)
      setUpdatedAlbum({})

      toggleModal()

      pushToast({ text: data.message })
    } catch ({ response }: any) {
      if (response) {
        pushToast({
          text: response.data.message,
          type: 'error'
        })
      }
    }
  }

  return (
    <Container title={album.title} justifyContent={true}>
      <p>Released {formatDate(album.release)}</p>
      {auth?.isAdmin && <Button onClick={toggleModal}>Update album</Button>}

      {auth?.isAdmin && isOpen
        && (
          <Modal title="Update Album" toggle={toggleModal}>
            <form onSubmit={updateAlbum}>
              <Input
                type={'update-text'}
                label="Album title"
                value={album.title}
                name="title"
                onChange={setState}
                autoFocus={true}
              />

              <Input
                type="update-date"
                label="Release date"
                value={album.release}
                name="release"
                onChange={setState}
              />

              <Button disabled={!Object.keys(updatedAlbum).length}>Update album</Button>
            </form>
          </Modal>
        )}
    </Container>
  )
}

export default transition(Album)