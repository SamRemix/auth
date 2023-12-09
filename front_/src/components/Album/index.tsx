import './styles.scss'

import { useContext } from 'react'

import { TrashIcon } from '@heroicons/react/24/outline'

import { AuthContext, AuthContextProps } from '../../contexts/AuthContext'

import formatDate from '../../utils/formatDate'

type AlbumProps = {
  id: string
  title: string
  release: string
  deleteAlbum: (id: string) => void
}

const Album = ({ id, title, release, deleteAlbum }: AlbumProps) => {
  const { auth } = useContext(AuthContext) as AuthContextProps

  return (
    <div className="album-card">

      <div className="album-card-content">
        <p className="album-card-content-title">{title}</p>
      </div>

      <div className="album-card-footer">
        <p className="album-card-footer-release">{formatDate(release)}</p>

        {auth?.isAdmin
          && (
            <TrashIcon
              className="album-card-footer-delete"
              width="1.5rem"
              strokeWidth={1}
              onClick={() => deleteAlbum(id)}
            />
          )}
      </div>
    </div>
  )
}

export default Album