import { hash } from 'bcrypt'
import prisma from '../prisma'
import findUserByEmail from '../utils/findUserByEmail'
import isEmail from '../utils/isEmail'
import isEmpty from '../utils/isEmpty'
import isStrongPassword from '../utils/isStrongPassword'
import createToken from '../utils/createToken'

const signUpService = async (newUser: any) => {
  const { name, email, password } = newUser
  try {
    const { fieldsError } = isEmpty({ name, email, password })

    if (fieldsError) {
      throw new Error(fieldsError)
    }

    if (name.trim().length < 3) {
      throw new Error('Your name must contain at least 3 characters')
    }

    if (name.length > 32) {
      throw new Error('Your name must not exceed 32 characters')
    }

    const exists = await findUserByEmail(email)

    if (exists) {
      throw new Error('This email is already in use')
    }

    if (!isEmail(email)) {
      throw new Error('Your email is invalid')
    }

    const { passwordError } = isStrongPassword(password)

    if (passwordError) {
      throw new Error(passwordError)
    }

    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        ...newUser, password: hashedPassword
      }
    })

    const token = createToken(user.id)

    return { user, token }
  } catch (error: any) {
    throw new Error(error)
  }
}

export default signUpService