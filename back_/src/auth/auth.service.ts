import prisma from '../prisma'

import { hash } from 'bcrypt'
import { compare } from 'bcrypt'

import isEmpty from '../utils/isEmpty'
import checkLength from '../utils/checkLength'
import findUserByEmail from '../utils/findUserByEmail'
import isEmail from '../utils/isEmail'
import isStrongPassword from '../utils/isStrongPassword'
import createToken from '../utils/createToken'

type NewUserProps = {
  name: string,
  email: string,
  password: string
}

export const signupService = async (newUser: NewUserProps) => {
  const { name, email, password } = newUser

  try {
    isEmpty({ name, email, password })

    checkLength({
      string: name,
      range: [3, 32],
      prefix: 'Your name'
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
        password: hashedPassword
      }
    })

    return {
      user,
      token: createToken(user.id),
      message: 'Successfully registered 🔥'
    }
  } catch ({ message }: any) {
    throw new Error(message)
  }
}

type CurrentUserProps = {
  email: string,
  password: string
}

export const loginService = async (currentUser: CurrentUserProps) => {
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
      user,
      token: createToken(user.id),
      message: `Hi ${user.name}, welcome back! 🤘`
    }
  } catch ({ message }: any) {
    throw new Error(message)
  }
}