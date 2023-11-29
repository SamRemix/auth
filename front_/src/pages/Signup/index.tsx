import transition from '../../transition/transition'

import { useState } from 'react'

import useInputValue from '../../hooks/useInputValue'
import useAuth from '../../hooks/useAuth'
import useToast from '../../hooks/useToast'

import axiosInstance from '../../utils/axios'

import Container from '../../components/Container'
import Input from '../../components/Input'
import Button from '../../components/Button'

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const { setState } = useInputValue(setUser)
  const { register } = useAuth()
  const { pushToast } = useToast()

  const signUp = async (e: any) => {
    e.preventDefault()

    try {
      const { data } = await axiosInstance.post('/auth/signup', user)

      register(data)
    } catch ({ response }: any) {
      pushToast({
        text: response.data.message,
        type: 'error'
      })
    }
  }
  return (
    <Container title="Sign Up">
      <form onSubmit={signUp}>
        <Input
          label="Your name"
          value={user.name}
          name="name"
          onChange={setState}
          maxLength={32}
          autoFocus={true}
        />

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

        <Button>Sign up</Button>
      </form>
    </Container>
  )
}

export default transition(Signup)