import './styles.scss'

import { useContext } from 'react'

import { TrashIcon } from '@heroicons/react/24/outline'

import { AuthContext, AuthContextProps } from '../../contexts/AuthContext'

import formatDate from '../../utils/formatDate'

import { UserProps } from '../../@types/types'

type UserDeleteProps = UserProps & {
  deletUser: (id: string) => void
}

const User = ({ id, name, email, role, createdAt, deletUser }: UserDeleteProps) => {
  const { auth } = useContext(AuthContext) as AuthContextProps

  const checkRole = (role: string, id: string) => {
    let className = 'user-card'
    let isDeletable = true

    if (role === 'SUPER_ADMIN') {
      className += ' super'
      isDeletable = false
    }

    if (role === 'ADMIN') {
      className += ' admin'
      isDeletable = false
    }

    if (id === auth?.user.id) {
      className += ' isConnected'
      isDeletable = true
    }

    if (auth?.isSuperAdmin && role === 'ADMIN') {
      isDeletable = true
    }

    return { className, isDeletable }
  }

  return (
    <div className={checkRole(role, id).className}>
      <div className="user-card-header">
        <div className="user-card-header-name">
          <p>{name}</p>
        </div>

        <div className="user-card-header-role">
          <p>{role}</p>
        </div>
      </div>

      <div className="user-card-content">
        <p>{email}</p>
      </div>

      <div className="user-card-footer">
        <div className="user-card-footer-createdAt">
          <p>{formatDate(createdAt)}</p>
        </div>

        {checkRole(role, id).isDeletable
          && (
            <TrashIcon
              className="user-card-footer-delete"
              width="1.5rem"
              strokeWidth={1}
              onClick={() => deletUser(id)}
            />
          )}
      </div>
    </div>
  )
}

export default User