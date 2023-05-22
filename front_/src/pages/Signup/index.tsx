import { useState, useContext } from 'react'

import Container from '../../components/Container'
import Input from '../../components/Input'
import Button from '../../components/Button'

import { AuthContext, AuthContextProps } from '../../contexts/AuthContext'

import useInputValue from '../../hooks/useInputValue'

import axiosInstance from '../../utils/axios'

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const { register } = useContext(AuthContext) as AuthContextProps

  const { setState } = useInputValue(setUser)

  const signUp = async (e: any) => {
    e.preventDefault()

    try {
      const { data } = await axiosInstance.post('/auth/signup', user)

      register(data)
    } catch (error: any) {
      console.log(error.response.data.message)
    }
  }
  return (
    <Container title="Sign Up">
      <form className="form" onSubmit={signUp}>
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
          passwordValidation={true}
        />

        <Button>Sign up</Button>
      </form>
    </Container>
  )
}

export default Signup