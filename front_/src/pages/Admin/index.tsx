import './styles.scss'

import transition from '../../transition/transition'

import { useEffect, useState } from 'react'

import { TrashIcon } from '@heroicons/react/24/outline'

import useToast from '../../hooks/useToast'

import axiosInstance from '../../utils/axios'
import formatDate from '../../utils/formatDate'

import Container from '../../components/Container'

type UserProps = {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

const Admin = () => {
  const { pushToast } = useToast()
  const [users, setUsers] = useState([] as UserProps[])

  const token = JSON.parse(localStorage.getItem('auth') as string).token

  const getUsers = async () => {
    try {
      const { data } = await axiosInstance.get('/users', {
        'headers': {
          'Authorization': `Bearer ${token}`
        }
      })

      setUsers(data)

      console.log(data)
    } catch ({ response }: any) {
      pushToast({
        text: response.data.message,
        type: 'error'
      })
    }
  }

  const deletUser = async (id: string) => {
    await axiosInstance.delete(`/users/${id}`, {
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    })

    setUsers(users => users.filter(user => user.id !== id))
  }

  useEffect(() => {
    getUsers()

    return () => { }
  }, [])

  return (
    <Container title="Admin board">
      <div className="admin-board">
        {users.map(({ id, name, email, role, createdAt }) => (
          <div key={id} className={role === 'ADMIN' ? 'user-card admin' : 'user-card'}>
            <div className="user-card-header">
              <div className="user-card-header-name">
                <p>{name}</p>
              </div>

              {role === 'ADMIN'
                && (
                  <div className="user-card-header-role">
                    <p>{role}</p>
                  </div>
                )}
            </div>

            <div className="user-card-content">
              <div className="user-card-content-email">
                <p>{email}</p>
              </div>
            </div>

            <div className="user-card-footer">
              <div className="user-card-footer-createdAt">
                <p>{formatDate(createdAt)}</p>
              </div>

              {role !== 'ADMIN'
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
        ))}
      </div>
    </Container>
  )
}

export default transition(Admin)