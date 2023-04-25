import { Request, Response } from 'express'
import prisma from '../prisma'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

const { SECRET } = process.env

const logIn = async ({ body }: Request, res: Response) => {
  const { email, password } = body
  try {
    // checks if fields are empty
    type ErrorProps = {
      message: string,
      emptyFields: string[]
    }

    const checkEmptyFields = (body: object) => {
      const error: ErrorProps = {
        message: '',
        emptyFields: []
      }

      Object.entries(body).map(([key, value]) => {
        if (!value || value.trim().length === 0) {
          error.emptyFields.push(key)

          if (error.emptyFields.length === 1) {
            return error.message = `You must fill in the "${key}" field`
          }

          return error.message = 'You must fill all the fields'
        }
      })

      return { emptyFieldsError: error }
    }

    const { emptyFieldsError } = checkEmptyFields({ email, password })

    if (emptyFieldsError.message) {
      throw new Error(emptyFieldsError.message)
    }

    // checks if email matches to an existing user
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      throw new Error('This email does not exist')
    }

    // checks if password matches to the user
    const match = await compare(password, user.password)

    if (!match) {
      throw new Error('Your password is incorrect')
    }

    const token = sign(user.id, SECRET as string)

    res.status(200).json({ user, token })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export default logIn