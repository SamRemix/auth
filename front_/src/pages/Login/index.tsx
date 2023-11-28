import transition from '../../transition/transition'

import { useState } from 'react'

import useInputValue from '../../hooks/useInputValue'
import useAuth from '../../hooks/useAuth'
import useToast from '../../hooks/useToast'

import axiosInstance from '../../utils/axios'

import Container from '../../components/Container'
import Input from '../../components/Input'
import Button from '../../components/Button'

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const { setState } = useInputValue(setUser)
  const { register } = useAuth()
  const { addToast } = useToast()

  const logIn = async (e: any) => {
    e.preventDefault()

    try {
      const { data } = await axiosInstance.post('/auth/login', user)

      addToast(data.message)

      register(data)
    } catch ({ response }: any) {
      addToast(response.data.message, 'error')
    }
  }

  return (
    <Container title="Log In">
      <form onSubmit={logIn}>
        <Input
          label="Your email"
          value={user.email}
          name="email"
          onChange={setState}
        />

        <Input
          type="password"
          label="Your password"
          value={user.password}
          name="password"
          onChange={setState}
        />

        <Button>Log in</Button>
      </form>
    </Container>
  )
}

export default transition(Login)