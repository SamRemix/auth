import './styles.scss'

import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { TrashIcon } from '@heroicons/react/24/outline'

import { AuthContext, AuthContextProps } from '../../contexts/AuthContext'

import formatDate from '../../utils/formatDate'

import Modal from '../Modal'

import { AlbumProps } from '../../@types/types'

type AlbumDeleteProps = AlbumProps & {
  deleteAlbum: (id: string) => void
}

const Album = ({ id, title, release, cover, deleteAlbum }: AlbumDeleteProps) => {
  const { auth } = useContext(AuthContext) as AuthContextProps

  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => setIsOpen(!isOpen)

  return (
    <div className="album-card">
      <img
        className="album-card-cover"
        src={`http://localhost:4000/images/${cover}`}
        alt={cover}
      />

      <div className="album-card-content">
        <Link to={`${id}`}>
          <p className="album-card-content-title">{title}</p>
        </Link>

        <div className="album-card-footer">
          <p className="album-card-footer-release">{formatDate(release)}</p>

          {auth?.isAdmin
            && (
              <TrashIcon
                className="album-card-footer-delete"
                width="1.5rem"
                strokeWidth={1}
                onClick={toggleModal}
              />
            )}
        </div>
      </div>

      {isOpen
        && (
          <Modal
            title={`Delete "${title}"`}
            toggle={toggleModal}
            deleteAction={() => deleteAlbum(id)}
          />
        )}
    </div>
  )
}

export default Album