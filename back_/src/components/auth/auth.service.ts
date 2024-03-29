import prisma from '../../prisma'

import { hash, compare } from 'bcrypt'

import isEmpty from '../../utils/isEmpty'
import checkNameLength from '../../utils/checkNameLength'
import findUserByEmail from '../../utils/findUserByEmail'
import isEmail from '../../utils/isEmail'
import isStrongPassword from '../../utils/isStrongPassword'
import createToken from '../../utils/createToken'

type CurrentUserProps = {
  email: string
  password: string
}

type NewUserProps = CurrentUserProps & { name: string }

class AuthService {
  signup = async (newUser: NewUserProps) => {
    const { name, email, password } = newUser

    try {
      isEmpty({ name, email, password })

      checkNameLength({
        string: name,
        range: [3, 32]
      })

      const exists = await findUserByEmail(email)

      if (exists) {
        throw new Error('This email is already in use')
      }

      isEmail(email)

      isStrongPassword(password)

      const hashedPassword = await hash(password, 10)

      const user = await prisma.user.create({
        data: {
          ...newUser,
          email: email.toLowerCase(),
          password: hashedPassword
        }
      })

      return {
        user: {
          id: user.id,
          name: user.name,
          role: user.role
        },
        token: createToken(user.id),
        message: `Welcome ${user.name}! 👋`
      }
    } catch ({ message }: any) {
      throw new Error(message)
    }
  }

  login = async (currentUser: CurrentUserProps) => {
    const { email, password } = currentUser

    try {
      isEmpty({ email, password })

      const user = await findUserByEmail(email)

      if (!user) {
        throw new Error('This email does not exist')
      }

      const match = await compare(password, user.password)

      if (!match) {
        throw new Error('Your password is incorrect')
      }

      return {
        user: {
          id: user.id,
          name: user.name,
          role: user.role
        },
        token: createToken(user.id),
        message: `Hi ${user.name}, welcome back! 🤘`
      }
    } catch ({ message }: any) {
      throw new Error(message)
    }
  }
}

export default AuthService