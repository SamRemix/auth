import { Request, Response } from 'express'
import prisma from '../prisma'
import { hash } from 'bcrypt'
import isEmpty from '../utils/isEmpty'
import findUserByEmail from '../utils/findUserByEmail'
import isEmail from '../utils/isEmail'
import isStrongPassword from '../utils/isStrongPassword'
import createToken from '../utils/createToken'

const signUp = async ({ body }: Request, res: Response) => {
  const { name, email, password } = body

  try {
    // checks if fields are empty
    const { fieldsError } = isEmpty({ name, email, password })

    if (fieldsError) {
      throw new Error(fieldsError)
    }

    // checks name length
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

    // checks if email is valid
    if (!isEmail(email)) {
      throw new Error('Your email is invalid')
    }

    // checks if password is strong enough
    const { passwordError } = isStrongPassword(password)

    if (passwordError) {
      throw new Error(passwordError)
    }

    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        ...body,
        password: hashedPassword
      }
    })

    const token = createToken(user.id)

    res.status(200).json({ user, token })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export default signUp