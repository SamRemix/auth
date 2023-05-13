import { Request, Response, NextFunction } from 'express'
import { compare } from 'bcrypt'
import isEmpty from '../utils/isEmpty'
import findUserByEmail from '../utils/findUserByEmail'
import createToken from '../utils/createToken'

const logIn = async ({ body }: Request, res: Response, next: NextFunction) => {
  const { email, password } = body
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

    const token = createToken(user.id)

    res.status(200).json({ user, token })
  } catch (error) {
    next(error)
  }
}

export default logIn