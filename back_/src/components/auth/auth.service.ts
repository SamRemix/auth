import prisma from '../../prisma'

import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import isEmpty from '../../utils/isEmpty'
import checkLength from '../../utils/checkLength'
import findUser from '../../utils/findUser'
import isEmail from '../../utils/isEmail'
import isStrongPassword from '../../utils/isStrongPassword'

const { SECRET } = process.env as { SECRET: string }

type NewUserProps = {
  name: string,
  email: string,
  password: string
}

type CurrentUserProps = {
  email: string,
  password: string
}

class AuthService {
  signup = async (newUser: NewUserProps) => {
    const { name, email, password } = newUser

    try {
      isEmpty({ name, email, password })

      checkLength({
        string: name,
        range: [3, 32],
        prefix: 'Your name'
      })

      const exists = await findUser({ email })

      if (exists) {
        throw new Error('This email is already in use')
      }

      isEmail(email)

      isStrongPassword(password)

      const hashedPassword = await hash(password, 10)

      const user = await prisma.user.create({
        data: {
          ...newUser,
          password: hashedPassword
        }
      })

      return {
        user,
        token: sign(user.id, SECRET),
        message: 'Successfully registered 🔥'
      }
    } catch ({ message }: any) {
      throw new Error(message)
    }
  }

  login = async (currentUser: CurrentUserProps) => {
    const { email, password } = currentUser

    try {
      isEmpty({ email, password })

      const user = await findUser({ email })

      if (!user) {
        throw new Error('This email does not exist')
      }

      const match = await compare(password, user.password)

      if (!match) {
        throw new Error('Your password is incorrect')
      }

      return {
        user,
        token: sign(user.id, SECRET),
        message: `Hi ${user.name}, welcome back! 🤘`
      }
    } catch ({ message }: any) {
      throw new Error(message)
    }
  }
}

export default AuthService