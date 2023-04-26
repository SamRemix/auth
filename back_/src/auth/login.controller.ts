import { Request, Response } from 'express'
import { compare } from 'bcrypt'
import isEmpty from '../utils/isEmpty'
import findUserByEmail from '../utils/findUserByEmail'
import createToken from '../utils/createToken'

const logIn = async ({ body }: Request, res: Response) => {
  const { email, password } = body
  try {
    // checks if fields are empty
    const { fieldsError } = isEmpty({ email, password })

    if (fieldsError) {
      throw new Error(fieldsError)
    }

    // checks if email matches to an existing user
    const user = await findUserByEmail(email)

    if (!user) {
      throw new Error('This email does not exist')
    }

    // checks if password matches to the user
    const match = await compare(password, user.password)

    if (!match) {
      throw new Error('Your password is incorrect')
    }

    const token = createToken(user.id)

    res.status(200).json({ user, token })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export default logIn