import './styles.scss'

import transition from '../../transition/transition'

import { useContext, useEffect, useState } from 'react'

import { AuthContext, AuthContextProps } from '../../contexts/AuthContext'

import useToast from '../../hooks/useToast'

import axiosInstance from '../../utils/axios'

import Container from '../../components/Container'
import User from '../../components/User'

import { UserProps } from '../../@types/types'

const Admin = () => {
  const { auth } = useContext(AuthContext) as AuthContextProps

  const [users, setUsers] = useState([] as UserProps[])

  const { pushToast } = useToast()

  // GET USERS

  useEffect(() => {
    let controller = new AbortController()

    const getUsers = async () => {
      try {
        const { data } = await axiosInstance.get('/users', {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        })

        setUsers(data)
      } catch ({ response }: any) {
        if (response) {
          pushToast({
            text: response.data.message,
            type: 'error'
          })
        }
      }
    }

    getUsers()

    return () => controller.abort()
  }, [])

  //  DELETE USER

  const deletUser = async (id: string) => {
    await axiosInstance.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })

    setUsers(users => users.filter(user => user.id !== id))
  }

  return (
    <Container title="Admin board">
      <div className="admin-board">
        {users.map(user => (
          <User
            key={user.id}
            {...user}
            deletUser={deletUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default transition(Admin)