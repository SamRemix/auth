import { useContext, useState } from 'react'

import Container from '../../components/Container'
import Input from '../../components/Input'
import Button from '../../components/Button'

import { AuthContext, AuthContextProps } from '../../contexts/AuthContext'

import useInputValue from '../../hooks/useInputValue'
import useToast from '../../hooks/useToast'

import axiosInstance from '../../utils/axios'

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const { register } = useContext(AuthContext) as AuthContextProps

  const { setState } = useInputValue(setUser)
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

export default Login