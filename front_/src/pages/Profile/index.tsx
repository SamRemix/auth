import transition from '../../transition/transition'

import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { AuthContext, AuthContextProps } from '../../contexts/AuthContext'

import useToast from '../../hooks/useToast'

import axiosInstance from '../../utils/axios'

import Container from '../../components/Container'

import { UserProps } from '../../@types/types'

const Profile = () => {
  let { id } = useParams()

  const { auth } = useContext(AuthContext) as AuthContextProps

  const [user, setUser] = useState({} as UserProps)

  const { pushToast } = useToast()

  // GET USER

  useEffect(() => {
    let controller = new AbortController()

    const getUser = async () => {
      try {
        const { data } = await axiosInstance.get(`/users/${id}`, {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        })

        setUser(data)
      } catch ({ response }: any) {
        if (response) {
          pushToast({
            text: response.data.message,
            type: 'error'
          })
        }
      }
    }

    getUser()

    return () => controller.abort()
  }, [])

  return (
    <Container title={user.name} justifyContent={true}>
      <p>{user.email}</p>
    </Container>
  )
}

export default transition(Profile)