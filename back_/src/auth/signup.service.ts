import { hash } from 'bcrypt'
import prisma from '../prisma'

// utils
import isEmpty from '../utils/isEmpty'
import checkLength from '../utils/checkLength'
import findUserByEmail from '../utils/findUserByEmail'
import isEmail from '../utils/isEmail'
import isStrongPassword from '../utils/isStrongPassword'
import createToken from '../utils/createToken'

const signUpService = async (newUser: any) => {
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

    const token = createToken(user.id)

    return { user, token }
  } catch ({ message }: any) {
    throw new Error(message)
  }
}

export default signUpService